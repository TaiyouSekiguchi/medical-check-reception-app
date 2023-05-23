dev:
	docker compose -f docker-compose.yml --env-file ./config/.env.dev up -d

dev_down:
	docker compose -f docker-compose.yml --env-file ./config/.env.dev down

dev_build:
	docker compose -f docker-compose.yml --env-file ./config/.env.dev build

dev_build_no_cache:
	docker compose -f docker-compose.yml --env-file ./config/.env.dev build --no-cache

prod:
	docker compose -f docker-compose.yml --env-file ./config/.env.prod up -d

prod_down:
	docker compose -f docker-compose.yml --env-file ./config/.env.prod down

prod_build:
	docker compose -f docker-compose.yml --env-file ./config/.env.prod build

prod_build_no_cache:
	docker compose -f docker-compose.yml --env-file ./config/.env.prod build --no-cache
