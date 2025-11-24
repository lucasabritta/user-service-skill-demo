[![Run Tests](https://github.com/lucasabritta/user-service-skill-demo/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/lucasabritta/user-service-skill-demo/actions/workflows/unit-tests.yml) [![Check format](https://github.com/lucasabritta/user-service-skill-demo/actions/workflows/check-format.yml/badge.svg?branch=master)](https://github.com/lucasabritta/user-service-skill-demo/actions/workflows/check-format.yml)

# Backend Engineer Work Sample

This project skeleton contains a basic Express setup one endpoint to create a user and one endpoint to fetch all users, as well as a basic empty unit test.

## Pre requisites

1. Having docker installed

    - https://www.docker.com/products/docker-desktop/

1. Having Node installed
    - https://nodejs.org/en/download

## Scripts

`npm start` starts the server

`npm test` executes the tests

## Goal

1. Adjust POST /users that it accepts a user and stores it in a database.
    - The user should have a unique id, a name, a unique email address and a creation date
2. Adjust GET /users that it returns (all) users from the database.
    - This endpoint should be able to receive a query parameter `created` which sorts users by creation date ascending or descending.

Feel free to add or change this project as you like.
