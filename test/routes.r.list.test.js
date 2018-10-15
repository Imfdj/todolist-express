var users = require('../routes/r.users');
var request = require('supertest');
var expect = require('chai').expect;
var assert = require('chai').assert;

describe('list api 相关测试', function () {
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
    it('获取list', function (done) {
        request(url)
            .get('/v1/list/bydate?user_id=11&type=2&sort_type=1')
            .set('Cookie', userCookie)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                assert.equal(res.body.code, 0);
                // assert.equal(res.body.msg, '邮箱已注册');
                done();
            });
    });
    it('新增list', function (done) {
        let body = {
            title: '测试数据',
            describe: '我是描述',
            priority: 3,
            date: '2018-10-10',
            user_id: '11',
            category_id: '6',
        }
        request(url)
            .post('/v1/list')
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
    it('修改list', function (done) {
        let body = {
            id: add_id,
            title: '测试数据',
            describe: '我是修改',
            priority: 3,
            date: '2018-10-10',
            user_id: '11',
            category_id: '6',
            state: '1',
            is_deleted: '0',
        }
        request(url)
            .put('/v1/list')
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
    it('删除list', function (done) {
        let body = {
            id: add_id
        }
        request(url)
            .delete('/v1/list')
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