const TeamService = {
    getAllTeam(knex) {
        return knex.select('*').from('team')
    },
};

module.exports = TeamService;