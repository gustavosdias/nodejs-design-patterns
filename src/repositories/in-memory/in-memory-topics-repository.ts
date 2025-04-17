import { ITopic } from "../../entities/topic.js";
import { TopicsRepository } from "../topics-respository.js";

export class InMemoryTopicsRepository implements TopicsRepository {
    public topics: ITopic[] = [];

    async store(topic: ITopic): Promise<ITopic> {
        const lastId = this.topics.at(this.topics.length - 1)?.id;
        topic.id = lastId === undefined ? 0 : lastId + 1;
        topic.version = 0;
        if(topic.parentTopicId !== undefined && topic.parentTopicId >= 0) {
            const parentTopic = this.topics.find((t) => t.id === topic.parentTopicId);
            if(!parentTopic) {
                throw new Error(`Parent Topic with id: ${topic.parentTopicId} was not found`);
            }
            parentTopic.addChild!(topic);
            topic.setParent!(parentTopic);
        }
        this.topics.push(topic);
        return topic;
    }

    async update(id: number, newTopic: ITopic): Promise<ITopic> {
        const currentTopic =   this.topics.filter(t => t.id === id)
            .sort((a, b) => b.version! - a.version!)[0];
        if(!currentTopic) {
            throw new Error(`Topic with id: ${id} not found.`);
        }
        newTopic.id = currentTopic!.id;
        newTopic.version = currentTopic!.version! + 1;
        newTopic.updatedAt = new Date();
        this.topics.push(newTopic);
        return newTopic;
    }
    

    async removeById(id: number): Promise<number> {
        const topicIndexes: number[] = [];
        this.topics.forEach((t, i) => {
            if(t.id === id) {
                topicIndexes.push(i);
            } 
        });
        if(topicIndexes.length === 0){
            throw new Error(`Topic with id: ${id} not found.`);
        }
        topicIndexes.forEach((i) => {
            this.topics.splice(i, 1);
        });

        return id;
    }

    async getById(id: number): Promise<ITopic> {
        const topic = this.topics.filter(t => t.id === id)
            .sort((a, b) => b.version! - a.version!)[0];
        if(!topic) throw new Error(`Topic with id: ${id} not found`);
        return topic;
    }

    async getByVersion(id: number, version: number): Promise<ITopic> {
        const topic = this.topics.find((topic) => topic.id === id && topic.version === version);
        if(!topic) throw new Error(`Topic with id: ${id} not found`);
        return topic;
    }
}