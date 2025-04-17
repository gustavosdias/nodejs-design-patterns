import { ITopic } from "../../entities/topic.js";
import { TopicsRepository } from "../../repositories/topics-respository.js";

interface UpdateTopicRequest {
    id: number,
    data: ITopic,
}

type UpdateTopicResponse = ITopic

export class UpdateTopic {
    constructor(
        private topicsRespository: TopicsRepository 
    ){}
    async execute({
        id,
        data,
    }: UpdateTopicRequest): Promise<UpdateTopicResponse> {
        return this.topicsRespository.update(id, data);
    }
}

