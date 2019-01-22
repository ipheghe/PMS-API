import { expect } from 'chai';
import { SubLocation } from '../../models';

describe('Sms model', () => {

  it('should create a sub location instance', (done) => {
    SubLocation.create({
      name: 'Egbeda',
      maleResidents: 20,
      femaleResidents: 30,
      totalResidents: 50,
      parentLocationId: 101,
    })
      .then(location => {
        expect(location.id).to.be.a('number');
        expect(location.name).to.equal('Egbeda');
        expect(location.maleResidents).to.equal(20);
        expect(location.femaleResidents).to.equal(30);
        expect(location.totalResidents).to.equal(50);
        done();
      });
  });

  it('should be the class of the created instance', (done) => {
    SubLocation.create({
      name: 'Oniru',
      maleResidents: 34,
      totlResidents: 94,
      femaleResidents: 60,
      parentLocationId: 101,
    })
      .then((location) => {
        expect(location instanceof SubLocation).to.equal(true);
        expect(location.name).to.equal('Oniru');
        done();
      }).catch(err => done(err));
  });
});
