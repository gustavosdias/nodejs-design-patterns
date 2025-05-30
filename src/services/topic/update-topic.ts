import { ITopic } from "../../entities/topic.js";
import { TopicsRepository } from "../../repositories/topics-respository.js";

type UpdateTopicResponse = ITopic

export class UpdateTopic {
    constructor(
        private topicsRespository: TopicsRepository 
    ){}
    async execute(id: number, data: ITopic): Promise<UpdateTopicResponse> {
        return this.topicsRespository.update(id, data);
    }
}

