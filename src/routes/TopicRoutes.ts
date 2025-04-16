import { Router } from "express";

const topicRouter = Router();

topicRouter.get('/topics/:id');
topicRouter.post('/topic');
topicRouter.delete('/topic:id');
topicRouter.put('/topic/:id');

export default topicRouter;