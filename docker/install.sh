#!/usr/bin/env bash

docker-compose run --rm php composer install
docker-compose run --rm php bin/console doctrine:migrations:migrate

docker-compose run --rm angular npm install
