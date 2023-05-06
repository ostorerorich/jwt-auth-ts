# User Authentication API

This is a simple Node.js API for user authentication. It allows users to register, log in, and access a protected route using an API key.

## Installation

1. Clone the repository
2. Install dependencies: `npm install` or `pnpm install`
3. Copy the example `.env` file: `cp .env.example .env`
4. Set the environment variables in the `.env` file to your desired values.
5. Run `npm run build` then `npm run setup`

## Usage

### Register a User

Send a POST request to `/auth/register` with a JSON body containing the following properties:

```
  {
    "name": "John Doe",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "password",
    "confirmPassword": "password"
  }
```


### Login

Send a POST request to `/auth/login` with a JSON body containing the following properties:

```
  {
    "email": "johndoe@example.com",
    "password": "password"
  }
```

If the email and password are valid, the API will respond with a JSON containing the API key

```
  {
    "authorization": "JWT"
  }
```

### Access Protected Route

Send a GET request to `/auth/users` with an `Authorization` header containing the API key:


```
  Authorization: Bearer api-key
```



