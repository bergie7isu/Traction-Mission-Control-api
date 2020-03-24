const express = require('express')
const WeeksService = require('./weeks-service')

const weeksRouter = express.Router()
const jsonParser = express.json()

const serializeWeek = week => ({
    id: week.id,
    endOfWeek: week.end_of_week,
    currentWeek: week.current_week
});

weeksRouter
    .route('/')
    .get((req, res, next) => {
        WeeksService.getAllWeeks(
            req.app.get('db')
        )
        .then(weeks => {
            res.json(weeks.map(serializeWeek))
        })
        .catch(next)
    })

weeksRouter
    .route('/:week_id')
    .all((req, res, next) => {
        WeeksService.getById(
            req.app.get('db'),
            req.params.week_id
        )
        .then(week => {
            if (!week) {
                return res.status(404).json({
                    error: { message: `Week doesn't exist!` }
                })
            }
            res.week = week
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializeWeek(res.week))
    })
    .patch(jsonParser, (req, res, next) => {
        const { end_of_week, current_week } = req.body
        const weekToUpdate = { end_of_week, current_week };
        const numberOfValues = Object.values(weekToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain either "endOfWeek" or "currentWeek"!`
                }
            })
        }
        WeeksService.updateWeek(
            req.app.get('db'),
            req.params.week_id,
            weekToUpdate
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

module.exports = weeksRouter;