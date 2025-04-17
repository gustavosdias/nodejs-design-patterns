import {beforeEach, describe, expect, it} from "vitest";
import { AdminPermissions, EditorPermissions, User, ViewerPermissions } from "./user.js";

describe('User role permission strategies', () => {
    let admin: User;
    let editor: User;
    let viewer: User;
  
    beforeEach(() => {
      admin = new User('Admin', new AdminPermissions());
      editor = new User('Editor', new EditorPermissions());
      viewer = new User('Viewer', new ViewerPermissions());
    });
  
    it('Admin should have full permissions', () => {
      expect(admin.canRead()).toBe(true);
      expect(admin.canWrite()).toBe(true);
      expect(admin.canDelete()).toBe(true);
    });
  
    it('Editor should read and write but not delete', () => {
      expect(editor.canRead()).toBe(true);
      expect(editor.canWrite()).toBe(true);
      expect(editor.canDelete()).toBe(false);
    });
  
    it('Viewer should only read', () => {
      expect(viewer.canRead()).toBe(true);
      expect(viewer.canWrite()).toBe(false);
      expect(viewer.canDelete()).toBe(false);
    });
  
    it('Strategy can be changed at runtime', () => {
      editor.setStrategy(new AdminPermissions());
      expect(editor.canDelete()).toBe(true);
  
      viewer.setStrategy(new EditorPermissions());
      expect(viewer.canWrite()).toBe(true);
    });
  });