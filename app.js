import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import {
  parentLocationRoute,
  subLocationRoute,
} from './server/routes';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
app.use(parentLocationRoute);
app.use(subLocationRoute);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of PMS-API.',
}));

export default app;
