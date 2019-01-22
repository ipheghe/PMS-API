import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../../app';

const server = supertest.agent(app);

describe('<<< Sub Location Controller: ', () => {
  describe('Create Sub Location: ', () => {
    it('should return message for successful sub location creation', (done) => {
      server
        .post('/api/v1/location')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Okoko',
          maleResidents: 70,
          femaleResidents: 80,
          parentLocationId: 103,

        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('New location added successfully.');
          expect(res.body.data.totalResidents).to.equal(150);
          if (err) return done(err);
          done();
        });
    });

    it('should not create location with same location name twice', (done) => {
      server
        .post('/api/v1/location')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Okoko',
          maleResidents: 70,
          femaleResidents: 80,
          parentLocationId: 103,
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Location name you entered already exist');
          if (err) return done(err);
          done();
        });
    });
  });
});

