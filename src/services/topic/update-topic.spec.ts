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

        await expect(updateTopic.execute({
            id: topic.id as number,
            data: {
                name: 'Documentary about John Doe 2',
                content: topic.content,
            }
        })).resolves.not.toThrow();
        expect(inMemoryTopicsRepository.topics.length).toEqual(2);
        expect(inMemoryTopicsRepository.topics[1].version).toEqual(1);
    });
});