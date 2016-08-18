define(function (require, exports, module) {

    var doT = require('dot');
    var Tool = require('../common/tool');
    var Server = require('../server/server');
    var Message = require('./message');

    var coverTpl = require('./tpl/cover.html');
    var msgmeTpl = require('./tpl/msgme.html');
    var msgmeatTpl = require('./tpl/msgmeat.html');
    var msgyouTpl = require('./tpl/msgyou.html');
    var msgmelistTpl = require('./tpl/msgmelist.html');
    var msgyoulistTpl = require('./tpl/msgyoulist.html');

    var $container = $('.container');

    var appWidth = $container.width() - 2;

    var Live = {};

    Live.options = {
        topicId: '',//直播id
        cid: '',//直播者
        loading: false,//是否在进行分页加载
        sinceId: 0,//分页页数
        lastisme: false,//上一条是不是直播者
        lastisyou: false,
        zindex: 10000,//直播者dom层级开始
        msgmelistnum: 1,
        msgyoulistnum: 1,//其他回复的dom id
        videoId: 0//vodio的序号
    };

    Live.GetLiveCover = function () {
        Server.GetLiveCover(Live.options.topicId, function (data) {
            data = data.data;

            Live.options.cid = data.uid;

            var cover = Message.cover(data);

            var $cover = $(doT.template(coverTpl)(cover));

            $container.prepend($cover);

            Tool.lazyload($cover);
        });
    };

    var sh;
    Live.GetLiveTimeLine = function () {
        Server.GetLiveTimeLine(Live.options.topicId, Live.options.sinceId, function (data) {
            sh = setInterval(
                function () {
                    Live.CreateMessageItem(data.data.liveElements)
                }, 1);
        });
    };

    Live.CreateMessageItem = function (datas) {
        if (Live.options.cid) {
            clearInterval(sh);

            var messages = Message.format(datas, Live.options.cid);

            messages.forEach(function (item, index) {
                if (item.type === 5) {
                    item.width = appWidth;

                    Live.options.videoId++;

                    item.videoid = Live.options.videoId;
                }

                if (item.me && !item.cidat) {
                    item.zindex = Live.options.zindex;
                    Live.options.zindex--;

                    if (!Live.options.lastisme) {
                        var $msgmelist = $(doT.template(msgmelistTpl)(Live.options.msgmelistnum));

                        $msgmelist.append($(doT.template(msgmeTpl)(item)));

                        $container.append($msgmelist);

                        Live.options.msgmelistnum++;
                    }
                    else {
                        Live.options.msgmelistnum--;

                        var $msgmelist = $('#mml_' + Live.options.msgmelistnum);

                        $msgmelist.append($(doT.template(msgmeTpl)(item)));

                        Live.options.msgmelistnum++;
                    }

                    Live.options.lastisme = true;
                    Live.options.lastisyou = false;

                    if (item.type === 5) {
                        require.async(['video', 'videocss'], function () {
                            setTimeout(function () {
                                var player = videojs('video_' + Live.options.videoId, { /* Options */ }, function () {
                                    console.log('video_' + Live.options.videoId + 'Good to go!');

                                    $(this).find('.vjs-big-play-button').on('click', function () {
                                        this.play();
                                    })

                                    this.on('ended', function () {
                                        console.log('awww...over so soon?');
                                    });
                                });
                            }, 0);
                        });
                    }

                } else {
                    var $msgyouTpl;

                    if (item.cidat) {
                        $msgyouTpl = $(doT.template(msgmeatTpl)(item));
                    }
                    else {
                        $msgyouTpl = $(doT.template(msgyouTpl)(item));
                    }

                    if (!Live.options.lastisyou) {
                        var $msgyoulist = $(doT.template(msgyoulistTpl)(Live.options.msgyoulistnum));

                        $msgyoulist.append($msgyouTpl);

                        $container.append($msgyoulist);

                        Live.options.msgyoulistnum++;
                    }
                    else {
                        Live.options.msgyoulistnum--;

                        var $msgyoulist = $('#myl_' + Live.options.msgyoulistnum);

                        $msgyoulist.append($msgyouTpl);

                        Live.options.msgyoulistnum++;
                    }

                    Live.options.lastisme = false;
                    Live.options.lastisyou = true;
                }

                Live.options.sinceId = item.mid;
            });

            require.async('scrollLoading', function () {
                $(".scrollLoading").scrollLoading();
            });

            $container.on("click", ".msgItem.audio", Live.PlayAudio);
            $container.on("click", ".msgItem .feelItem", function () {
                var $this = $(this);
                var $img = $this.find('.feelImg');

                if ($img.hasClass('feelRotate180')) {
                    $this.find('.title').show(500);
                    $img.removeClass('feelRotate180').addClass('feelRotate0');
                } else {
                    $this.find('.title').hide(500);
                    $img.removeClass('feelRotate0').addClass('feelRotate180');
                }
            });

            Live.options.loading = false;
        }
    };

    Live.PlayAudio = function () {
        var $this = $(this);
        require.async('mp3player', function (player) {
            var $msg = $this.closest(".msgItem");
            var msg = $msg.find(".audioInfo").data("audio");
            var audio = $msg.data('audio');
            if (window.chatAudioPlayer) {
                window.chatAudioPlayer.stop();
            }
            if (!audio) { // 第一次播放
                audio = new player({
                    mp3_url: msg,
                    wav_url: msg,
                    onStop: function () {
                        $msg.removeClass("audioPlaying");
                    },
                });

                window.chatAudioPlayer = audio;
                window.chatAudioPlayer.play();
                $msg.addClass("audioPlaying").data("audio", audio);
            } else if ($msg.hasClass("audioPlaying")) { // 取消播放
                audio.stop();
                window.chatAudioPlayer.stop();
            } else { // 重播
                window.chatAudioPlayer = audio;
                window.chatAudioPlayer.play();
                $msg.addClass("audioPlaying");
            }
        });
    };

    $(document).scroll(function () {
        var scrollTop = $(document).scrollTop();
        var wHeight = $(window).height();
        var dHeight = $(document).height();
        if (scrollTop + wHeight + 10 >= dHeight && !Live.options.loading) {

            console.log(Live.options.sinceId);
            console.log(Live.options.loading);

            //Live.options.sinceId++;
            Live.options.loading = Live.GetLiveTimeLine();
        }
    });

    module.exports = Live;
});