import { ITopic } from "../../entities/topic.js";
import { TopicsRepository } from "../../repositories/topics-respository.js";

type GetTopicByVersionResponse = ITopic;

export class GetTopicByVersion {
    constructor(
        private topicsRespository: TopicsRepository 
    ){}

    async execute(id: number, version: number): Promise<GetTopicByVersionResponse> {
        return this.topicsRespository.getByVersion(id, version);
    }
}

