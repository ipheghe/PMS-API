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

// API route to update parent location
parentLocationRoute.put(
  '/api/v1/parentLocation/:parentLocationId',
  isParentLocationExisting,
  ParentLocationController.updateParentLocation
);


export default parentLocationRoute;
