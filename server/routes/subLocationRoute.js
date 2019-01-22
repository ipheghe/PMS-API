import express from 'express';
import { LocationController } from '../controllers';
import {
  validateLocationFields,
  isLocationExisiting,
} from '../middlewares/subLocationValidation';

const subLocationRoute = express.Router();

// API route for users to create new location
subLocationRoute.post(
  '/api/v1/location',
  validateLocationFields,
  LocationController.createLocation
);

// API route for users to update location
subLocationRoute.put(
  '/api/v1/location/:locationId',
  isLocationExisiting,
  LocationController.updateLocation
);

export default subLocationRoute;
