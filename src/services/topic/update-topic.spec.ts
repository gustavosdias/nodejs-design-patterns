import { describe, expect, it } from "vitest";
import { StoreTopic } from "./store-topic.js";
import { InMemoryTopicsRepository } from "../../repositories/in-memory/in-memory-topics-repository.js";
import { UpdateTopic } from "./update-topic.js";


describe('Update Topic', async () => {
    it('should be able to update a topic', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();
        const storeTopic = new StoreTopic(inMemoryTopicsRepository);
        const updateTopic = new UpdateTopic(inMemoryTopicsRepository);

        const topic = await storeTopic.execute({
            name: 'Documentary about John Doe',
            content: '<html></html>',
        });

        await expect(updateTopic.execute(
            topic.id!,
            {
                name: 'Documentary about John Doe 2',
                content: topic.content,
            })).resolves.not.toThrow();
        expect(inMemoryTopicsRepository.topics.length).toEqual(2);
        expect(inMemoryTopicsRepository.topics[1].version).toEqual(1);
    });

    it('should throw error if topic is not found', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();
        const updateTopic = new UpdateTopic(inMemoryTopicsRepository);

        await expect(updateTopic.execute(
            999,
            {
                name: 'Documentary about John Doe 2',
                content: '',
            })).rejects.toThrow('Topic with id: 999 not found.');
    });
});