# URL Shortner

This project using the following:

### Server Application

- [Node.js](https://nodejs.org/en/): Runtime environment
- [Express.js](http://expressjs.com/): Backend framework
- [MongoDB](https://cloud.mongodb.com/): Database
- [Mongoose.js](http://mongoosejs.com/): ODM
- [jest.js](https://jestjs.io/): Unit Testing

### Client Web Application

- [Angular](https://angularjs.org/)                 : Frontend framework
- [Angular Material](https://material.angular.io/)  : Angular UI library
- [Jasmine.js](https://jasmine.github.io/)          : Testing
- [Karma.js](https://karma-runner.github.io/)       : Test Runner


## Description

Project contain 2 folder, on for Client Side Web Application and another for server side application.

The Client Side Web Application is having a page where user will be enter the long URL to be shorten.Using the shorten URL will then redirect the page the the original URL.

The server side application that will contain the API that will be use to shorten the URL input from end user and also to return the long url when the user use the shorten URL.

### Requirements

- NodeJS

## Run Server Application

cd url-shortener-server
Run Command: npm start

(Optional):
Update files in ./src/environments for the follow:
- API URL endpoint

## Run Client Application

cd url-shortener-web
Run Command: npm start
Navigate to http://localhost:4200/ in web browser

(Optional):
Update .env file for the follow:
- Listening PORT number
- CLIENT_URL for CORS
- Local MongoDB or Cloud MongoDB

## Test

Command: npm test
