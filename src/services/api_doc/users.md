### localhost:7001/login
```
request
    Headers:
        {
            Content-Type: application/x-www-form-urlencoded,
            ...
        }
    Body:
        {
            username: admin,
            password: admin
        }

response
{
    "code": 0,
    "msg": "",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU4MTQxOTg5NywiZXhwIjoxNTgxNTA2Mjk3fQ.h6xyDbD3WHiM0pbkR1j-RSgpcSD0q7t7bY7FjWssuNE"
    }
}

```