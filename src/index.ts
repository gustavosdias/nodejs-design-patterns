import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';

import topicRouter from './routes/topic-routes.js';
import * as swaggerDoc from '../swagger.json';

// setup all routes
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/topics', topicRouter);


app.listen(3000, () => {
    console.log('Backend is running on port 3000');
});
