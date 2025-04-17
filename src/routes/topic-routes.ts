import { Router } from "express";
import { getById, remove, store, update } from "../controllers/topic-controller.js";

const topicRouter = Router();

topicRouter.post('/', store);
topicRouter.get('/:id', getById);
topicRouter.delete('/:id', remove);
topicRouter.put('/:id', update);

export default topicRouter;