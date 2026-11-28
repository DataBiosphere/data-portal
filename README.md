# HCA Data Portal

## Developer Workspace

### Requirements

* `Node.js` ([https://nodejs.org/en/](https://nodejs.org/en/)), version 22.12.0. 

* We recommend using `n` ([https://github.com/tj/n](https://github.com/tj/n)) as the Node.js package manger. 

* `npm` ([https://www.npmjs.com/](https://www.npmjs.com/)) is bundled with `Node.js` and is required to manage application dependencies.


### Setup

##### Clone Repo

Clone the `data-portal` repo:

`git clone git@github.com:DataBiosphere/data-portal.git`

##### Install Packages

Run the following command from the root directory to install the required packages: 

`npm install`

### Development Server

Run the following command:

`npm run dev`

The development server can be viewed at:

`localhost:3000`

### Testing

Run the unit tests:

`npm test`

Run them with coverage, which fails when line or branch coverage drops below the floors in `jest.config.js`:

`npm run test:coverage`

Check that at least 80% of the lines your branch changes are covered. This needs [uv](https://docs.astral.sh/uv/), reads the report `npm run test:coverage` writes, and compares against `origin/main`, so run `git fetch origin main` first:

`npm run test:diff-coverage`

### Building 

Run the following command to build the dev version of the application:

`npm run build-dev:data-portal`

The buit version can be run using:

`npm start`

And can be viewed at:

`localhost:3000`
