const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeMetricsArray, makeMetricsArrayOutput, makeMaliciousMetric } = require('./metrics.fixtures');

describe('Metrics Endpoints', function() {
    let db;
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        });
        app.set('db', db);
    });
    after('disconnect from db', () => db.destroy());
    before('clean the metrics table', () => db.raw('TRUNCATE TABLE metrics CASCADE'));
    afterEach('cleanup metrics', () => db.raw('TRUNCATE TABLE metrics CASCADE'));
    
    describe('GET /api/metrics', () => {
        context('Given no metrics', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/metrics')
                    .expect(200, [])
            });
        });
        context('Given there are metrics in the database', () => {
            const testMetrics = makeMetricsArray();
            const testMetricsOutput = makeMetricsArrayOutput();
            beforeEach('insert metrics', () => {
                return db
                    .into('metrics')
                    .insert(testMetrics)
            });
            it('responds with 200 and all of the metrics', () => {
                return supertest(app)
                    .get('/api/metrics')
                    .expect(200, testMetricsOutput)
            });
        });
        context('Given an XSS attack issue', () => {
            const { maliciousMetric, expectedMetric } = makeMaliciousMetric();
            beforeEach('insert the malicious metric', () => {
                return db
                    .into('metrics')
                    .insert([maliciousMetric])
            })
            it('removes XSS attack content', () => {
                return supertest(app)
                    .get('/api/metrics')
                    .expect(200)
                    .expect(res => {
                        expect(res.body[0].metric_name).to.eql(expectedMetric.metric_name)
                    })
            });
        });
    });
});