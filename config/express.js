'use strict';
/// <reference path='../typings/tsd.d.ts' />

var bodyParser = require('body-parser'),
    config = require('./config').config,
    cookieParser = require('cookie-parser'),
    express = require('express'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    _ = require('lodash'),
    path = require('path');

module.exports = function() {
    var app = express();

    //Models
    _.forEach(config.globFiles(config.models), function(route) {
        require(path.resolve(route))(app);
    });

    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));

    //Routes
    _.forEach(config.globFiles(config.routes), function(route) {
        require(path.resolve('./' + route))(app); 
    });

    // catch 404 and forward to error handler
    app.use(function(err, req, res, next) {
        var err = new Error('Not Found');
        next(err);
    });

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // Connect to mongodb
    mongoose.connect(config.db);

    return app;
};
