import { TopicsRepository } from "../../repositories/topics-respository.js";

export class RemoveTopic {
    constructor(
        private topicsRespository: TopicsRepository 
    ){}


    async execute(id: number): Promise<number> {
        return this.topicsRespository.removeById(id);
    }
}

