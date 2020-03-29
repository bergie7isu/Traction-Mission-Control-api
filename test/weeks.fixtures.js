function makeWeeksArrayOutput() {
    return [
        {
            "endOfWeek": 6,
            "currentWeek": "2020-03-28"
        }
    ];
};

function makeWeeksArrayInput() {
    return [
        {
            "id": 1,
            "end_of_week": 6,
            "current_week": "2020-03-28"
        }
    ];
};

module.exports = { makeWeeksArrayOutput, makeWeeksArrayInput };