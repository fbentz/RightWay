'use-strict';
const 
    fs = require('fs')
    net = require('net'),

    filename = process.argv[2],

    server = net.createServer(function(connection) {
        //reporting
        console.log('Subscriber connected');
        connection.write(JSON.stringify({
            type:'watching',
            file:filename
        }) + '\n');

        var watcher = fs.watch(filename, function() {
            connection.write(JSON.stringify({
                type:'changed',
                file: filename,
                timestamp: Date.now()
            }) + '\n');
        });

        connection.on('close', function() {
            console.log('Subsciber disconnected.');
            watcher.close();
        });
    });

    if (!filename) {
        throw Error('No target filename is specified');
    }

    server.listen(1980, function() {
        console.log('Listening for subscriber');
    });