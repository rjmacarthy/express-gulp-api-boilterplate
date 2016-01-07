'use strict';

var config = require('../config/config').config;

exports.index = function(req, res) {
    res.render('index', {title : config.title });
};
