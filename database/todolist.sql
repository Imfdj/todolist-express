/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1_3306
Source Server Version : 50527
Source Host           : 127.0.0.1:33066
Source Database       : todolist

Target Server Type    : MYSQL
Target Server Version : 50527
File Encoding         : 65001

Date: 2018-10-15 19:21:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', 'name1', '1');
INSERT INTO `category` VALUES ('3', 'ceshi1', '1');

-- ----------------------------
-- Table structure for `list`
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `describe` text,
  `priority` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `date` date NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0',
  `is_deleted` int(11) NOT NULL DEFAULT '0',
  `user_id` int(11) unsigned NOT NULL,
  `category_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of list
-- ----------------------------
INSERT INTO `list` VALUES ('8', '2', '2', '2', '2012-01-01', '2', '1', '2', '1');
INSERT INTO `list` VALUES ('9', 'express-session 如何设置sessionID的过期时间', 'express官方“auth”这个登陆验证的例子中，会话期间登陆一次就行了。\n但是关闭浏览器后，sessionID也会跟着消失，要怎么给这个sessionID设置过期时间呢？\n以便下次打开浏览器，浏览时，不用再次登录。\n\n主要是这个sessionID是自动生成的。（默认名是connect.sid）\n(好像是，如果sessionID不存在的话，就自动生成一个，然后才能访问相对应的res.session.*)\n在sessionID生成后，可以用req.cookies.sessionID获取,\n但是设置就不行了：\nres.cookie(\'sessionID\', req.cookies.sessionID, { maxAge: 60000 });//无效', '2', '2018-10-11', '1', '0', '11', '1');
INSERT INTO `list` VALUES ('10', '背100个单词', '', '3', '2018-10-10', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('11', 'ceshi1', '2123', '2', '2018-10-11', '0', '1', '11', '1');
INSERT INTO `list` VALUES ('12', '去爬山', '', '1', '2018-10-10', '0', '1', '11', '1');
INSERT INTO `list` VALUES ('13', '123', '', '1', '2018-10-11', '0', '1', '11', '1');
INSERT INTO `list` VALUES ('14', '12312332', '', '1', '2018-10-11', '0', '1', '11', '1');
INSERT INTO `list` VALUES ('15', '最佳实践模板 上传', '', '1', '2018-10-12', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('16', '阿斯顿和', '', '1', '2018-10-11', '0', '1', '11', '1');
INSERT INTO `list` VALUES ('17', 'mysql数据库里面date的数据取出来格式和时间都不对了  timezone:\"08:00\"', '', '1', '2018-10-12', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('18', '啊啊', '', '1', '2018-10-12', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('19', '啊啊啊啊', '', '1', '2018-10-11', '1', '0', '11', '1');
INSERT INTO `list` VALUES ('20', '买狗粮', '小红帽牌子的', '3', '2018-10-10', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('21', '明天 测试', '', '1', '2018-10-13', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('22', '高优先级', '', '3', '2018-10-18', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('23', '明天 中级', '', '2', '2018-10-11', '1', '0', '11', '1');
INSERT INTO `list` VALUES ('24', '明天中级', '', '2', '2018-10-13', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('25', '超出7天', '', '3', '2017-10-04', '0', '1', '11', '1');
INSERT INTO `list` VALUES ('26', 'woshi gaoji', '', '3', '2018-10-11', '0', '1', '11', '1');
INSERT INTO `list` VALUES ('27', '填充', '', '3', '2018-10-12', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('28', '填充', '', '1', '2018-10-12', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('29', '填充', '', '1', '2018-10-12', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('30', '填充', '', '1', '2018-10-12', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('31', '填充', '', '1', '2018-10-12', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('32', '填充', '', '1', '2018-10-12', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('33', '填充', '', '1', '2018-10-12', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('34', '填充', '', '1', '2018-10-12', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('35', '测试添加', '', '2', '2018-10-11', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('36', '胎哪家', '', '1', '2018-10-11', '0', '1', '11', '1');
INSERT INTO `list` VALUES ('37', 'fdj', '我是描述', '3', '2018-10-10', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('38', 'fdj', '我是描述', '3', '2018-10-10', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('39', '测试数据', '我是描述', '3', '2018-10-10', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('40', '测试数据', '我是描述', '3', '2018-10-10', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('41', '测试数据', '我是描述', '3', '2018-10-10', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('42', '测试数据', '我是描述', '3', '2018-10-10', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('43', '测试数据', '我是描述', '3', '2018-10-10', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('44', 'ceshi2', '2', '3', '2018-10-10', '0', '0', '11', '1');
INSERT INTO `list` VALUES ('45', '测试数据', '我是修改', '3', '2018-10-10', '1', '0', '11', '1');
INSERT INTO `list` VALUES ('46', '测试数据', '我是修改', '3', '2018-10-10', '1', '0', '11', '1');
INSERT INTO `list` VALUES ('47', '测试数据', '我是修改', '3', '2018-10-10', '1', '0', '11', '1');
INSERT INTO `list` VALUES ('48', '测试数据', '我是修改', '3', '2018-10-10', '1', '1', '11', '1');
INSERT INTO `list` VALUES ('49', '测试数据', '我是修改', '3', '2018-10-10', '1', '1', '11', '1');
INSERT INTO `list` VALUES ('50', '测试数据', '我是修改', '3', '2018-10-10', '1', '1', '11', '1');
INSERT INTO `list` VALUES ('51', '测试数据', '我是修改', '3', '2018-10-10', '1', '1', '11', '1');
INSERT INTO `list` VALUES ('52', '测试数据', '我是修改', '3', '2018-10-10', '1', '1', '11', '1');
INSERT INTO `list` VALUES ('53', '测试数据', '我是修改', '3', '2018-10-10', '1', '1', '11', '1');
INSERT INTO `list` VALUES ('54', '测试数据', '我是修改', '3', '2018-10-10', '1', '1', '11', '1');
INSERT INTO `list` VALUES ('55', '测试数据', '我是修改', '3', '2018-10-10', '1', '1', '11', '6');
INSERT INTO `list` VALUES ('56', '测试数据', '我是修改', '3', '2018-10-10', '1', '1', '11', '6');
INSERT INTO `list` VALUES ('57', '测试数据', '我是修改', '3', '2018-10-10', '1', '1', '11', '6');
INSERT INTO `list` VALUES ('58', '测试数据', '我是修改', '3', '2018-10-10', '1', '1', '11', '6');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL,
  `password` char(32) NOT NULL,
  `salt` char(3) NOT NULL,
  `email` char(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('4', 'fdj', '123', '123', '9077@qq.com');
INSERT INTO `user` VALUES ('5', 'fdj1', '1', '464', '2');
INSERT INTO `user` VALUES ('6', 'fdj1', '1', '725', '2@qq.com');
INSERT INTO `user` VALUES ('7', 'fdj1', '86b12ae393753cb3393d72f95f625571', '130', '1@qq.com');
INSERT INTO `user` VALUES ('8', 'fdj1', '14e6e73fe7897e4012969d570b63b65d', '694', '3@qq.com');
INSERT INTO `user` VALUES ('9', 'fd1', '9b56bc6e17b7435983e6969b015bc7fd', '852', '11@qq.com');
INSERT INTO `user` VALUES ('10', '121', '8fe144cdf973ffd6d477a14902440a47', '400', '123@a.com');
INSERT INTO `user` VALUES ('11', 'Imfdj', '377c05804120b67d089cbbdc8e3ad109', '032', '123@qq.com');
