## Description

[Netguru recruitment task](https://github.com/netguru/nodejs-recruitment-task) solution.

## Steps to recreate

```
$ git clone https://github.com/d-bend/netguru-recruitment.git
$ cd netguru-recruitment
$ docker-compose up
```

## Endpoints

1.  `POST /movies`

    1. Allows creating a movie object based on movie title passed in the request body.
    2. Get your token by sending a POST request to localhost:3000/login.
       For basic user use:

    ```
    curl --location --request POST 'localhost:3000/auth' \
    --header 'Content-Type: application/json' \
    --data-raw '{
     "username": "basic-thomas",
     "password": "sR-_pcoow-27-6PAwCD8"
    }'
    ```

    or for premium user

    ```
    curl --location --request POST 'localhost:3000/auth' \
    --header 'Content-Type: application/json' \
    --data-raw '{
     "username": "premium-jim",
     "password": "GBLtTyq3E_UNjFnpo9m6"
    }'
    ```

    3. This application recreates cache after shutdown, to clear cache manually send DELETE request:

    ```
    curl --location --request DELETE 'localhost:8080/movies' \
    --data-raw ''

    ```

    4. Cache gets wiped automatically via cronjob on first day of the month at 00:00 CET

    5. To add a movie for user send a POST request to localhost:8080/movies, movie title should be space-separated:

    ```
    curl --location --request POST 'localhost:8080/movies' \
    --header 'Authorization: Bearer [your token]' \
    --header 'Content-Type: application/json' \
    --data-raw '{
     "title": "The Godfather"
    }'
    ```

    6. This application gets the user identity from provided token

    7. Change port for /movie by changing PORT variable in docker.env

    8. In case this endpoint doesn't work, try providing new api key by changing OMDB_API_KEY variable in docker.env

    9. Extra feature! You can supply an optional argument "relevantField" to only get the info about the movie that you want! ex.:

    ```
        curl --location --request POST 'localhost:8080/movies' \
        --header 'Authorization: Bearer [your token]' \
        --header 'Content-Type: application/json' \
        --data-raw '{
        "title": "Django",
        "relevantFields": {
        "year": true,
        "rated": true,
        "genre": true,
        "actors": true,
        "ratings": true
            }
        }'
    ```

    10. Look for more options in src/movies/types/available-api-fields.interface.ts

2.  `GET /movies`

    1. Both basic and premium users have no limits on this route, simply make a request with your token:

    ```
    curl --location --request GET 'localhost:8080/movies' \
    --header 'Authorization: Bearer [your token]' \
    --data-raw ''
    ```
