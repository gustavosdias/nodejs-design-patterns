import { ITopic } from "../../entities/topic.js";
import { TopicsRepository } from "../topics-respository.js";

export class InMemoryTopicsRepository implements TopicsRepository {
    public topics: ITopic[] = [];

    async store(topic: ITopic): Promise<ITopic> {
        const lastId = this.topics.at(this.topics.length - 1)?.id;
        topic.id = lastId !== undefined ? lastId + 1 : 0;
        topic.version = 0;
        this.topics.push(topic);
        return topic;
    }

    async update(id: number, newTopic: ITopic): Promise<ITopic> {
        const currentTopic = this.topics.find((topic) => topic.id === id);
        newTopic.id = currentTopic?.id;
        newTopic.version = currentTopic?.version as number + 1;
        this.topics.push(newTopic);
        return newTopic;
    }
    

    async removeById(id: number): Promise<number> {
        this.topics.splice(id, 1);
        return id;
    }

    async getById(id: number): Promise<ITopic> {
        const topic = this.topics.find((topic) => topic.id === id);
        if(!topic) throw new Error(`Topic with id: ${id} not found`);
        return topic;
    }
}