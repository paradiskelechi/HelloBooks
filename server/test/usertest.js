
import chai from 'chai';
import should from 'should';
import supertest from 'supertest';
import app from '../app.js';
import * as testConstants from './testdata';

let expect = chai.expect();
const assert = chai.assert;
const username = testConstants.username;
const password = testConstants.password;



describe('Unit test for signin and signup routes ', () => {
    
    it('User signup test', (done)=>{
        supertest(app).post('/api/v1/users/signup')
        .set('user-token', testConstants.user_token)
        .send({
            username: username,
            email: testConstants.email,
            password: password
        })
        .end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.body.success, true);
            done();
        });
    });


    it('User signup test', (done)=>{
        supertest(app).post('/api/v1/users/signup')
        .set('user-token', testConstants.user_token)
        .send({
            email: testConstants.email,
            password: password
        })
        .end((err, res) => {
            assert.equal(res.statusCode, 400);
            assert.equal(res.body.success, false);
            assert.equal(res.body.message, 'Username is required');
            done();
        });
    });

    it('User signup test', (done)=>{
        supertest(app).post('/api/v1/users/signup')
        .set('user-token', testConstants.user_token)
        .send({
            username: username,
            password: password
        })
        .end((err, res) => {
            assert.equal(res.statusCode, 400);
            assert.equal(res.body.success, false);
            assert.equal(res.body.message, 'Email is required');
            done();
        });
    });

    it('User signup test', (done)=>{
        supertest(app).post('/api/v1/users/signup')
        .set('user-token', testConstants.user_token)
        .send({
            username: username,
            email: username,
            password: password
        })
        .end((err, res) => {
            assert.equal(res.statusCode, 400);
            assert.equal(res.body.success, false);
            assert.equal(res.body.message, 'Enter a valid email address');
            done();
        });
    });


    it('User signin test', (done)=>{
        supertest(app).post('/api/v1/users/signin')
        .set('user-token', testConstants.user_token)
        .send({
            username: username,
            password: password
        })
        .end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.body.success, true);
            done();
        });
    });

    it('Users get list test', (done)=>{
        supertest(app).get('/api/v1/users')
        .set('user-token', testConstants.user_token)
        .send()
        .end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.body.success, true);
            done();
        });
    });

});
