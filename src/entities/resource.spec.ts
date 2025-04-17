import {expect, test} from "vitest";
import { Resource } from "./resource.js";

test('create a resource', () => {
    const resource = new Resource({
        topicId: 0,
        url: 'http',
        type: 'article',
    });
    expect(resource.topicId).toEqual(0);
    expect(resource.url).toEqual('http');
    expect(resource.type).toEqual('article');
});

test('createdAt of resource must be after or equal the current timestamp', () => {
    const resource = new Resource({
        topicId: 0,
        url: 'http',
        type: 'article',
    });
    expect(resource.createdAt!.getDate()).toBeGreaterThanOrEqual(new Date().getDate());
});

test('updatedAt must be equal or greater than createdAt when resource is created', () => {
    const resource = new Resource({
        topicId: 0,
        url: 'http',
        type: 'article',
    });
    expect(resource.createdAt!.getDate()).toBeGreaterThanOrEqual(resource.updatedAt!.getDate());
});

test('must not be possible to create a resource with an empty url', () => {
    expect(() => new Resource({
        topicId: 0,
        url: '',
        type: 'article',
    })).toThrowError('Resource url cannot be empty');
});

test('must not be possible to change updatedAt value for a date before the current', () => {
    const resource = new Resource({
        topicId: 0,
        url: 'http',
        type: 'article',
    });

    expect(() => resource.setNewUpdatedAt!(new Date("October 13, 2014 11:13:00"))).toThrowError('New date cannot be equal or before current updatedAt date');
});