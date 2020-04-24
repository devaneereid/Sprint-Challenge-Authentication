const request = require('supertest');
const server = require('../api/server.js');

describe('server', () => {
    describe('/api/jokes', () => {
        it('should return all jokes', () => {
            return request(server)
                .post('/api/auth/login')
                .send({
                    username: 'Dev',
                    password: 'password'
                })
                .then(res => {
                    const token = res.body.token
                    return request(server)
                        .get('/api/jokes')
                        .set('Authorization', token)
                        .then(res => {
                            expect(res.status).toBe(200)
                    });
            });
        });

        it('should return a JSON Object', async () => {
            const response = await request(server).get('/')
                expect(response.type).toEqual('application/json')
        });
    });

});