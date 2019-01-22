import { ParentLocation } from '../models';
import {
  handleErrorMessage,
  handleSuccessMessage,
} from '../utils/messageHandler';

/**
 * @description Parent Location controller that houses different methods
 *
 * @return {void} null
 */
export default class ParentLocationController {
  /**
   * @description Add a main/parent Location
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message
   */
  static createParentLocation(req, res) {
    const { name } = req.body;
    return ParentLocation.findOne({
      where: { name },
    }).then((existingLocation) => {
      if (existingLocation && existingLocation.name === name) {
        return handleErrorMessage(res, 409, 'Location name you entered already exist');
      }
      ParentLocation.findOne({
        where: { name: 'others' },
      }).then((othersLocation) => {
        if(othersLocation) {
          return ParentLocation.create({
            name: name.trim(),
          })
            .then((location) =>
              handleSuccessMessage(res, 201, location, 'New location added successfully.'))
            .catch((error) => {
              const errorMessage = error.errors.map(value => value.message);
              return handleErrorMessage(res, 400, errorMessage);
            });
        } else {
          return ParentLocation.bulkCreate([
            { name: 'others' },
            { name: name.trim() },
          ])
          .then((locations) =>
            handleSuccessMessage(res, 201, locations, 'New location added successfully.'))
          .catch((error) => {
            const errorMessage = error.errors.map(value => value.message);
            return handleErrorMessage(res, 400, errorMessage);
          });
        }
      })
      .catch((err) => handleErrorMessage(res, 500, err));
    })
    .catch((err) => handleErrorMessage(res, 500, err));
  }

  /**
   * @description  Update a parent location
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message
   */
  static updateParentLocation(req, res) {
    const { name } = req.body;

    ParentLocation.find({ where: { id: req.params.parentLocationId } })
      .then((location) => {
        if (name) {
          return location.update({
            name: name ? name.trim() : location.name,
          })
          .then((updatedLocation) => handleSuccessMessage(
            res,
            200,
            updatedLocation,
            'Parent location details updated successfully.'))
          .catch((error) => {
            const errorMessage = error.errors.map(value => value.message);
            handleErrorMessage(res, 400, errorMessage);
          })
          .catch(err => handleErrorMessage(res, 500, err));
        }
        return handleErrorMessage(res, 400, 'Please select a field to update');
      })
      .catch((err) => handleErrorMessage(res, 500, err));
  }

  /**
   * @description Delete a contact
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message
   */
  static deleteParentLocation(req, res) {
    return ParentLocation.destroy({ where: { id: req.params.parentLocationId } })
    .then(() => handleSuccessMessage(res, 200, null, 'Parent Location deleted successfully.'))
    .catch(err => handleErrorMessage(res, 500, err));
  }
}
