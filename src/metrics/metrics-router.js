const path = require('path')
const express = require('express')
//const xss = require('xss')
const MetricsService = require('./metrics-service')

const metricsRouter = express.Router()
const jsonParser = express.json()

const serializeMetric = metric => ({
    id: metric.id,
    sort: metric.sort,
    status: metric.status,
    who: metric.who,
    metric_name: metric.metric_name,
    metric_type: metric.metric_type,
    metric_format: metric.metric_format,
    decimals: metric.decimals,
    created: metric.created,
    archived: metric.archived,
    data: metric.data
});

metricsRouter
    .route('/')
    .get((req, res, next) => {
        MetricsService.getAllMetrics(
            req.app.get('db')
        )
        .then(metrics => {
            res.json(metrics.map(serializeMetric))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { sort, status, who, metric_name, metric_type, metric_format, decimals, created, archived, data } = req.body
        const newMetric = { sort, status, who, metric_name, metric_type, metric_format, decimals, created };
        for (const [key, value] of Object.entries(newMetric)) {
            if (value == null) {
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
                })
            }
        }
        newMetric.archived = archived;
        newMetric.data = data;
        MetricsService.insertMetric(
            req.app.get('db'),
            newMetric
        )
        .then(metric => {
            res
            .status(201)
            .location(path.posix.join(req.originalUrl + `/${metric.id}`))
            .json(serializeMetric(metric))
        })
        .catch(next)
    })

metricsRouter
    .route('/:metric_id')
    .all((req, res, next) => {
        MetricsService.getById(
            req.app.get('db'),
            req.params.metric_id
        )
        .then(metric => {
            if (!metric) {
                return res.status(404).json({
                    error: { message: `Metric doesn't exist!` }
                })
            }
            res.metric = metric
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeMetric(res.metric))
    })
    .delete((req, res, next) => {
        MetricsService.deleteMetric(
            req.app.get('db'),
            req.params.metric_id
        )
        .then(() => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { sort, status, who, metric_name, metric_type, metric_format, decimals, created, archived, data } = req.body
        const metricToUpdate = { sort, status, who, metric_name, metric_type, metric_format, decimals, archived, data }
        const numberOfValues = Object.values(metricToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain either "sort", "status", "who", "metric_name", "metric_type", "metric_format", "decimals", "archived", or "data"!`
                }
            })
        }
        metricToUpdate.created = created;
        MetricsService.updateMetric(
            req.app.get('db'),
            req.params.metric_id,
            metricToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = metricsRouter;