import "reflect-metadata";
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import loggerMiddleware from './middleware/logger';
import errorMiddleware from './middleware/error';
import booksApiRouter from './routes/api/books';
import { buildUrl } from './utils';

const PORT: number | string = process.env.PORT || 3000;

const UserAtlasDB: string = process.env.DB_ATLAS_USERNAME || 'witcher';
const PasswordAtlasDB: string = process.env.DB_ATLAS_PASSWORD || '12345';
const NameAtlasDB: string = 'app_database';

const APP_URL: string = '/api';
const SERVICES_URLS = {
    Books: '/books',
}

const BOOKS_API_URL: string = buildUrl(APP_URL, SERVICES_URLS.Books);

const app: Express = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(cors());
app.use(loggerMiddleware);


app.use('/public', express.static(__dirname+"/public"));

app.use(BOOKS_API_URL, booksApiRouter);

app.use(errorMiddleware);

async function start() {
    try {
        const UrlDB: string = `mongodb+srv://${UserAtlasDB}:${PasswordAtlasDB}@cluster0.ctq8h.mongodb.net/${NameAtlasDB}?retryWrites=true&w=majority`;
        console.log('%cindex.ts line:44 UrlDB', 'color: #007acc;', UrlDB);
        await mongoose.connect(UrlDB);
        
        app.listen(Number(PORT), '0.0.0.0', () => {
            console.log(`Express app is listening at http://localhost:${PORT}`)
        });
    } catch (e) {
        console.log(e);
    }
}

start();