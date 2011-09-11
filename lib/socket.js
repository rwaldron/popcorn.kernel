var io = require( "socket.io" ),
express = require( "express" ),
app = express.createServer(),
io = io.listen(app);


app.listen(80);

io.sockets.on( "connection", function( socket ) {

	// Send server update to client
	socket.emit( "server:update", {

		type: "session",

		data: {

			/* .. session obejct */

		}

	});

	// Stub client requests
	socket.on( "client:request", function( data ) {

		console.log( data );

	});

});