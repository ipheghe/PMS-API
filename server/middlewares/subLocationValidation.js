import { SubLocation } from '../models';
import { handleErrorMessage } from '../utils/messageHandler';

/**
 * @description middleware function to validate location fields
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const validateLocationFields = (req, res, next) => {
  const numericExpression = /^[0-9]+$/;
  // check if name field is empty
  if (!req.body.name || req.body.name.trim() === '') {
    return handleErrorMessage(res, 400, 'name field cannot be empty');
  }

  // check if male residents field is empty
  if (!req.body.maleResidents || req.body.maleResidents.trim() === '') {
    return handleErrorMessage(res, 400, 'male residents field cannot be empty');
  }

  // check if female residents field is empty
  if (!req.body.femaleResidents || req.body.femaleResidents.trim() === '') {
    return handleErrorMessage(res, 400, 'female residents field cannot be empty');
  }
  
  // check if name field contains more than 2 characters
  if (req.body.name.length < 3) {
    return handleErrorMessage(res, 400, 'name must have more than 2 characters');
  }

  // check if male residents field contains only numbers
  if (!req.body.maleResidents.match(numericExpression)) {
    return handleErrorMessage(res, 400, 'male residents must contain only numbers');
  }

  // check if male residents field contains only numbers
  if (!req.body.femaleResidents.match(numericExpression)) {
    return handleErrorMessage(res, 400, 'female residents must contain only numbers');
  }

  return next();
};

/**
 * @description middleware function to check if location exists
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const isLocationExisiting = (req, res, next) => {
  if (Number.isNaN(parseInt(req.params.locationId, 10))) {
    return handleErrorMessage(res, 400, 'Please provide a valid ID');
  }
  SubLocation
    .find({ where: { id: req.params.locationId } })
    .then((location) => {
      if (!location) {
        return handleErrorMessage(res, 404, 'location does not exist');
      }
      next();
    })
    .catch(error => handleErrorMessage(res, 500, error));
};
