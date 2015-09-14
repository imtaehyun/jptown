var Hapi = require('hapi'),
    Path = require('path'),
    logger = require('./config/logger'),
    database = require('./database');

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

server.route({
    method: 'GET',
    path: '/episodes/{page?}',
    handler: function (request, reply) {
        var page = request.params.page ? request.params.page : 1;
        console.log(page);
        database.getEpisodeList(page).then(function(results) {
            console.log(results);
            reply(results);
        }).catch(function(err) {
            reply(err);
        });


    }
})

server.start(function() {
    logger.info('Server running at: ', server.info.uri);
});




