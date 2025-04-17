import { describe, expect, it } from "vitest";
import { StoreTopic } from "./store-topic.js";
import { InMemoryTopicsRepository } from "../../repositories/in-memory/in-memory-topics-repository.js";
import { GetTopicById } from "./get-topic-by-id.js";


describe('Get topic by id', async () => {
    it('should be able to retrieve a topic without error', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();
        const storeTopic = new StoreTopic(inMemoryTopicsRepository);
        const getTopicById = new GetTopicById(inMemoryTopicsRepository);

        const topic = await storeTopic.execute({
            name: 'Documentary about John Doe',
            content: '<html></html>',
        });
        
        await expect(getTopicById.execute(topic.id!)).resolves.not.toThrow();
    });

    it('should throw error if topic is not found', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();

        const getTopicById = new GetTopicById(inMemoryTopicsRepository);

        await expect(getTopicById.execute(999)).rejects.toThrowError('Topic with id: 999 not found');
    });

    it('should return parent topic with children nested inside', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();
        const storeTopic = new StoreTopic(inMemoryTopicsRepository);
        const getTopicById = new GetTopicById(inMemoryTopicsRepository);

        await storeTopic.execute({
            name: 'Documentary about John Doe - Synopysis',
            content: '<html></html>',
        });
        await storeTopic.execute({
            name: 'Documentary about John Doe - Part 1',
            content: '<html></html>',
            parentTopicId: 0,
        });

        await storeTopic.execute({
            name: 'Documentary about John Doe - Part 2',
            content: '<html></html>',
            parentTopicId: 0,
        });
        const topic = await getTopicById.execute(0);
        expect(topic.children?.length).toEqual(2);
    });
});