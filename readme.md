# Rester API

## Details
Rest API backend is setup using [Koa JS](http://koajs.com), [Knex JS](http://knexjs.org) and uses Mysql as the database. It has the basic connection setup required to start a project with Koa and Knex

## Setup
* Install node, nodemon, mysql2 in the system
* git clone the project
* ``` cd rester ```
* ``` npm install ```
* ``` npm install knex -g ```
* ``` knex migrate:latest ``` or uncomment the last line in src/db.js
* Start project with ``` npm start ```

## Future Work
* Connecting Objection.js in the project to write sql
