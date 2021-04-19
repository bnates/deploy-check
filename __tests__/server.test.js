'use strict';

const { TestScheduler } = require('@jest/core');
const supertest = require('supertest');
const server = require('../server.js');
const request = supertest(server.app); // supertest takes in our server application, which includes our routes and mw and error handling

// test suite
describe('SERVER TESTS:', () => {

    // "it" is an individual test
    it('should handle not found routes - 404', async () => {
        // expect -> this is an assertion, as part of a test
        var response = await request.get('/not-there');
        expect(response.status).toEqual(404);

        // test the output of your routes
        // test the shape of your data
        // test the status code of your response
    });

    // and another test
    it('should send a proper response', async () => {
        var response = await request.get('/data');
        expect(response.status).toEqual(200);
        expect(response.body.time).toBeDefined();
    });
});