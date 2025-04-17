import { createTopic, ITopic } from "../../entities/topic.js";
import { TopicsRepository } from "../../repositories/topics-respository.js";

interface StoreTopicRequest {
    name: string,
    content: string,
    parentTopicId?: number,
}

type StoreTopicResponse = ITopic

export class StoreTopic {
    constructor(
        private topicsRespository: TopicsRepository 
    ){}
    async execute({
        name,
        content,
        parentTopicId,
    }: StoreTopicRequest): Promise<StoreTopicResponse> {
        const topic = createTopic({
            name,
            content,
            parentTopicId,
        });
        return this.topicsRespository.store(topic);
    }
}

