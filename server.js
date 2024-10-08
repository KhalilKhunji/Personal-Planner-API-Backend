
require('dotenv').config();
const express = require('express');
require('./config/database.js');
const morgan = require('morgan');
const cors = require('cors');

// Controllers
const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const profilesRouter = require('./controllers/profiles');
const tasksRouter = require('./controllers/taskRoute.js');
const notesRouter = require('./controllers/noteRoute.js');
const itemsRouter = require('./controllers/itemRoute.js');

// Middleware
const verifyToken = require('./middleware/verify-token');
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


// Routes
app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);
app.use('/profiles', verifyToken, profilesRouter);
app.use('/tasks', verifyToken, tasksRouter, itemsRouter, notesRouter);

app.listen(port, () => {
  console.log('The express app is ready!');
});