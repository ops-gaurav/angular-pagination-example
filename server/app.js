var express = require ('express');
var app = express ();
var bodyParser = require ('body-parser');
var path = require ('path');

// self defined routes
/**
 * @description user defined routes
 */
var user = require ('./routes/user-router');

app.use (bodyParser.json());
app.use (express.static (path.join (__dirname, '../public')));
app.use (express.static (path.join (__dirname, '../bower_components')));

app.get ('/', (req, res) => {
    res.sendFile ('index.html');
})
app.use ('/user', user);

app.listen (3000, () => {
    console.log ('server running on port 3000');
});