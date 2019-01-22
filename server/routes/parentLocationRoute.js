import express from 'express';
import ParentLocationController from '../controllers';
import {
  validateParentLocationFields,
  isParentLocationExisting,
} from '../middlewares/parentLocationValidation';

const parentLocationRoute = express.Router();

// API route to create parent location
parentLocationRoute.post(
  '/api/v1/parentLocation',
  validateParentLocationFields,
  ParentLocationController.createParentLocation
);

// API route to get a single parent location
parentLocationRoute.get(
  '/api/v1/parentLocation/:parentLocationId',
  isParentLocationExisting,
  ParentLocationController.getParentLocation
);

// API route to update parent location
parentLocationRoute.put(
  '/api/v1/parentLocation/:parentLocationId',
  isParentLocationExisting,
  ParentLocationController.updateParentLocation
);

// API route to delete parent location
parentLocationRoute.delete(
  '/api/v1/parentLocation/:parentLocationId',
  isParentLocationExisting,
  ParentLocationController.deleteParentLocation
);

export default parentLocationRoute;
