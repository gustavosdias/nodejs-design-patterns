import { Router } from "express";
import { getById, remove, store, update } from "../controllers/topic-controller.js";

const topicRouter = Router();

topicRouter.get('/:id', getById);
topicRouter.post('/', store);
topicRouter.delete('/:id', remove);
topicRouter.put('/:id', update);

export default topicRouter;