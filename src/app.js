import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';

const app = express();

app.use(cors());
app.use(json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(chalk.blue('Running on ' + port));
});