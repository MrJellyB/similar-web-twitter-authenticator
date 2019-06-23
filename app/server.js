var express = require('express');
var http = require('http');
var dotenv = require('dotenv');
var cors = require('cors');

var authRouter = require('./routes/auth.routes').router;

dotenv.config();
var app = express();

// Basic Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/auth', authRouter);

var port = process.env.SERVICE_PORT || '8080';
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);
server.on('error', onError);

function onListening() {
    let address = server.address();

    let desc = typeof address === 'string' ? 
                'pipe ' + address : 
                'port ' + address.port;

    console.debug('listening on ' + desc);
}

function onError(error) {
    console.error(error);

    throw error;
}