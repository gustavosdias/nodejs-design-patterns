import { describe, expect, it } from "vitest";
import { StoreTopic } from "./store-topic.js";
import { InMemoryTopicsRepository } from "../../repositories/in-memory/in-memory-topics-repository.js";


describe('Store Topic', async () => {
    it('should be able to store a topic', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();
        const storeTopic = new StoreTopic(inMemoryTopicsRepository);

        await expect(storeTopic.execute({
            name: 'Documentary about John Doe',
            content: '<html></html>',
        })).resolves.not.toThrow();
        expect(inMemoryTopicsRepository.topics.length === 1);
    });
    
    it('should be able to return id as 0', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();
        const storeTopic = new StoreTopic(inMemoryTopicsRepository);

        const topic = await storeTopic.execute({
            name: 'Documentary about John Doe',
            content: '<html></html>',
        });
        expect(topic.id).toEqual(0);
    });

    it('should throw error if topic is being created with a nonexistent parent', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();
        const storeTopic = new StoreTopic(inMemoryTopicsRepository);

        await expect(storeTopic.execute({
            name: 'Documentary about John Doe',
            content: '<html></html>',
            parentTopicId: 999
        })).rejects.toThrowError('Parent Topic with id: 999 was not found');
    });

    it('should be able to store a topic with a parent', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();
        const storeTopic = new StoreTopic(inMemoryTopicsRepository);

        await storeTopic.execute({
            name: 'Documentary about John Doe',
            content: '<html></html>',
        });

        await expect(storeTopic.execute({
            name: 'Documentary about John Doe',
            content: '<html></html>',
            parentTopicId: 0
        })).resolves.not.toThrow();
    });
});