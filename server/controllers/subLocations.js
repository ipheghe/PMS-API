import {
  ParentLocation,
  SubLocation,
} from '../models';
import {
  handleErrorMessage,
  handleSuccessMessage,
} from '../utils/messageHandler';

/**
 * @description Location controller that houses different methods
 *
 * @return {void} null
 */
export default class LocationController {
  /**
   * @description controller function that handles creation of new sub location
   *
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @return {object} status message
   */
  static createLocation(req, res) {
    const { name, maleResidents, femaleResidents } = req.body;

    const createSubLocation = parentLocationId =>
      SubLocation.create({
        name: name.trim(),
        maleResidents: parseInt(maleResidents, 10),
        femaleResidents: parseInt(femaleResidents, 10),
        totalResidents:
          parseInt(maleResidents, 10) + parseInt(femaleResidents, 10),
        parentLocationId,
      })
        .then(location => {
          handleSuccessMessage(
            res,
            201,
            location,
            'New location added successfully.'
          );
        })
        .catch(error => {
          const errorMessage = error.errors.map(value => value.message);
          return handleErrorMessage(res, 400, errorMessage);
        });

    return SubLocation.findOne({
      where: { name },
    })
      .then(existingLocation => {
        if (existingLocation && existingLocation.name === name) {
          return handleErrorMessage(
            res,
            409,
            'Location name you entered already exist'
          );
        }

        return ParentLocation.findOne({ where: { name } })
          .then(existingName => {
            if (existingName) {
              return handleErrorMessage(
                res,
                409,
                'Location name you entered already exist'
              );
            }

            if (req.query.parentLocationId) {
              return createSubLocation(req.query.parentLocationId);
            }
            return ParentLocation.findOne({
              where: { name: 'others' },
            }).then(othersLocation => {
              if (othersLocation) {
                return createSubLocation(othersLocation.id);
              } else {
                return ParentLocation.create({ name: 'others' })
                  .then(location => createSubLocation(location.id))
                  .catch(error => {
                    const errorMessage = error.errors.map(
                      value => value.message
                    );
                    return handleErrorMessage(res, 400, errorMessage);
                  });
              }
            });
          })
          .catch(err => handleErrorMessage(res, 500, err));
      })
      .catch(err => handleErrorMessage(res, 500, err));
  }
}
