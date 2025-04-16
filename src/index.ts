import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';
import bodyParser from 'body-parser';

import topicRouter from './routes/TopicRoutes.js';

// connect database
const defaultData = {topics: [], users: []};
await JSONFilePreset('db.json', defaultData);

// setup all routes
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(topicRouter);

app.listen(3000, () => {
    console.log('Backend is running on port 3000');
});
