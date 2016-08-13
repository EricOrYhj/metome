define(function (require, exports, module) {

    var msgmeTemplate = require('./tpl/msgme.html');
    var msgyouTemplate = require('./tpl/msgyoulist.html');
    var msgyoulistTemplate = require('./tpl/msgyoulist.html');

    var Handle = {};

    var lastuid = '';
    var cid = '';
    var different = true;
    var zindex = 1000;

    Handle.CreateMessageItem = function (datas,cid) {
        datas.foreach(function (index, item) {

            if (item.me) {


            
            }


        });

    }

    module.exports = Handle;
});