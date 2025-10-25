import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/users.js';

import pool from './data/db.js';
import logger from './logger/logger.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

pool.query(
  'CREATE TABLE IF NOT EXISTS users (id UUID PRIMARY KEY, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)',
  (err) => {
    if (err) {
      console.error('Error creating the users table', err.stack);
    } else {
      console.log('USERS table created');
    }
  }
);

app.use(express.json());

app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
