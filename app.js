// Basic Lib Import
require('dotenv').config();
const express = require('express');
// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const routes = require('./src/routes');
const {connectWithDB} = require('./src/config/mongo');
const {handleError} = require('./src/utility/errors.js');

const app = new express();

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));



// Request Rate Limit
const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 3000});
app.use(limiter);

// Mongo DB Database Connection
connectWithDB();

// Routing Implement
app.use('/api/v1', routes);
app.use('/health-check', (req, res) => res.status(200).json('Working'));
app.use(handleError);

// Undefined Route Implement
app.use('*', (req, res) => {
    res.status(404).json({status: 'fail', data: 'Not Found'});
});

module.exports = app;
