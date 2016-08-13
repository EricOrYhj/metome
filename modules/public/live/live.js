define(function (require, exports, module) {

    var doT = require('dot');
    var Server = require('../server/server');
    var Message = require('./message');

    var coverTpl = require('./tpl/cover.html');
    var msgmeTpl = require('./tpl/msgme.html');
    var msgyouTpl = require('./tpl/msgyou.html');
    var msgyoulistTpl = require('./tpl/msgyoulist.html');

    var $App = $('.App');

    var Live = {};
    var cid;

    Live.GetLiveCover = function () {
        Server.GetLiveCover('', function (data) {
            data = data.data;

            cid = data.uid;

            var cover = Message.cover(data);

            var $cover = $(doT.template(coverTpl)(cover));

            $App.prepend($cover);

            Tool.lazyload($cover);
        });
    };

    var sh;

    Live.GetLiveTimeLine = function () {
        Server.GetLiveTimeLine('', '', function (data) {
            sh = setInterval(
                function () {
                    Live.CreateMessageItem(data.data.liveElements, cid)
                }
                , 1);
        });
    };

    Live.CreateMessageItem = function (datas, cid) {
        console.log('111111');

        if (cid) {
            clearInterval(sh);

            var messages = Message.format(datas, cid);

            var lastisme = false;
            var zindex = 10000;
            var msgyoulistnum = 1;

            messages.forEach(function (item, index) {
                if (item.me) {
                    item.zindex = zindex;

                    zindex--;

                    $App.append($(doT.template(msgmeTpl)(item)));

                    lastisme = true;
                } else {

                    if (lastisme) {
                        var $msgyoulist = $(doT.template(msgyoulistTpl)(msgyoulistnum));

                        $msgyoulist.append($(doT.template(msgyouTpl)(item)));

                        $App.append($msgyoulist);

                        msgyoulistnum++;
                    }
                    else {
                        msgyoulistnum--;

                        var $msgyoulist = $('#myl_' + msgyoulistnum);

                        $msgyoulist.append($(doT.template(msgyouTpl)(item)));

                        msgyoulistnum++;
                    }

                    lastisme = false;
                }

            });

            //Tool.lazyload($AppChat);
            $(".scrollLoading").scrollLoading();
        }
    };

    //var msgmelistTemplate = require('./tpl/msgmelist.html');

    //var msgmelist = doT.template(msgmelistTemplate);

    //var $msgmelist = $(msgmelist({}));

    //$('.AppChat').append($msgmelist);

    Live.GetLiveCover();
    Live.GetLiveTimeLine();

    module.exports = Live;
});