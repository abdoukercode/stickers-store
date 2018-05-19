const request = require('supertest');
const knex = require('../db/knex')
const expect = require('chai').expect;
const app = require('../app');

const fixtures = require('../test/fixtures')
describe('CRUD Stickers', () => {
    before((done) => {
        // run migrations
        knex.migrate.latest()
        .then(function() {
            //run seeds
          return knex.seed.run();
        })
        .then(() => done());
    });

/*     it('works ...', function(){
        console.log("yay it's working 😄")
    }) */
    it('List all Records', function(done){
        request(app)
        .get('/api/v1/stickers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).to.be.a('array');
            expect(response.body).to.deep.equal(fixtures.stickers);
            console.log(response.body);
            done();
        });
    }) 
    it('Show record by Id', function(done){
        request(app)
        .get('/api/v1/stickers/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).to.be.a('object');
            expect(response.body).to.deep.equal(fixtures.stickers[0]);
            console.log(response.body);
            done();
        });
    }) 
    it('Show record by Id', function(done){
        request(app)
        .get('/api/v1/stickers/5')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).to.be.a('object');
            expect(response.body).to.deep.equal(fixtures.stickers[4]);
            console.log(response.body);
            done();
        });
    }) 
    it('Create a record', function(done){
        request(app)
        .post('/api/v1/stickers')
        .send(fixtures.sticker)
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(200)
        .then((response)=>{
            console.log(response)
            expect(response.body).to.be.a('object');
            fixtures.sticker.id = response.body.id;
            expect(response.body).to.deep.equal(fixtures.sticker);
            done();
        });
    }) 

    it('Updates a record', (done) => {
        fixtures.sticker.rating = 22;
        request(app)
          .put('/api/v1/stickers/10')
          .send(fixtures.sticker)
          .set('Accept', 'application/json') 
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response)=>{
              //console.log(response);
   /*          expect(response.body).to.be.a('object');
            expect(response.body).to.deep.equal(fixtures.sticker); */
            done();
          }); 
      });


      it('Deletes a record', (done) => {
        request(app)
          .delete('/api/v1/stickers/10')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            //console.log(response.statusCode) 
            expect(response.body).to.be.a('object');
            expect(response.body).to.deep.equal({
              deleted: true
            });
            done();
          });
      });

});
