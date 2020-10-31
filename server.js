#!/usr/bin/env node
const fs = require('fs');
const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const https = require('https');
const app = require('./index');
const config = require('./config');

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(config.port, function (error) {
    if (error) {
        process.exit(10);
    }
    console.log('express is listening on port: ' + config.port);
});