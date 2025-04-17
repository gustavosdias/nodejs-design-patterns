import { ITopic } from "../entities/topic.js";

export interface TopicsRepository {
    store(topic: ITopic): Promise<ITopic>;
    update(id: number, topic: ITopic): Promise<ITopic>;
    removeById(id: number): Promise<number>;
    getById(id: number): Promise<ITopic>;
    getByVersion(id: number, version: number): Promise<ITopic>;
}