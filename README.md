### This app is designed for Monorepo microservice.


### Message Broker `RabbitMQ`
### Database `PostgreSQL`

### Node version `v18.18.1`

### Service
1. `history-service: ` Using Express with JavaScript and Sequelize
1. `user-service: ` Using Express with TypeScript and TypeORM
1. `manage-user: ` Using Nest and Prisma


### Start `history_service:`
1. `cd history-service`
2. `npm install`
3. `npm run dev`
4. `npm run migrate` for migrate model

### Start `user-service:`
1. `cd user-service`
2. `npm install`
3. `npm run dev`,
4. `npm run migrate` for migrate model

### Start `manage-user:` run this after start and migrate `user-service`
1. `cd manage-user`
2. `npm install`
3. `npm run start:dev`,
4. `npm run db:pull` for the pull schemas
5. `npm run db:generate` for the generate type

### For the run App.
1. Create `.env` file follow `.env.example` file
2. `sudo docker-compose up`
