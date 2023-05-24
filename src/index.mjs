import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import responseTime from 'response-time';
import serverless from 'serverless-http';
import { logger } from './logging/logger.middleware.mjs';
import { customMiddleware } from './api/custom.route.mjs';

const { NODE_ENV, PORT, RATE_WINDOW_MS, RATE_MAX_CALL } = process.env;

const app = express();

// security
app.use(rateLimit({ windowMs: RATE_WINDOW_MS, max: RATE_MAX_CALL }));
app.use(cors());
app.use(helmet());
app.use(hpp());
app.disable('x-powered-by');
app.set('etag', false);

// logging
app.use(responseTime());
app.use(logger);

// routes proxy
app.use('/api', customMiddleware);

// handle unmatched routes
app.use('*', (req, res) => {
    res.status(403).end();
});

// server start
if (NODE_ENV === 'development') {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}.`);
    });
}

export const handler = serverless(app);
