import { describe, expect, it } from "vitest";
import { StoreTopic } from "./store-topic.js";
import { UpdateTopic } from "./update-topic.js";
import { InMemoryTopicsRepository } from "../../repositories/in-memory/in-memory-topics-repository.js";
import { GetTopicByVersion } from "./get-topic-by-version.js";


describe('Get topic by version', async () => {
    it('should be able to retrieve a topic with a specific version without error', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();
        const storeTopic = new StoreTopic(inMemoryTopicsRepository);
        const updateTopic = new UpdateTopic(inMemoryTopicsRepository);
        const getTopicByVersion = new GetTopicByVersion(inMemoryTopicsRepository);
        const topic = await storeTopic.execute({
            name: 'Documentary about John Doe',
            content: '<html></html>',
        });

        await updateTopic.execute(topic.id!, {
            name: 'Documentary about John Doe 2',
            content: '<html></html>',
        });

        await updateTopic.execute(topic.id!, {
            name: 'Documentary about John Doe 3',
            content: '<html></html>',
        });
        
        
        await updateTopic.execute(topic.id!, {
            name: 'Documentary about John Doe 4',
            content: '<html></html>',
        });

        await expect(getTopicByVersion.execute(topic.id!, 3)).resolves.not.toThrow();
    });

    it('should be able to retrieve a topic with a specific version', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();
        const storeTopic = new StoreTopic(inMemoryTopicsRepository);
        const updateTopic = new UpdateTopic(inMemoryTopicsRepository);
        const getTopicByVersion = new GetTopicByVersion(inMemoryTopicsRepository);
        const topic = await storeTopic.execute({
            name: 'Documentary about John Doe',
            content: '<html></html>',
        });

        await updateTopic.execute(topic.id!, {
            name: 'Documentary about John Doe 2',
            content: '<html></html>',
        });

        await updateTopic.execute(topic.id!, {
            name: 'Documentary about John Doe 3',
            content: '<html></html>',
        });
        
        
        await updateTopic.execute(topic.id!, {
            name: 'Documentary about John Doe 4',
            content: '<html></html>',
        });

        const topicByVersion = await getTopicByVersion.execute(topic.id!, 3);
        expect(topicByVersion.version).toEqual(3);
    });

    it('should throw error if version is not found', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();
        const storeTopic = new StoreTopic(inMemoryTopicsRepository);
        const updateTopic = new UpdateTopic(inMemoryTopicsRepository);
        const getTopicByVersion = new GetTopicByVersion(inMemoryTopicsRepository);
        const topic = await storeTopic.execute({
            name: 'Documentary about John Doe',
            content: '<html></html>',
        });

        await updateTopic.execute(topic.id!, {
            name: 'Documentary about John Doe 2',
            content: '<html></html>',
        });

        await updateTopic.execute(topic.id!, {
            name: 'Documentary about John Doe 3',
            content: '<html></html>',
        });
        
        
        await updateTopic.execute(topic.id!, {
            name: 'Documentary about John Doe 4',
            content: '<html></html>',
        });

        await expect(getTopicByVersion.execute(topic.id!, 4)).rejects.toThrowError('Topic with id: 0 not found');
    });
});