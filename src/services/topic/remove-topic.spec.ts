import { describe, expect, it } from "vitest";
import { StoreTopic } from "./store-topic.js";
import { RemoveTopic } from "./remove-topic.js";
import { InMemoryTopicsRepository } from "../../repositories/in-memory/in-memory-topics-repository.js";


describe('Delete Topic', async () => {
    it('should be able to delete a topic', async () => {
        const inMemoryTopicsRepository = new InMemoryTopicsRepository();
        const storeTopic = new StoreTopic(inMemoryTopicsRepository);
        const removeTopic = new RemoveTopic(inMemoryTopicsRepository);

        const topic = await storeTopic.execute({
            name: 'Documentary about John Doe',
            content: '<html></html>',
        });

        await expect(removeTopic.execute(topic.id as number)).resolves.not.toThrow();
        expect(inMemoryTopicsRepository.topics.length).toEqual(0);
    });
});