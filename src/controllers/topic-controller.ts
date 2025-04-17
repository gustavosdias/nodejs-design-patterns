import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StoreTopic } from "../services/topic/store-topic.js";
import { InMemoryTopicsRepository } from "../repositories/in-memory/in-memory-topics-repository.js";
import { GetTopicById } from "../services/topic/get-topic-by-id.js";
import { UpdateTopic } from "../services/topic/update-topic.js";
import { RemoveTopic } from "../services/topic/remove-topic.js";
import { refReplacer } from "../utils/reference-replacer.js";

const inMemoryTopicsRepository = new InMemoryTopicsRepository();

export const store = asyncHandler(async (req: Request, res: Response) => {
    const storeTopic = new StoreTopic(inMemoryTopicsRepository);
    const result = await storeTopic.execute(req.body);
    res.send(JSON.stringify(result, refReplacer()));
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
    const getTopicById = new GetTopicById(inMemoryTopicsRepository);
    const result = await getTopicById.execute(req.query.id as unknown as number);
    res.send(JSON.stringify(result, refReplacer()));
});

export const update = asyncHandler(async (req: Request, res: Response) => {
    const updateTopic = new UpdateTopic(inMemoryTopicsRepository);
    const result = await updateTopic.execute(req.query.id as unknown as number, req.body);
    res.send(JSON.stringify(result, refReplacer()));
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
    const removeTopic = new RemoveTopic(inMemoryTopicsRepository);
    const result = await removeTopic.execute(req.query.id as unknown as number);
    res.send(result);
});