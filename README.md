# CarNext Assessment

<b> Disclaimer</b>
This docker setup is for development only, and is not safe to use for production.

## Installation

### Create certificates for JWT:
Create the JWT directory in the config dir: `mkdir config/jwt`

Generate in the JWT dir: `openssl genrsa -out config/jwt/private.pem -aes256 4096`

Generate in the JWT dir:  `openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem`


Run `install.sh` in the `docker` directory.
If asked to run the migrations, respond with `yes`

## Postman
In the `docs/postman` directory you find the collection and environment which you can import and start using the API.

## Environments
API: `localhost:8000/api`

Frontend: `localhost:4200`