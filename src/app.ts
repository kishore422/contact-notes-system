import { startNoteProcessor } from './queues/noteProcessor';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';
import config from './config';
import { serve, setup } from './swagger';

const app: Express = express();


mongoose.connect(config.mongoUri as string)
  .then(() => {
    console.log('Connected to MongoDB');

  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
  
  mongoose.connect(config.mongoUri as string)
  .then(() => {
    console.log('Connected to MongoDB');
    
    startNoteProcessor();
  })

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test route working' });
});

app.use('/api', routes);

app.use('/api-docs', serve, setup);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use(errorHandler);

export default app;