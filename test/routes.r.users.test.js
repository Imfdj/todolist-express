var users = require('../routes/r.users');
var request = require('supertest');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('user api 相关测试', function () {
    let url = "http://localhost:3333";

    it('登录', function (done) {
        let body = {
            email: '11@qq.com',
            password: '123123'
        }
        request(url)
            .post('/v1/users/login')
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if(err) return done(err);
                assert.equal(res.body.code, 0);
                done();
            });
    });
    it('登出', function (done) {
        request(url)
            .get('/v1/users/logout')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            // .end(function (err, res) {
            //     if (err) return done(err);
            // })
            .expect(200, done);
    });
    it('注册', function (done) {
        let body = {
            name: 'fdj',
            password: '123123',
            email: '11@qq.com',
        }
        request(url)
            .post('/v1/users')
            .send(body)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.code, 0);
                // assert.equal(res.body.msg, '邮箱已注册');
                done();
            });
    });


})