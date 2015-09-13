var Hapi = require('hapi'),
    Path = require('path'),
    logger = require('./config/logger');

var server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});

server.connection({ port: process.env.PORT || 3000 });

server.register(require('inert'), function() {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

server.start(function() {
    logger.info('Server running at: ', server.info.uri);
});




