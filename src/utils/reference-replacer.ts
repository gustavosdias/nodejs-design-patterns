/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * A custom JSON replacer function to handle circular references while maintaining hierarchy.
 * Circular references are replaced with `#REF:$` style pointers to preserve structure.
 */
export function refReplacer(): (this: any, key: string, value: any) => any {
  // Map to track each object and its corresponding path in the hierarchy
  const m = new Map<any, string>();

  // Map to track visited objects and their first assigned path for reference
  const v = new Map<any, string>();

  // Variable to store the initial root object (used to detect self-references)
  let init: any = null;

  // The actual replacer function to be used with JSON.stringify
  return function (this: any, key: string, value: any): any {
    // Get the path of the current parent object
    const parentPath = m.get(this) ?? '';

    // Build the current path for this field
    const currentPath = Array.isArray(this)
      ? `${parentPath}[${key}]`     // If parent is an array, use [index] syntax
      : `${parentPath}.${key}`;     // Otherwise, use dot notation

    // Check if the current value is a non-null object (i.e., complex structure)
    const isComplex = typeof value === 'object' && value !== null;

    // If it's a complex object, register its path
    if (isComplex) {
      m.set(value, currentPath);
    }

    // Retrieve any previous path for this value (if already visited)
    const prevPath = v.get(value) ?? '';

    // Clean up the path string (remove "undefined" root artifacts)
    const cleanedPath = currentPath.replace(/undefined\.?\.?/, '');

    // Determine the final value to be returned
    let finalValue: any = prevPath
      ? `#REF:${prevPath.startsWith('[') ? '$' : '$.'}${prevPath}` // If circular, return reference path
      : value;                                                     // Otherwise, return the value itself

    // Store the initial root object to detect self-referencing loops
    if (!init) {
      init = value;
    } else if (value === init) {
      finalValue = '#REF:$'; // If this value is the root object, reference the root
    }

    // If the value hasn't been visited and is complex, store its reference path
    if (!prevPath && isComplex) {
      v.set(value, cleanedPath);
    }

    return finalValue;
  };
}
