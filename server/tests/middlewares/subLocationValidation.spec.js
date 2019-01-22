import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../../app';

const server = supertest.agent(app);

describe('<<< SubLocation Validation Middleware: ', () => {
  describe('Create Sub Locqation Validation: ', () => {
    it('should return an error message for null message field', (done) => {
      server
        .post('/api/v1/location')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: '',
          maleResidents: 20,
          femaleResidents: 30,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('name field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for invalid name length', (done) => {
      server
        .post('/api/v1/location')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'ko',
          maleResidents: 20,
          femaleResidents: 30,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('name must have more than 2 characters');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for null male residents field', (done) => {
      server
        .post('/api/v1/location')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Satellite',
          maleResidents: '',
          femaleResidents: 30,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('male residents field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for null female residents field', (done) => {
      server
        .post('/api/v1/location')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Satellite',
          maleResidents: 20,
          femaleResidents: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('female residents field cannot be empty');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for an invalid female residents value', (done) => {
      server
        .post('/api/v1/location')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Satellite',
          maleResidents: 'aasddd',
          femaleResidents: 22,
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('male residents must contain only numbers');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for an ivalid female residents value', (done) => {
      server
        .post('/api/v1/location')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({
          name: 'Satellite',
          maleResidents: 20,
          femaleResidents: 'aaaa',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('female residents must contain only numbers');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('Exisiting Sub Location Validation: ', () => {
    it('should return an error message for an invalid locationId', (done) => {
      server
        .delete('/api/v1/location/aaa')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid ID');
          if (err) return done(err);
          done();
        });
    });

    it('should return an error message for a non-existent locationId', (done) => {
      server
        .delete('/api/v1/location/230')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('location does not exist');
          if (err) return done(err);
          done();
        });
    });
  });
});
