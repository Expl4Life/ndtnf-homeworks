import "reflect-metadata";
const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const loggerMiddleware = require('./middleware/logger');
const errorMiddleware = require('./middleware/error');
const sessionMiddleware = require('./middleware/session');
const booksApiRouter = require('./routes/api/books');
const { buildUrl } = require('./utils');

const PORT = process.env.PORT || 3000;

const UserAtlasDB = process.env.DB_ATLAS_USERNAME || 'witcher';
const PasswordAtlasDB = process.env.DB_ATLAS_PASSWORD || '12345';
const NameAtlasDB = 'app_database';

const APP_URL = '/api';
const SERVICES_URLS = {
    Books: '/books',
}

const BOOKS_API_URL = buildUrl(APP_URL, SERVICES_URLS.Books);

const app = express();
const server = http.Server(app);

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(sessionMiddleware());
app.set("view engine", "ejs");
app.use(cors());
app.use(loggerMiddleware);


app.use('/public', express.static(__dirname+"/public"));

app.use(BOOKS_API_URL, booksApiRouter);

app.use(errorMiddleware);

async function start() {
    try {
        console.log(`mongodb+srv://${UserAtlasDB}:${PasswordAtlasDB}@cluster0.ctq8h.mongodb.net/${NameAtlasDB}?retryWrites=true&w=majority`);
        const UrlDB = `mongodb+srv://${UserAtlasDB}:${PasswordAtlasDB}@cluster0.ctq8h.mongodb.net/${NameAtlasDB}?retryWrites=true&w=majority`;
        await mongoose.connect(UrlDB);
        
        server.listen(PORT, '0.0.0.0', () => {
            console.log(`Express app is listening at http://localhost:${PORT}`)
        });
    } catch (e) {
        console.log(e);
    }
}

start();