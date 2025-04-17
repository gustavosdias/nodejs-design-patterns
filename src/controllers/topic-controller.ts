import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StoreTopic } from "../services/topic/store-topic.js";
import { InMemoryTopicsRepository } from "../repositories/in-memory/in-memory-topics-repository.js";

const inMemoryTopicsRepository = new InMemoryTopicsRepository();

export const store = asyncHandler(async (req: Request, res: Response) => {
    const storeTopic = new StoreTopic(inMemoryTopicsRepository);
    const result = await storeTopic.execute(req.body);
    res.send(result);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
    const inMemoryTopicsRepository = new InMemoryTopicsRepository();
    const storeTopic = new StoreTopic(inMemoryTopicsRepository);
    const result = await storeTopic.execute(req.body);
    res.send(result);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
    const inMemoryTopicsRepository = new InMemoryTopicsRepository();
    const storeTopic = new StoreTopic(inMemoryTopicsRepository);
    const result = await storeTopic.execute(req.body);
    res.send(result);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
    const inMemoryTopicsRepository = new InMemoryTopicsRepository();
    const storeTopic = new StoreTopic(inMemoryTopicsRepository);
    const result = await storeTopic.execute(req.body);
    res.send(result);
});