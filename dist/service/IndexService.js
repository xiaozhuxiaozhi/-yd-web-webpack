"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @fileOverview 实现Index数据模型
 * @author zhuziwei
 */
/**
 * IndexModel类 生成异步数据
 * @class
 */
let IndexService = class IndexService {
  /**
   * @constructor
   * @param  {string} app koa2上下文
   */
  constructor(app) {}
  /**
   *获取具体数据API接口
   *@returns {Promise} 返回异步数据
   *@example
   *return new Promise
   *getData()
   */
  getData() {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve("IndexAction异步数据");
      }, 1000);
    });
  }
};
exports.default = IndexService;