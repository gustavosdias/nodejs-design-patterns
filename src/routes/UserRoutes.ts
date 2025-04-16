import { Router } from "express";
import {
    store
 } from '../controllers/TopicControllers.js';

export const UserRouter = Router();

UserRouter.post('/users', store);
// UserRouter.get('/users/:id');
// UserRouter.delete('/users/:id');
// UserRouter.put('/users/:id');