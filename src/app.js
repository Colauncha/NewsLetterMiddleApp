import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import logger from './middleware/logger.js';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Running 🚀' });
});

export default app;
