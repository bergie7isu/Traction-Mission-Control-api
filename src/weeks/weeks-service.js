const WeeksService = {
    getAllWeeks(knex) {
        return knex.select('*').from('weeks')
    },
    getById(knex, id) {
        return knex.from('weeks').select('*').where('id', id).first()
    },
    updateWeek(knex, id, newWeekFields) {
        return knex('weeks')
            .where({ id })
            .update(newWeekFields)
    },
};

module.exports = WeeksService;