var glob = require('glob'),
    _ = require('lodash');

exports.config = {
    port: 3000,
    routes: 'routes/**/*.js',
    models: 'models/**/*.js',
    db: 'mongodb://localhost/express-api',
    globFiles: function(location) {
        var files = glob.sync(location);
        var output = [];
        output = _.union(output, files);
        return output;
    }
}
