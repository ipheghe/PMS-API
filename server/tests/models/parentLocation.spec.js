import { expect } from 'chai';
import { ParentLocation } from '../../models';
import { doBeforeAll } from '../seeders/testHooks';

describe('ParentLocation model', () => {
  doBeforeAll();

  it('should create a parent location instance', (done) => {
    ParentLocation.create({
      name: 'Alimosho',
    })
      .then((location) => {
        expect(location.id).to.be.a('number');
        expect(location.name).to.equal('Alimosho');
        done();
      });
  });

  it('should be the class of the created instance', (done) => {
    ParentLocation.create({
      name: 'Kosofe',
    })
      .then((location) => {
        expect(location instanceof ParentLocation).to.equal(true);
        done();
      }).catch(err => done(err));
  });
});
