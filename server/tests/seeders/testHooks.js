import { ParentLocation, SubLocation } from '../../models';
import {
  seedParentLocation,
  seedSubLocation,
} from './seeds';

export const populateParentLocations = () => {
  ParentLocation.bulkCreate(seedParentLocation).then(() => {
    return;
  });
};

export const populateSubLocations = () => {
  SubLocation.bulkCreate(seedSubLocation).then(() => {
    return;
  });
};

export const doBeforeAll = () => {
  before((done) => {
    ParentLocation.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });

    SubLocation.destroy({
      cascade: true,
      truncate: true,
      restartIdentity: true,
    });

    populateParentLocations();
    populateSubLocations();

    done();
  });
};
