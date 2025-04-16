import { createTopic, ITopic } from "../../entities/topic.js";

interface StoreTopicRequest {
    name: string,
    content: string,
    parentTopicId?: number,
}

type StoreTopicResponse = ITopic

export class StoreTopic {
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
        return topic;
    }
}

