import express, { Express, Request, Response } from 'express';
const app: Express = express();
const Router = require('./router/router');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoDb = require('./db/mongo');
require('dotenv').config();
const { PORT = 4001, NODE_ENV = 'development' } = process.env;
const IN_PROD = NODE_ENV === 'production';
const corsOptions = {
  origin: ['http://localhost:4001/', 'http://localhost:3000/'],
  credentials: true
};

// Start MongoDB
async function start() {
  const mongo = await mongoDb.connect();
  app.locals.mongo = mongo;
};
start();

// Add middleware for handling CORS requests
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// Serve server's index.html file
/*app.get('/', (req, res, next) => { 
  res.sendFile('index.html', { root: __dirname });
});*/

// Serve static content in production
if (IN_PROD) {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.set('trust proxy', true);
};

// Add middware for parsing request bodies
app.use(bodyParser.json());

// Logging
app.use(morgan('dev'));

app.use(cookieParser());

// Use apiRouter
app.use(Router);

/*app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});*/

// Add code to start the server listening
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});

module.exports = app;