const request = require('supertest');
const server = require('../api/server.js');

describe('server', () => {
    it('should run all tests without errors', () => {
        expect(true).toBeTruthy();
    });

    // tests for register endpoints
    describe('/register', () => {
        it('should register new user, return a 201', () => {
            return request(server) 
                .post('/api/auth/register')
                .send({
                    username: 'Dan',
                    password: 'password'
                })
                .then(res => {
                    expect(res.status).toBe(201);
            });
        });

        it('returns a 500 error', () => {
            return request(server)
                .post('/api/auth/register')
                .then(res => {
                    expect(res.status).toBe(500);
            });
        });
    });

    // tests for login endpoints
    describe('/login', () => {
        it('should return a 200 OK', () => {
            return request(server)
                .post('/api/auth/login')
                .send({
                    username: 'Dev',
                    password: 'password'
                })
                .then(res => {
                    expect(res.status).toBe(200)
            });
        });

        it('should return a 401', () => {
            return request(server)
                .post('/api/auth/login')
                .send({
                    username: 'user',
                    password: 'password'
                })
                .then(res => {
                    expect(res.status).toBe(401);
            });
        });
    });
});