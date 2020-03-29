const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeWeeksArrayOutput, makeWeeksArrayInput }  = require('./weeks.fixtures');

describe('Weeks Endpoints', function() {
    let db;
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db);
    });
    after('disconnect from db', () => db.destroy());
    before('clean the weeks table', () => db.raw('TRUNCATE TABLE weeks CASCADE'));
    afterEach('cleanup weeks', () => db.raw('TRUNCATE TABLE weeks CASCADE'));
    
    describe('GET /api/weeks', () => {
        context('Given no weeks', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/weeks')
                    .expect(200, [])
            });
        });
        context('Given there is a week in the database', () => {
            const testWeeksInput = makeWeeksArrayInput();
            const testWeeksOutput = makeWeeksArrayOutput();
            beforeEach('insert weeks', () => {
                return db
                    .into('weeks')
                    .insert(testWeeksInput)
            });
            it('responds with 200 and all of the weeks', () => {
                return supertest(app)
                    .get('/api/weeks')
                    .expect(200, testWeeksOutput)
            });
        });
    });
    describe('PATCH /api/weeks/:id', () => {
        context('Given no weeks', () => {
            it('responds with 404', () => {
                const weekId = 1;
                return supertest(app)
                    .patch(`/api/weeks/${weekId}`)
                    .expect(404, { error: { message: `Week doesn't exist!` } })
            });
        });
    });
});