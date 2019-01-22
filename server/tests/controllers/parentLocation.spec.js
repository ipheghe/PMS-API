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

  describe('Update Parent Location: ', () => {
    it('displays success message after updating a parent location successfully', (done) => {
      server
        .put('/api/v1/parentLocation/102')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ name: 'Eti-osa' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Parent location details updated successfully.');
          expect(res.body.data.name).to.equal('Eti-osa');
          if (err) return done(err);
          done();
        });
      });

      it('displays an error message if user does not input any value to update', (done) => {
        server
          .put('/api/v1/parentLocation/102')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Please select a field to update');
            if (err) return done(err);
            done();
          });
      });
  });


  describe('Delete Parent Loction: ', () => {
    it('should return a success message after deleting a parent location', (done) => {
      server
        .delete('/api/v1/parentLocation/102')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Parent Location deleted successfully.');
          if (err) return done(err);
          done();
        });
    });
  });
});
