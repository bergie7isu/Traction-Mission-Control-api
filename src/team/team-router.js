const express = require('express')
const TeamService = require('./team-service')

const teamRouter = express.Router()

const serializeTeam = team => ({
    name: team.name
});

teamRouter
    .route('/')
    .get((req, res, next) => {
        TeamService.getAllTeam(
            req.app.get('db')
        )
        .then(team => {
            res.json(team.map(serializeTeam))
        })
        .catch(next)
    })

module.exports = teamRouter;