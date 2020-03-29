function makeMetricsArray() {
    return [
        {
            "id": 1,
            "sort": 1,
            "status": "active",
            "who": 'Mark Bergstrom',
            "metric_name": "name1",
            "metric_type": "<",
            "metric_format": "number",
            "decimals": 2,
            "created": "2020-02-02",
            "archived": null,
            "data": '[{"date": "2019-12-21", "plan": 10, "result": 11}, {"date": "2019-12-28", "plan": 20, "result": 21}, {"date": "2020-01-04", "plan": 30, "result": 31}]'
        },
        {
            "id": 2,
            "sort": 2,
            "status": "active",
            "who": 'Mark Bergstrom',
            "metric_name": "name2",
            "metric_type": "<",
            "metric_format": "number",
            "decimals": 2,
            "created": "2020-02-03",
            "archived": null,
            "data": '[{"date": "2019-12-21", "plan": 10, "result": 11}, {"date": "2019-12-28", "plan": 20, "result": 21}, {"date": "2020-01-04", "plan": 30, "result": 31}]'
        }
    ];
};

function makeMetricsArrayOutput() {
    return [
        {
            "id": 1,
            "sort": 1,
            "status": "active",
            "who": 'Mark Bergstrom',
            "metric_name": "name1",
            "metric_type": "<",
            "metric_format": "number",
            "decimals": 2,
            "created": "2020-02-02",
            "archived": null,
            "data": [{"date": "2019-12-21", "plan": 10, "result": 11}, {"date": "2019-12-28", "plan": 20, "result": 21}, {"date": "2020-01-04", "plan": 30, "result": 31}]
        },
        {
            "id": 2,
            "sort": 2,
            "status": "active",
            "who": 'Mark Bergstrom',
            "metric_name": "name2",
            "metric_type": "<",
            "metric_format": "number",
            "decimals": 2,
            "created": "2020-02-03",
            "archived": null,
            "data": [{"date": "2019-12-21", "plan": 10, "result": 11}, {"date": "2019-12-28", "plan": 20, "result": 21}, {"date": "2020-01-04", "plan": 30, "result": 31}]
        }
    ];
};

function makeMaliciousMetric() {
    const maliciousMetric = {
        "id": 1,
        "sort": 1,
        "status": "active",
        "who": 'Mark Bergstrom',
        "metric_name": 'Naughty naughty very naughty <script>alert("xss");</script>',
        "metric_type": "<",
        "metric_format": "number",
        "decimals": 2,
        "created": "2020-02-02",
        "archived": null,
        "data": '[{"date": "2019-12-21", "plan": 10, "result": 11}, {"date": "2019-12-28", "plan": 20, "result": 21}, {"date": "2020-01-04", "plan": 30, "result": 31}]'

    };
    const expectedMetric = {
        ...maliciousMetric,
        "metric_name": 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        "data": [{"date": "2019-12-21", "plan": 10, "result": 11}, {"date": "2019-12-28", "plan": 20, "result": 21}, {"date": "2020-01-04", "plan": 30, "result": 31}]
    };
    return {
        maliciousMetric,
        expectedMetric
    };
};

module.exports = { makeMetricsArray, makeMetricsArrayOutput, makeMaliciousMetric };