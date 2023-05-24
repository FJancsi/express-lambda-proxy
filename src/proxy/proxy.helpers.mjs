const pathRewriteHelper = (path, req) => {
    const { query = {} } = req ?? {};
    const params = Object.entries(query).reduce(
        (newUrl, [key, value], index) => `${newUrl}${index ? '&' : '?'}${key}=${encodeURI(value)}`,
        ''
    );
    return `${path ?? ''}${params ?? ''}`;
};

const pathFilter = (path, req) => {
    return !!path.match('^/api') && req.method === 'GET';
};

export { pathFilter, pathRewriteHelper };
