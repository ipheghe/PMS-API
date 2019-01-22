import express from 'express';
import { LocationController } from '../controllers';
import {
  validateLocationFields,
} from '../middlewares/subLocationValidation';

const subLocationRoute = express.Router();

// API route for users to create new location
subLocationRoute.post(
  '/api/v1/location',
  validateLocationFields,
  LocationController.createLocation,
);

export default subLocationRoute;
