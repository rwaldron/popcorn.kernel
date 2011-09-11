var // Program refs
fs = require("fs"),
sys = require("sys"),
uglify = require("uglify-js"),
jshint = require("jshint").JSHINT,
print = sys.print,
util = require("util"),
cp = require("child_process"),
exec = cp.exec,
spawn = cp.spawn,
assert = require("assert"),
child;


FILES = {
	vendor: [

	],
	application: [

	],
	// server: [
	// 	"proxy/index.js"
	// ],
	unit: [

	]
};


DIR = "js/";

HINTABLES = [ "application", "server", "unit" ];

HINTS = {
	// `data: true` can be used by us to output information collected and available via jshint.data()
	application: { unused: true, unuseds: true, devel: true, undef: true, noempty: true, evil: true, forin: false, maxerr: 100 },
	server: { devel: true, noempty: true, evil: true, forin: false, maxerr: 100 },
	unit: { devel: true, evil: true, forin: false, maxerr: 100 }
};


SILENT = process.argv[ process.argv.length - 1 ] === "--silent" || false;
VERBOSE = process.argv[ process.argv.length - 1 ] === "--verbose" || false;



desc( "Hint all JavaScript program files with JSHint *" );
task( "hint", [], function( params ) {

	print( "\nHinting..." );
	!SILENT && print( "\n" );

	var files = FILES,
	hints = HINTS,
	count = 0;

	function hintFile( file, hint, set ) {

		var errors, warning, data,

		found = 0,

		src = fs.readFileSync( file, "utf8"),

		ok = {
			// warning.reason
			"Expected an identifier and instead saw 'undefined' (a reserved word).": true,
			"Use '===' to compare with 'null'.": true,
			"Use '!==' to compare with 'null'.": true,
			"Expected an assignment or function call and instead saw an expression.": true,
			"Expected a 'break' statement before 'case'.": true,
			"'e' is already defined.": true,

			// warning.raw
			"Expected an identifier and instead saw \'{a}\' (a reserved word).": true
		},

		dataProps = {
			unuseds: true,
			implieds: true,
			globals: true
		},
		props;

		jshint( src, hint );

		errors = jshint.errors;

		if ( hint.data ) {

			data = jshint.data();

			Object.keys( dataProps ).forEach(function( prop ) {
				if ( data[ prop ] ) {
					console.log( prop, data[ prop ] );
				}
			});
		}

		for ( var i = 0; i < errors.length; i++ ) {
			warning = errors[i];

			// If a warning exists for this error
			if ( warning &&
					// If the warning has evidence and the evidence is NOT a single line comment
					( warning.evidence && !/^\/\//.test( warning.evidence.trim() ) )
				) {

				//console.dir( warning );

				if ( !ok[ warning.reason ] && !ok[ warning.raw ] ) {
					found++;

					print( "\n" + file + " at L" + warning.line + " C" + warning.character + ": " + warning.reason );
					print( "\n    " + warning.evidence.trim() + "\n");

				}
			}
		}

		if ( found > 0 ) {

			print( "\n    " + set + ": \n" );
			print( "\n\n" + found + " Error(s) found in: " + file + "\n\n" );

		} else {

			!SILENT && print( "        PASS: " + file + "\n" );
		}
	}


	HINTABLES.forEach(function( set, i ) {

		var fileSet = files[ set ];

		if ( fileSet && fileSet.length ) {

			!SILENT && print( "\n    " + set + ": \n" );

			files[ set ].forEach(function( file, i ) {
				hintFile( file, hints[ set ], set );

				count++;
			});
		}

		if ( HINTABLES.length - 1 === i ) {
			print("Complete: " + count + " files hinted\n");
		}
	});
});


desc( "Run server" );
task( "run", [ ], function() {
	try {

		// Placeholder
		spawn( "node", [ "server.js" ] );


	} catch( ex ) {
		console.log( ex.toString() );
	}
});

desc( "Default set ( * Required for deployment )" );
task( "default", [ "hint" ], function( params ) {

	print( "\n" );

});
