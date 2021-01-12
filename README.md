# Hi, Friend App

- [Live_App](https://hifriend.vercel.app/)
- [Server_Side_Repo](https://github.com/eriyanto87/hi-friend-server)
- [Client_Side_Repo](https://github.com/eriyanto87/hi-friend-client)

## API Documentation

- [BASE_URL](https://hidden-bayou-75178.herokuapp.com/)

POST /api/user

Example request/response:

```

POST https://sleepy-harbor-21485.herokuapp.com/api/user

REQ BODY: {
    "username": "Test",
    "password": "Password123!",
    "first_name": "Test",
    "last_name": "Account"
}

Response:
[
    "username": "Test",
    "first_name": "Test",
    "last_name": "Account"
]

```

GET /api/bot

Example request/response:

```
GET https://hidden-bayou-75178.herokuapp.com/api/bot

HTTP STATUS 200 OK

[
 "evi"
]

```

POST /api/bot

Example request/response:

```

POST https://sleepy-harbor-21485.herokuapp.com/api/bot

REQ BODY: {
    "bot_name": "evi",
}

Response:
[
"Evi"
]

```

### Front-end technologies

Reactjs, HTML, CSS, JavaScript

### Back-end technologies

Node.js, Express

### Database

PostgreSQL

### Hosted on

Heroku and Vercel
