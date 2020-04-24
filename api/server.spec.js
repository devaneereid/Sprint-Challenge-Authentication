const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    it('should run all tests without errors', () => {
        expect(true).toBeTruthy();
    });

    describe('GET /', () => {
        it('should return a 200 OK ', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
            });
        });

        it('should return message of api: UP', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.body.message).toBe('up');
            });
        });
    });

});