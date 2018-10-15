var category = require('../routes/r.category');
var request = require('supertest');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('category api 相关测试', function () {
    let url = "http://localhost:3333";
    let userCookie = '';
    let add_id = '';
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
                userCookie = res.headers['set-cookie'];
                done();

            });
    });
    it('获取category', function (done) {
        request(url)
            .get('/v1/category?user_id=11')
            .set('Cookie', userCookie)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                assert.equal(res.body.code, 0);
                done();
            });
    });
    it('新增category', function (done) {
        let body = {
            name: '测试类别',
            user_id: '11'
        }
        request(url)
            .post('/v1/category')
            .set('Cookie', userCookie)
            .send(body)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                assert.equal(res.body.code, 0);
                add_id = res.body.data.id;
                // assert.equal(res.body.msg, '邮箱已注册');
                done();
            });
    });
    it('修改category', function (done) {
        let body = {
            id: add_id,
            name: '修改后类别'
        }
        request(url)
            .put('/v1/category')
            .set('Cookie', userCookie)
            .send(body)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                assert.equal(res.body.code, 0);
                done();
            });
    });
    it('删除category', function (done) {
        let body = {
            id: add_id
        }
        request(url)
            .delete('/v1/category')
            .set('Cookie', userCookie)
            .send(body)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                assert.equal(res.body.code, 0);
                done();
            });
    });


})