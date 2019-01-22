import supertest from 'supertest';
import { expect } from 'chai';
import app from '../../../app';

const server = supertest.agent(app);

describe('<<< Parent Location Controller: ', () => {
  describe('Create Parent Location: ', () => {
    it('should return message for successful parent location creation', (done) => {
      server
        .post('/api/v1/parentLocation')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ name: 'Amuwo-Odofin' })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('New location added successfully.');
          if (err) return done(err);
          done();
        });
    });

    it('should not create location with same location name twice', (done) => {
      server
        .post('/api/v1/parentLocation')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ name: 'Amuwo-Odofin' })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Location name you entered already exist');
          if (err) return done(err);
          done();
        });
    });
  });
});
