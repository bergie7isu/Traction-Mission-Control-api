# Traction Mission Control
Drive accountability.
Get more done.
Grow your business!

## Live App:
https://traction-mission-control-app.now.sh/

## Summary:
The Traction Mission Control App is your go-to tool for driving accountability, follow-through, and consistent communication in your organization running on the EOS Platform.

## API Documentation:

#### Todo Object Example
```javascript
{
    "id": 1,
    "todo": "First to-do",
    "who": "John Doe",
    "created": "2020-02-11",
    "due": "2020-02-18",
    "status": "Not Done",
    "status_date": "2020-02-18",
    "reviewed": "yes",
    "issue": 2
}
```

#### Issue Object Example
```javascript
{
    "id": 3,
    "issue": "Third issue",
    "who": "Jane Doe",
    "created": "2020-02-11",
    "status": "Solved",
    "status_date": "2020-02-18",
    "reviewed": "no"
},
```

#### Metric Object Example
```javascript
{
    "id": 3,
    "sort": 2,
    "status": "active",
    "who": "Charlie T. Jameson",
    "metric_name": "Third metric",
    "metric_type": ">",
    "metric_format": "number"
    "created": "2020-02-11",
    "archived": "2020-02-11",
    "data": [
        {
            "date": '2020-02-11',
            "plan": 10,
            "result": 11
        },
        {
            "date": '2020-02-18',
            "plan": 20,
            "result": 19
        },
        {
            "date": '2020-02-25',
            "plan": 30,
            "result": 31
        },
        {
            "date": '2020-03-03',
            "plan": 40,
            "result": 40
        }
    ]
},
```

#### `/api/todos`

##### Methods:
`GET` - returns a list of all todos\
`POST` - adds a new todo

##### Required Parameters:
`GET` - none\
`POST` - todo, who, created, due, reviewed

#### `/api/todos/:id`

##### Methods:
`GET` - returns a specific todo\
`DELETE` - removes a specific todo\
`PATCH` - updates a specific todo

##### Required Parameters:
`GET` - id\
`DELETE` - id\
`PATCH` - one of: todo, who, due, issue

#### `/api/issues`

##### Methods:
`GET` - returns a list of all issues\
`POST` - adds a new issue

##### Required Parameters:
`GET` - none\
`POST` - issue, who, created, reviewed

#### `/api/issues/:id`

##### Methods:
`GET` - returns a specific issue\
`DELETE` - removes a specific issue\
`PATCH` - updates a specific issue

##### Required Parameters:
`GET` - id\
`DELETE` - id\
`PATCH` - one of: issue, who

#### `/api/metrics`

##### Methods:
`GET` - returns a list of all metrics\
`POST` - adds a new metric

##### Required Parameters:
`GET` - none\
`POST` - sort, status, who, metric_name, metric_type, metric_format, decimals, created

#### `/api/metrics/:id`

##### Methods:
`GET` - returns a specific metric\
`PATCH` - updates a specific metric

##### Required Parameters:
`GET` - id\
`PATCH` - one of: sort, status, who, metric_name, metric_type, metric_format, decimals, archived, data