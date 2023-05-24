import { createProxyMiddleware } from 'http-proxy-middleware';
import { pathFilter, pathRewriteHelper } from './proxy.helpers.mjs';

const proxyMiddleware = (target, proxyPath) => {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        pathFilter,
        pathRewrite: (_pathReq, req) => pathRewriteHelper(proxyPath, req)
    });
};

export { proxyMiddleware };
