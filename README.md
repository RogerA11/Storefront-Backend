# Storefront-Backend

This Node.js-based e-commerce platform is built using a RESTful API and designed to fulfill customer purchase requirements. It features user authentication tokens, secure user information, and testing capabilities. The code is written using TypeScript, unit testing, linting, and formatting best practices to ensure scalability and maintainability.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation & Dependencies](#installation-)
- [Environment Variables](#environment-variables)
- [Database & Server](#database--server)
- [Usage Documentation](#usage-documentation)
- 

## Getting Started

To get started with this project, follow these steps:

1. Make sure that you have Node.js and npm installed on your system. If you don't already have them, you can download and install them from the official Node.js website 

    (https://nodejs.org/)

2. Clone the repository:

   `https://github.com/RogerA11/Storefront-Backend.git`
3. Navigate to the root directory of the project:

   `cd Storefront-Backend`

4. The server is set up to listen on port number `3000`. If you need to change the port number, you can do so in the `app.listen()` function in the `src/server.ts` file.

## Installation & Dependencies

1. Open a terminal window and navigate to the root directory of your project.
2. Run the following command to install the dependencies listed in the package.json file:

   `npm install`

This will install all the packages listed in the `dependencies` and `devDependencies` sections of the `package.json` file. The packages will be downloaded from npm and placed in a `node_modules` directory within the project.

These packages are required to run the project.

- `express`: A web framework for Node.js
- `sharp`: An image processing library
- `supertest`: A library for testing HTTP APIs
- `typescript`: A typed superset of JavaScript

Installation example:

1. Open a terminal window and navigate to the root directory of your project.
2. Run the following command.

   `npm i express`

## Environment Variables
The following environment variables need to be set up for the application to function:

- POSTGRES_HOST: The host name of the PostgreSQL server.
- POSTGRES_DB: The name of the development database.
- POSTGRES_TEST_DB: The name of the test database.
- POSTGRES_USER: The username used to connect to the database.
- POSTGRES_PASSWORD: The password used to connect to the database.
- ENV: The environment in which the application is running (either dev or test).
- BCRYPT_PASSWORD: A random password used for bcrypt hashing.
- SALT_ROUNDS: The number of salt rounds to use for bcrypt hashing.
- TOKEN_SECRET: A secret key used to sign JWT tokens.

To set these variables, create a .env file in the root directory of the project and add the variables with their respective values. An example .env file is provided in the repository as .env.example. Do NOT commit the .env file to version control. Instead, provide an example file and instruct users to create their own .env file with appropriate values.

## Database & Server 
Instructions for connecting to the Postgres database and running the server.

Database
1. The `docker-compose.yml` file defines a Docker Compose service for PostgreSQL.
2. Run the following command in the terminal to start the PostgreSQL service:
   `docker-compose up`
3. Connect to a PostgreSQL database running on a Docker container:
   `psql -U postgres` and insert password `postgres4343`
4. You are now connected to the database

Server
1. To start the server run one of the following commands:
   `npm run start` or `npm run watch`
2. The terminal should return `starting app on: 0.0.0.0:3000` to indicate that the server is running 
 

## Usage Documentation
a Demo for running a RESTful route after successfully starting the server. The demo includes fictional data. Using a GET method on the products route with a specific id. This will return the product linked to the id
 
1. Insert this link into a browser and run it:
   `http://localhost:3000`
   It should display 'Hello, World!'
2. Add to the `/products/2` to the link:
   `http://localhost:3000/products/2`
3. If successful you should get a return similar to this:
   `{ "id": 2, "name": "Sapians", "price": 350, "category": "Books" }`

## Additional Notes
For further details on various methods and routes. Refer to the `REQUIREMENTS.md` file.

