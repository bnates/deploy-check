'use strict';

const express = require('express'); // we npm i'd express - > now it's avail -> now we require it to use in our app
const app = express();

const stamper = require('./middleware/stamper.js');
const notFoundHandler = require('./handlers/404.js');
const errors = require('./handlers/500.js');

app.get('/test-route', (req, res) => {
    res.json({ msg: 'this worked' }); // express gives us the ability to quickly send a JSON response
});

// route level mw - happens "in the middle" of the process
app.get('/data', stamper, (req, res) => {
    let output = { time: req.timestamp };
    res.json(output);
});

app.get('/purposeful-error', (req, res, next) => {
    next('some words'); // when you pass "next" anything, you are now "nexting" this to your error handling mw
});

// app.use is a global mw function
// all incoming req will pipe through this
app.use('*', notFoundHandler);
app.use(errors);

function start(port) {
    app.listen(port, () => {
        console.log(`server up on ${port}`);
    });
}

module.exports = {
    app: app,
    start: start
}