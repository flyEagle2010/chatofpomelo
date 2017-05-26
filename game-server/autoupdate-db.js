/* jshint node:true */
'use strict';
const loopback = require('loopback');
const boot = require('loopback-boot');
const app = module.exports = loopback();

boot(app, __dirname, function (err) {
  if (err) {
    console.error({ err }, 'loopback 启动出错');
  }
  console.log(app.dataSources);
});

var dataSourceMysql = app.dataSources.mysql;
dataSourceMysql.autoupdate(function(err){
  if (err) {
    console.log("Update model db error:", err);
    dataSourceMysql.disconnect();
    process.exit();
    return;
  }
  console.log("Update model db mysql success");
  dataSourceMysql.disconnect(function(err){
    if (err) throw err;
    process.exit();
  });
});