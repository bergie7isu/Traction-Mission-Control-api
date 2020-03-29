const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const makeTeamArray = require('./team.fixtures');

describe('Team Endpoints', function() {
    let db;
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db);
    });
    after('disconnect from db', () => db.destroy());
    before('clean the team table', () => db.raw('TRUNCATE TABLE team CASCADE'));
    afterEach('cleanup team', () => db.raw('TRUNCATE TABLE team CASCADE'));
    
    describe('GET /api/team', () => {
        context('Given no team', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/team')
                    .expect(200, [])
            });
        });
        context('Given there is a team in the database', () => {
            const testTeam = makeTeamArray();
            beforeEach('insert team', () => {
                return db
                    .into('team')
                    .insert(testTeam)
            });
            it('responds with 200 and the team', () => {
                return supertest(app)
                    .get('/api/team')
                    .expect(200, testTeam)
            });
        });
    });
});