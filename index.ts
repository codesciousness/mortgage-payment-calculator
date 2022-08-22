import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import morgan from 'morgan';
import Router from './router/router';
import mongoDb from './db/mongo';
import rateLimit from 'express-rate-limit';
import MongoStore from 'rate-limit-mongo';
import 'dotenv/config';

const app: Express = express();
const { PORT = 4001, NODE_ENV = 'development' } = process.env;
const IN_PROD = NODE_ENV === 'production';
const corsOptions = {
  origin: IN_PROD ? ['https://mortgage-payment-calculator.herokuapp.com/'] : 
  ['http://localhost:4001/', 'http://localhost:3000/'],
  credentials: true
};

// Start MongoDB
async function start() {
  await mongoDb.connect();
};
start();

//Add middleware for rate limiting requests
const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per window (per 15 minutes)
	standardHeaders: true, // Return rate limit info in the "RateLimit-*" headers
	store: new MongoStore({
    uri: process.env.MONGODB_URI,
    expireTimeMs: 15 * 60 * 1000, // should match windowMs
    errorHandler: console.error.bind(null, 'rate-limit-mongo')
  })
});

app.use(rateLimiter);

// Add middleware for handling CORS requests
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// Serve static content in production
if (IN_PROD) {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.set('trust proxy', true);
};

// Add middware for parsing request bodies
app.use(bodyParser.json());

// Logging
app.use(morgan('dev'));

app.use(cookieParser());

// Use apiRouter
app.use(Router);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Add code to start the server listening
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});

export default app;