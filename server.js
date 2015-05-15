var http = require('http'),
    browserify = require('browserify'),
    literalify = require('literalify'),
    React = require('react'),
    express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    app = express(),
    url = require('url'),
    path = require("path");

// This is our bundled React components
// Shared by server and browser thanks to browserify
// Build with 'gulp build'
MyApp = React.createFactory(require('./build/App'))

// init sessions
app.use(session({
    secret: 'no way anyone one guess this'
}));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// This takes every incoming request
app.get('/', function(req, res) {

        // Our data to be passed in to the React component for rendering
        var session = req.session;
        var props = {
            nbClick: session.count || 0,
            pollInterval: 1000
        };

        // Render the component, pass in data as props
        var myAppHtml = React.renderToString(MyApp(props));

        res.setHeader('Content-Type', 'text/html');

        res.end(
            '<html><head></head><body>' +
            // We'll pass in our server rendered HTML in the content div
            // The _same_ div will be used to render client side data 
            // This way we'll have static content ready immediately
            // and dynamic data whenever it's ready
            '<div id=content>' + myAppHtml + '</div>' +

            // Load React (and additional modules). Create with 'gulp vendor'
            '<script src=/vendor.js></script>' +
            // Fetch the browserified bundle. Create with 'gulp build'
            '<script src=/bundle.js></script>' +

            // This script renders the component in the browser, referencing it
            // from the browserified bundle, using the same props we used to render
            // server-side. We could have used a window-level variable, or even a
            // JSON-typed script tag, but this option is safe from namespacing and
            // injection issues, and doesn't require parsing
            '<script>' +
            'var MyApp = React.createFactory(require("myApp"));' +
            'React.render(MyApp(' + safeStringify(props) + '), ' +
            'document.getElementById("content"))' +
            '</script>' +
            '</body></html>'
        );
    })
    // count routine
    .get('/count', function(req, res) {
        res.end({result:count});
    })
    .post('/count', function(req, res) {
        console.log(req.body);
        var count = req.body.nbClick;
        var session = req.session;
        session.count = count;
        res.end();
    })
    // static files
    .get('/vendor.js', function(req, res) {
        res.sendFile(__dirname + '/public/' + req.path);
    })
    .get('/bundle.js', function(req, res) {
        res.sendFile(__dirname + '/public/' + req.path);
    })
    // get unhandled request (aka 404)
    .get('*', function(req, res) {
        res.status(404);
        res.end();
    })
    // The http server listens on port 3000
    .listen((process.env.PORT || 3000), function(err) {
        if (err) throw err;
        console.log('Listening on ' + (process.env.PORT || 3000) + '...');
    });



// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
    return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
