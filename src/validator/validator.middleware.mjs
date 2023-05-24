import { validationResult, matchedData } from 'express-validator';

const validatorMiddleware = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        req.query = matchedData(req);
        next();
    } else {
        res.status(403).send({ error: result.array() });
    }
};

export { validatorMiddleware };
