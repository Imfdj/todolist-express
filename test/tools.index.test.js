var index = require('../tools/index');
var expect = require('chai').expect;

describe('密码“加盐” 相关测试', function () {
    it('随机盐 3位数字的字符串', function (done) {
        expect(typeof index.getRandomSalt()).to.be.equal('string');
        expect((index.getRandomSalt() + '').split('').length).to.be.equal(3);
        done();
    })
    it('32位字符串', function (done) {
        expect(typeof index.cryptPwd('123', index.getRandomSalt())).to.be.equal('string');
        expect(index.cryptPwd('123', index.getRandomSalt()).length).to.be.equal(32);
        done();
    })
})