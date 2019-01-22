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

  describe('Update Sub Location: ', () => {
    it('displays success message after updating a sub location successfully', (done) => {
      server
        .put('/api/v1/location/102')
        .set('Content-Type', 'application/json')
        .type('form')
        .send({ maleResidents: 80 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Location details updated successfully.');
          expect(res.body.data.maleResidents).to.equal(80);
          if (err) return done(err);
          done();
        });
      });

      it('displays an error message if user does not input any value to update', (done) => {
        server
          .put('/api/v1/location/102')
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
});

