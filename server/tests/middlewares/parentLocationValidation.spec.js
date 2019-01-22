import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../../app';

const server = supertest.agent(app);

describe('<<< ParentLocationValidation Middleware: ', () => {
  describe('Create Parent Location Validation: ', () => {
    it('should return an error message for null name field', (done) => {
      server
        .post('/api/v1/parentLocation')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ name: '' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('name field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for invalid name length', (done) => {
      server
        .post('/api/v1/parentLocation')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ name: 'ko' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('name must have more than 2 characters');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Existing Parent Location Validation: ', () => {
    it('should return an error message for an invalid parentLocationId', (done) => {
      server
        .put('/api/v1/parentLocation/a')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ name: 'Kosofe' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please enter a valid ID');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for a non-existent parentLocationId', (done) => {
      server
        .put('/api/v1/parentLocation/200')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ name: 'Kosofe' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Parent location not available!');
          if (err) return done(err);
          done();
        });
    });
  });
});
