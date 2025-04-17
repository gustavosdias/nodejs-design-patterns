import { ITopic } from "../../entities/topic.js";
import { TopicsRepository } from "../../repositories/topics-respository.js";

type GetTopicByIdResponse = ITopic;

export class GetTopicById{
    constructor(
        private topicsRespository: TopicsRepository 
    ){}

    async execute(id: number): Promise<GetTopicByIdResponse> {
        return this.topicsRespository.getById(id);
    }
}

