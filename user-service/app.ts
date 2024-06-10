import express, { Express } from 'express';
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import {AppDataSource} from "./database/connection";
import indexRouter from "./routes";
import {errorHandler} from "./utils/errorHandler";

const app: Express = express();
const PORT = process.env.PORT || 3002;


app.use(express.json());

(async () => {
    try {
        await AppDataSource.initialize();

        console.log('Connection to the database has been established successfully.');
    } catch (e: any) {
        console.warn(e.message);
    }
})();


app.use('/', indexRouter)
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`User service running on http://localhost:${PORT}`);
});