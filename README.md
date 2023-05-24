# Express Lambda Proxy

This small solution is about to create a NodeJS/Express lambda function (preferably on AWS) which serves as an API Gateway (reverse proxy) purpose.

## Prerequisites

NodeJS >=v18.0.0

## Setup

Using the .env file you can set up the following:

- NODE_ENV: with `production` it will create a serverless version of the stack which is ready to be deployed to AWS. With `development` the server will act as a usual Express server serving on localhost (with the given `PORT`).
- RATE_WINDOW_MS and RATE_MAX_CALL: configuration values for the [Rate Limiter](https://github.com/express-rate-limit/express-rate-limit)
- PROXY_TARGET: the URL where you'd like to redirect the API calls
- PROXY_TARGET_PATH: additional path for the target url is needed (like: https://proxy-target.com/proxy/target/path)
  Query parameters will also be sent to the target.

## Security

There are certain guardrails to prevent uncanny actions on the API.

- Rate limiter
- Helmet
- CORS
- HPP
- Drop unmatched routes (403)
- Express validator: you can extend the validator middleware with additional checks. Right now it only does a simple check if there is any validation error.

## Logging

There is a winston logger middleware which will report any requests bypassed by the API (with response time).

## Custom Middleware

Right now the solution is only proxies the request to the given target, additionally you can extend the solution with custom logic at the `custom.route.mjs` file.

## Run and build

### Install dependencies

```
npm install
```

### Run locally

```
npm run start:dev
```

### Run on production

```
npm run start:prod
```

### Setup for AWS

There is pre-defined script to create a distribution folder and zip-it to be able deploy it to AWS.

```
npm run build
npm run package
```

### Test and linter

```
npm run test
npm run lint
```
