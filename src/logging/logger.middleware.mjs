import { format, transports } from 'winston';
import expressWinston from 'express-winston';

const logger = expressWinston.logger({
    transports: [new transports.Console()],
    format: format.json(),
    statusLevels: true,
    meta: false,
    level: 'debug',
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    expressFormat: true,
    ignoreRoute() {
        return false;
    }
});

export { logger };
