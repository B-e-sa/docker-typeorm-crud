import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { AppDataSource } from './data-source';
import apiRoute from './routes/apiRoute';
import createDefaultNote from './utils/createDefaultNote';

const corsOptions = {
    orgim: '/',
    optionsSuccessStatus: 200
};

const PORT = 3000;

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(apiRoute);

AppDataSource.initialize()
    .then(() => {

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })

        createDefaultNote()

    })
    .catch(e => console.error(e))