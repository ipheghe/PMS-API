import express from 'express';
import ParentLocationController from '../controllers';
import {
  validateParentLocationFields,
} from '../middlewares/parentLocationValidation';

const parentLocationRoute = express.Router();

// API route to create parent location
parentLocationRoute.post(
  '/api/v1/parentLocation',
  validateParentLocationFields,
  ParentLocationController.createParentLocation
);

export default parentLocationRoute;
