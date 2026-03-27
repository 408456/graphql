# Проектирование информационных систем. Лабораторная работа GraphQL 

### Стек
```
Java 17
Spring Boot
Node.js 18+ 
Maven
Docker
PostgreSQL
MongoDB
```

### Базы данных
```
docker run -d --name postgres-users -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=graphql_userservice postgres:15
```

```
docker run -d --name postgres-products -p 5433:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=graphql_productservice postgres:15
```

```
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 mongo:7.0
```

### Микросервисы
```
cd user-service
mvn spring-boot:run
```
порт 4010
```
cd order-service
mvn spring-boot:run
```
порт 4020
```
cd product-service
mvn spring-boot:run
```
порт 4030
### GraphQL Gateway
```
cd gateway
npm install
npm start
```
порт 4000

### Frontend

```
cd frontend
npm install
npm start
```
порт 3000
