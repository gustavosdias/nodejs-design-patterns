import {expect, test} from "vitest";
import { createTopic, ITopic } from "./topic.js";


/** Article */
test('create an article topic', () => {
    const topic = createTopic({
        id: 0,
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
        id: 0,
        name: 'Documentary about John Doe',
        content: '<html></html>',
    });
    expect(topic.createdAt!.getDate()).toBeGreaterThanOrEqual(new Date().getDate());
});

test('updatedAt must be equal or greater than createdAt when topic is created', () => {
    const topic = createTopic({
        id: 0,
        name: 'Documentary about John Doe',
        content: '<html></html>',
    });
    expect(topic.createdAt!.getDate()).toBeGreaterThanOrEqual(topic.updatedAt!.getDate());
});

test('must not be possible to create a topic with an empty name', () => {
    expect(() => createTopic({
        id: 0,
        name: '',
        content: '<html></html>',
    })).toThrowError('Topic name cannot be empty');
});

test('must not be possible to create topic with an empty content', () => {
    expect(() => createTopic({
        id: 0,
        name: 'Documentary about John Doe',
        content: '',
    })).toThrowError('Topic content cannot be empty');
});

test('must not be possible to change updatedAt value for a date before the current', () => {
    const topic = createTopic({
        id: 0,
        name: 'Documentary about John Doe',
        content: '<html></html>',
        parentTopicId: 123,
    });

    expect(() => topic.setNewUpdatedAt!(new Date("October 13, 2014 11:13:00"))).toThrowError('New date cannot be equal or before current updatedAt date');
});

test('parentTopicId from topic can be undefined', () => {
    const topic = createTopic({
        id: 0,
        name: 'Documentary about John Doe',
        content: '<html></html>',
    });
    expect(topic.parentTopicId).toEqual(undefined);
});


test('find shortest path between two topics in the same hierarchy', () => {
    const topics: ITopic[] = [];

    const parentTopic = createTopic({
        name: 'P',
        content: '<html></html>',
    });
    parentTopic.id = 0;
    topics.push(parentTopic);
    
    const childTopicA = createTopic({
        name: 'A',
        content: '<html></html>',
        parentTopicId: parentTopic.id,
    });
    childTopicA.id = 1;
    topics.push(childTopicA);
    childTopicA.setParent!(parentTopic);
    parentTopic.addChild!(childTopicA);


    const childTopicAA = createTopic({
        name: 'AA',
        content: '<html></html>',
        parentTopicId: childTopicA.id,
    });
    childTopicAA.id = 2;
    topics.push(childTopicAA);
    childTopicAA.setParent!(childTopicA);
    childTopicA.addChild!(childTopicAA);
    //B
    const childTopicB = createTopic({
        name: 'B',
        content: '<html></html>',
        parentTopicId: parentTopic.id,
    });
    childTopicB.id = 3;
    topics.push(childTopicB);
    childTopicB.setParent!(parentTopic);
    parentTopic.addChild!(childTopicB);
    //BA
    const childTopicBA = createTopic({
        name: 'BA',
        content: '<html></html>',
        parentTopicId: childTopicB.id,
    });
    childTopicBA.id = 4;
    topics.push(childTopicBA);
    childTopicBA.setParent!(childTopicB);
    childTopicB.addChild!(childTopicBA);
    //BB
    const childTopicBB = createTopic({
        name: 'BB',
        content: '<html></html>',
        parentTopicId: childTopicB.id
    });
    childTopicBB.id = 5;
    topics.push(childTopicBB);
    childTopicBB.setParent!(childTopicB);
    childTopicB.addChild!(childTopicBB);

    console.log(topics);

    expect(parentTopic.getShortestPathBewtweeenTwoTopics!(childTopicAA, childTopicBA)).toEqual(4);
});