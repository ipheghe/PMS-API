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

// API route for users to get all locations
subLocationRoute.get('/api/v1/location', LocationController.getAllLocations);

// API route for users to get a single location
subLocationRoute.get(
  '/api/v1/location/:locationId',
  isLocationExisiting,
  LocationController.getLocation
);

// API route for users to update location
subLocationRoute.put(
  '/api/v1/location/:locationId',
  isLocationExisiting,
  LocationController.updateLocation
);

// API route for users to delete location
subLocationRoute.delete(
  '/api/v1/location/:locationId',
  isLocationExisiting,
  LocationController.deleteLocation
);

export default subLocationRoute;
