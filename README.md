## Description

proyecto NestJS test  

proyecto basado en NestJS

este proyecto cuenta con las siguientes caracteristicas:

1. Servicio 'accounts'

● Crear cuenta (POST /accounts) 
● Consultar cuenta (GET /accounts/:id) 
● Listar cuentas (GET /accounts) 
● Saldo disponible

2. Servicio 'transaction'

● Depósito (POST /transactions/deposit) 
● Retiro (POST /transactions/withdraw) 
● Transferencia (POST /transactions/transfer) 
● Listar transacciones de una cuenta (GET /transactions/:accountId) 

3. Cuenta con validaciones usando class-validator
4. Cuenta con manejo de errores y excepciones
5. Cuenta con Documentacion swagger.
6. Dockerfiles + Docker compose
7. Postgres como base de datos.
8. Cuenta con tests.
9. Cuenta con un simple middleware para logging.

## Project setup

usando docker compose
```bash
$ docker compose build
$ docker compose up
```
sin docker compose

1. habilita tu db postgres
2. usar .env-example como .env
3. instala dependencias: npm i 
4. levante primer servicio:  npm run start:dev account-app
4. levante segundo servicio:  npm run start:dev transaction-app


## Run tests

```bash
# unit tests
$ npm run test
```

## Documentation (swagger)

localhost:port/api



