import { Router } from 'express';
import { proxyMiddleware } from '../proxy/proxy.middleware.mjs';
import { validatorMiddleware } from '../validator/validator.middleware.mjs';

const { PROXY_TARGET = '', PROXY_TARGET_PATH = '/' } = process.env;

const customMiddleware = Router();

customMiddleware.use(validatorMiddleware, proxyMiddleware(PROXY_TARGET, PROXY_TARGET_PATH));

export { customMiddleware };
