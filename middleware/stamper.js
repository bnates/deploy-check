'use strict';

// unless it starts with (err), if the callback
// signature contains "next", it is considered middleware
module.exports = (req, res, next) => {
    req.timestamp = new Date();
    console.log('cool');
    next();
}