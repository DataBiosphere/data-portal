# HCA Data Portal

## Developer Workspace

### Requirements

* `Node.js` ([https://nodejs.org/en/](https://nodejs.org/en/)), version 14.16.0. 

* We recommend using `n` ([https://github.com/tj/n](https://github.com/tj/n)) as the Node.js package manger. 

* `npm` ([https://www.npmjs.com/](https://www.npmjs.com/)) is bundled with `Node.js` and is required to manage application dependencies.

* [git-secrets] must be installed

[git-secrets]: https://github.com/awslabs/git-secrets


### Setup

##### Clone Repo

Clone the `data-portal` repo:

	git@github.com:HumanCellAtlas/data-portal.git

##### Install git-secrets

If you have push access to the remote, you'll need to install [git-secrets],
   enable the commit hooks for it and configure patterns for AWS and Google:

   ```
   git secrets --install
   git secrets --register-aws
   git secrets --add '[-]----BEGIN.PRIVATE.KEY-----'
   ```

##### Install Gatsby Command Line Tool

The Gatsby command line tool is used to develop, build and serve (locally) the Data Portal.

    npm install --global gatsby-cli

##### Install Packages

Run the following command from the project's root directory to install the required packages: 

	npm install

### Development Server

Run the following command from the root directory:

`npm start`

Or if using Windows:

`npm run start-windows`

The development server can be viewed at:

`localhost:8000`

### Building 

Run the following command to build the application:

`npm run build`

Or on Windows:

`npm run build-windows`

#### Local Production Version

Run the following command to view a built version of the application, locally:

`gatsby serve`

The built version can be viewed at:

`localhost:9000`

### Application Dependencies

#### Material Components

HCA Data Preview uses Material Components ([https://material.io/components/web/](https://material.io/components/web/)) for its Material Design library.


