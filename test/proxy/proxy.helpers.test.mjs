import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import { pathFilter, pathRewriteHelper } from '../../src/proxy/proxy.helpers.mjs';

describe('Path rewrite helper', () => {
    it('should return path and request params if both are given', () => {
        const req = {
            query: {
                a: 1,
                b: 2,
                c: 3
            }
        };
        const url = pathRewriteHelper('/test/v1', req);
        const expectedUrl = '/test/v1?a=1&b=2&c=3';
        assert.strictEqual(url, expectedUrl);
    });
    it('should return only the path if the params are not given', () => {
        const url = pathRewriteHelper('/test/v1', null);
        const expectedUrl = '/test/v1';
        assert.strictEqual(url, expectedUrl);
    });
    it('should return only the request params if path is not given', () => {
        const req = {
            query: {
                a: 1,
                b: 2,
                c: 3
            }
        };
        const url = pathRewriteHelper(null, req);
        const expectedUrl = '?a=1&b=2&c=3';
        assert.strictEqual(url, expectedUrl);
    });
    it('should not return anything if path and request params are not given', () => {
        const url = pathRewriteHelper(null, null);
        const expectedUrl = '';
        assert.strictEqual(url, expectedUrl);
    });
});

describe('Path filter function', () => {
    it('should bypass the request if the route starts with `api` and the http method is GET', () => {
        const path = '/api';
        const req = {
            method: 'GET'
        };

        const shouldAllow = pathFilter(path, req);
        assert.strictEqual(shouldAllow, true);
    });
    it('should not bypass the request if the route does not start with `api`', () => {
        const path = '/test';
        const req = {
            method: 'GET'
        };

        const shouldAllow = pathFilter(path, req);
        assert.strictEqual(shouldAllow, false);
    });
    it('should not bypass the request if the request method is not GET', () => {
        const path = '/api';
        const req = {
            method: 'POST'
        };

        const shouldAllow = pathFilter(path, req);
        assert.strictEqual(shouldAllow, false);
    });
    it('should not bypass the request if the request method and the path are invalid', () => {
        const path = '/test';
        const req = {
            method: 'POST'
        };

        const shouldAllow = pathFilter(path, req);
        assert.strictEqual(shouldAllow, false);
    });
});
