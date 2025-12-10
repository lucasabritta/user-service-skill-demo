[![Run Tests](https://github.com/lucasabritta/user-service-skill-demo/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/lucasabritta/user-service-skill-demo/actions/workflows/unit-tests.yml) [![Check format](https://github.com/lucasabritta/user-service-skill-demo/actions/workflows/check-format.yml/badge.svg?branch=master)](https://github.com/lucasabritta/user-service-skill-demo/actions/workflows/check-format.yml) [![Build artifacts](https://github.com/lucasabritta/user-service-skill-demo/actions/workflows/build-artifacts.yml/badge.svg)](https://github.com/lucasabritta/user-service-skill-demo/actions/workflows/build-artifacts.yml)

# Backend Engineer Work Sample

This project skeleton contains a basic Express setup one endpoint to create a user and one endpoint to fetch all users, as well as a basic empty unit test.

## Pre requisites

1. Having docker installed

    - https://www.docker.com/products/docker-desktop/

## Scripts

### Development

`npm run dev`  
Starts the server and launches the local MongoDB defined in `infrastructure/database`.

### Production

`npm run docker:build`  
Builds the Docker image using the project Dockerfile.

`npm run docker:run`  
Starts a Docker container from the built image and exposes the service.

### Tests

`npm test`  
Runs the entire test suite with coverage enabled.

### Formatting

`npm run format`  
Formats all supported files with Prettier.

`npm run format:check`  
Validates formatting without applying changes.

## Goal

1. Adjust POST /users that it accepts a user and stores it in a database.
    - The user should have a unique id, a name, a unique email address and a creation date
2. Adjust GET /users that it returns (all) users from the database.
    - This endpoint should be able to receive a query parameter `created` which sorts users by creation date ascending or descending.
3. Adjust DELETE /users/:userId to delete the user from the database
    - Deletes a single user from the database based on the provided userId route parameter.
4. Adjust PUT /users/:userId to update the user from the database
    - This endpoint should be able to receive as body the `name` and/or `email` which will update the user.
