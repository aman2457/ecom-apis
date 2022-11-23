# Ecommerce API's
REST API's for an e-commerce marketplace.

---
## Requirements

For development, you will need Node.js, Postgres and a node global package, Yarn, installed in your environement.

### Postgres Db Setup
- Create a postgres database and store the credentials somewhere.
- Copy contents of `scripts/create-table.sql` and run the queries on postgres server to create the tables. 

### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn
---

## Install

    $ git clone https://github.com/aman2457/ecom-apis.git
    $ cd ecom-apis
    $ yarn install

## Configure app
- Create `.env` file in root of your repository
- Check `.env.example` file and set the variables accordingly.
- `TOKEN_SECRET_KEY` is a sign key to generate jsob web token, copy the `
63 random alpha-numeric characters (a-z, A-Z, 0-9)` value from this [website](https://www.grc.com/passwords.htm) and set the `TOKEN_SECRET_KEY` value.

## Running the project
- If all the above steps are completed then we can run this project using
    `yarn start` to run the server
    `yarn watch` to run the server in watch mode
- After running the server you can go to `scripts/Ecom APis.postman_collection.json` to access postman collections of endpoints.
