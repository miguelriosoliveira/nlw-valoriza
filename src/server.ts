import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';

import './database';

const { PORT } = process.env;

const app = express();

app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
