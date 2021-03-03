# EliteHax Community API

The revival of the mobile game EliteHax has begun. Here resides the new API.
It's written in TypeScript, but it is based on the old PHP backend.
The source code for the old backend can be found [here](https://github.com/Dav1337de/EliteHax).


## Requirements

These are the absolute necessities to run the API (and database):

 * NodeJS 14+
 * MySQL 8+


## Optional

These are **_highly recommended_**, but technically not needed:

 * Yarn (like npm, but better)
 * Knex (installed globally, that is)
 * WebStorm IDE (it's what I use, and if everyone uses it we can sync settings etc.)


## Setup

Of course, run `yarn` (or `npm i`). After that, you need to set up a couple more things:

### Config

 1. Create a file called `.env.development` in the top-level folder
 2. Copy the example from `sample.env` into your new file
 3. Fill in the values

You should make a .env file for each environment (e.g. `.env.test` for running tests) to prevent data loss during development.

### Database

 1. Create a MySQL database if you haven't already
 2. In a terminal: `npm run migrate:latest` to set up the database structure
    * Alternatively run `knex migrate:latest` - it's the same thing.

## Run

In a terminal do: `npm run start`. That's it.


---

You're always welcome to open an issue or a PR, but please be patient as this is just a hobby, not a job.
