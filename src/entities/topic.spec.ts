import {expect, test} from "vitest";
import { createTopic } from "./topic.js";


/** Article */
test('create an article topic', () => {
    const topic = createTopic({
        name: 'Documentary about John Doe',
        content: '<html></html>',
        parentTopicId: 123,
    });
    expect(topic.name).toEqual('Documentary about John Doe');
    expect(topic.content).toEqual('<html></html>');
    expect(topic.parentTopicId).toEqual(123);
});

test('createdAt of topic must be after or equal the current timestamp', () => {
    const topic = createTopic({
        name: 'Documentary about John Doe',
        content: '<html></html>',
    });
    expect(topic.createdAt.getDate()).toBeGreaterThanOrEqual(new Date().getDate());
});

test('createdAt and updatedAt must be equal when topic is created', () => {
    const topic = createTopic({
        name: 'Documentary about John Doe',
        content: '<html></html>',
    });
    expect(topic.createdAt).toEqual(topic.updatedAt);
});

test('must not be possible to create a topic with an empty name', () => {
    expect(() => createTopic({
        name: '',
        content: '<html></html>',
    })).toThrowError('Topic name cannot be empty');
});

test('must not be possible to create topic with an empty content', () => {
    expect(() => createTopic({
        name: 'Documentary about John Doe',
        content: '',
    })).toThrowError('Topic content cannot be empty');
});

test('must not be possible to change updatedAt value for a date before the current', () => {
    expect(() => createTopic({
        name: 'Documentary about John Doe',
        content: '',
    })).toThrowError('New date cannot be equal or before current updatedAt date');
});

test('parentTopicId from topic can be undefined', () => {
    const topic = createTopic({
        name: 'Documentary about John Doe',
        content: '<html></html>',
    });
    expect(topic.parentTopicId).toEqual(undefined);
});