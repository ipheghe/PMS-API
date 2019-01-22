import { ParentLocation } from '../models';
import { handleErrorMessage } from '../utils/messageHandler';

/**
 * @description middleware function to validate parent location fields
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const validateParentLocationFields = (req, res, next) => {
  // check if name field is empty
  if (!req.body.name || req.body.name.trim() === '') {
    return handleErrorMessage(res, 400, 'name field cannot be empty');
  }
  
  // check if name field contains more than 2 characters
  if (req.body.name.length < 3) {
    return handleErrorMessage(res, 400, 'name must have more than 2 characters');
  }

  return next();
};

/**
 * @description middleware function to check if parent location exists
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const isParentLocationExisting = (req, res, next) => {
  if (Number.isNaN(parseInt(req.params.parentLocationId, 10))) {
    return handleErrorMessage(res, 400, 'Please enter a valid ID');
  }
  ParentLocation.findById(req.params.parentLocationId)
    .then((location) => {
      if (!location) {
        return handleErrorMessage(res, 404, 'Parent location not available!');
      }
      next();
    });
};
