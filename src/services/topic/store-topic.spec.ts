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
    });
});