DC = docker compose

ENV_FILE = --env-file
DEV_ENV = ./config/.env.dev
PROD_ENV = ./config/.env.prod

NO_CACHE = --no-cache

dev_build:
	$(DC) $(ENV_FILE) ${DEV_ENV} build

dev_up:
	$(DC) $(ENV_FILE) ${DEV_ENV} up -d

dev_down:
	$(DC) $(ENV_FILE) ${DEV_ENV} down

dev_build_no_cache:
	$(DC) $(ENV_FILE) ${DEV_ENV} build $(NO_CACHE)


prod_build:
	$(DC) $(ENV_FILE) ${PROD_ENV} build

prod_up:
	$(DC) $(ENV_FILE) ${PROD_ENV} up -d

prod_down:
	$(DC) $(ENV_FILE) ${PROD_ENV} down

prod_build_no_cache:
	$(DC) $(ENV_FILE) ${PROD_ENV} build $(NO_CACHE)

prod_log_frontend:
	$(DC) $(ENV_FILE) ${PROD_ENV} logs -f frontend

prod_log_backend:
	$(DC) $(ENV_FILE) ${PROD_ENV} logs -f backend

prod_log_postgres:
	$(DC) $(ENV_FILE) ${PROD_ENV} logs -f postgres

prod_dive_frontend:
	$(DC) $(ENV_FILE) ${PROD_ENV} exec frontend /bin/bash

prod_dive_backend:
	$(DC) $(ENV_FILE) ${PROD_ENV} exec backend /bin/ash

prod_dive_postgres:
	$(DC) $(ENV_FILE) ${PROD_ENV} exec postgres /bin/bash
