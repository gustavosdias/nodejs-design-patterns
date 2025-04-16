import { describe, expect, it } from "vitest";
import { StoreTopic } from "./store_topic.js";


describe('Store Topic', async () => {
    it('should be able to store a parent topic', () => {
        const storeTopic = new StoreTopic();

        expect(storeTopic.execute({
            name: 'Documentary about John Doe',
            content: '<html></html>',
        })).resolves.not.toThrow();
    });
});