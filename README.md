[![Build Status](https://travis-ci.com/ipheghe/PMS-API.svg?branch=develop)](https://travis-ci.com/ipheghe/PMS-API) [![Coverage Status](https://coveralls.io/repos/github/ipheghe/PMS-API/badge.svg?branch=develop)](https://coveralls.io/github/ipheghe/PMS-API?branch=develop)

# PMS-API
Population Management System API is a RESTful platform that allows users to add locations and their respective population number and also to view different locations with their respective male pupulation, female population and total population number

## Table of Contents
- [Application Features](#application-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [API Documentation](#api-documentation)
- [Running the tests](#running-the-tests)
- [Contributing to the Project](#contributing-to-the-Project)
- [FAQ](#faq)

# Application Features
* Users can create parent location
* Users can update parent location
* Users can delte parent location
* Users can get a single parent location
* Users can get all parent locations
* Users can create sub/child location
* Users can update sub/child location
* Users can delte sub/child location
* Users can get a sub/child parent location
* Users can get all sub/child locations

# Technology Stack
* NodeJS
* Express
* Sequelize ORM
* Postgresql Relational Database
* Mocha

## Getting Started
Get the app running locally in the following way:
```
# Clone the Repo
git clone https://github.com/ipheghe/PMS-API.git

# Install all dependencies
yarn install

# Run Database migrations
sequelize db:migrate

# Run the application locally
> yarn run start:dev

# Open running application
> http:localhost:8000/
```
The server will now be running at `http://localhost:8000`
  
## API
There a several API endpoints covering two sections namely `parent location` and `child/sub location`.

**Parent Location Endpoints**
- `POST /api/v1/parentLocation` - create parent location
- `GET /api/v1/parentLocation` - get all parent locations
- `GET /api/v1/parentLocation/:parentLocationId` - get a parent location
- `PUT /api/v1/parentLocation/:parentLocationId` - update parent location
- `POST /api/v1/parentLocation/:parentLocationId` - delete parent location

**Sub/Child Location Endpoints**
- `POST /api/v1/location` - create sub/child location
- `GET /api/v1/location` - get all sub/child locations
- `GET /api/v1/location/:locationId` - get a sub/child location
- `PUT /api/v1/location/:locationId` - update sub/child location
- `POST /api/v1/location/:locationId` - delete sub/child location

## Running the tests
The application uses the following libraries for testing:
-   Mochai/Chai and Supertest for backend testing
Instructions to test the application:
-   Run server-side test with `yarn test`

## Contributing to the Project
Contributions are welcome and appreciated. To contribute

-  Fork this repository [here](https://github.com/ipheghe/PMS-API)
-  Open a terminal and execute the following command to make a local copy
`$ git clone https://github.com/ipheghe/PMS-API.git`
-  Run this code to navigate into the folder `cd PMS-API`
-  Make your contributions to your local copy of the project
-  Run `git add` and `git commit` to commit your contributions to the project
-  Run `git push` to push your changes to your copy of the repository
-  If you feel you've made a contribution that will improve the project, raise a pull Request against the development branch.
- Be descriptive enough about your contributions so other contributors will understand what you've done
-  I look forward to your pull requests!

## FAQ
#### Is this an Open-Source Application?

    Yes it is, and contributing to the development of this
    application is by raising PRs
    

#### Who can contribute?

    Anyone!. This application is open to all those who want to
    contribute to open-source development and are willing to follow
    set standards for contributing.
    
#### What language was used to develop this application?

    This project was built with Javascript language
    
#### Can I clone this application for personal use?

    Yes!. This application is licensed under MIT, and is open for
    whatever you may choose to use it for.

## Credits

  Ovie Ipheghe, Andela Fellowship

## License
  This project is available for use and modification under the MIT License. See the LICENSE file for more details.

  



