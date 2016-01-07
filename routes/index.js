'use strict';

var api = require('../controllers/api');

module.exports = function(app) {
	app.route('/api/hello').get(api.hello);
};