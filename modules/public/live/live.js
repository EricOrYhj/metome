define(function (require, exports, module) {

    var doT = require('dot');
    var server = require('../server/server');

    var msgmelistTemplate = require('./tpl/msgmelist.html');

    var msgmelist = doT.template(msgmelistTemplate);

    var $msgmelist = $(msgmelist({}));


    $('body').append($msgmelist);

    var live = {};

    module.exports = live;
});