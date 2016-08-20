define(function (require, exports, module) {

    var doT = require('dot');
    var Tool = require('../common/tool');
    var Server = require('../server/server');
    var Message = require('./message');

    var footTpl = require('./tpl/footer.html');
    var coverTpl = require('./tpl/cover.html');
    var msgmeTpl = require('./tpl/msgme.html');
    var msgmeatTpl = require('./tpl/msgmeat.html');
    var msgyouTpl = require('./tpl/msgyou.html');
    var msgmelistTpl = require('./tpl/msgmelist.html');
    var msgyoulistTpl = require('./tpl/msgyoulist.html');

    var loadingTpl = require('./tpl/loading.html');

    var Live = {};

    Live.options = {
        topicId: '',//直播id
        cid: '',//直播者
        loading: false,//是否在进行分页加载
        sinceId: 0,//分页页数
        lastisme: false,//上一条是不是直播者
        lastisyou: false,
        lastismeat: false,//是否是主播@
        zindex: 10000,//直播者dom层级开始
        msgmelistnum: 1,
        msgyoulistnum: 1,//其他回复的dom id
        videoId: 0//vodio的序号
    };

    var $container = $('.container');
    var $body = $('body');
    var $header = $('#header');
    var $footer;

    var appWidth = $container.width() - 2;

    var $loading = $(doT.template(loadingTpl)());
    $body.append($loading);

    Live.GetLiveCover = function () {
        $loading = $('#loading');

        $loading.show();

        Server.GetLiveCover(Live.options.topicId, function (data) {
            data = data.data;

            Live.options.cid = data.uid;

            var cover = Message.cover(data);

            var $cover = $(doT.template(coverTpl)(cover));

            $container.prepend($cover);

            Tool.lazyload($cover);

            $footer = $(doT.template(footTpl)(cover));

            $body.append($footer);

            document.title = cover.title + ' @' + cover.uname + " --米汤";
            document.getElementById("description").content = '@' + cover.uname + '正在meTome王国中讲述想法和故事';
        });
    };

    var sh;
    Live.GetLiveTimeLine = function () {
        $loading.show();

        Server.GetLiveTimeLine(Live.options.topicId, Live.options.sinceId, function (data) {
            if (Live.options.cid) {
                Live.CreateMessageItem(data.data.liveElements);
            } else {
                sh = setInterval(
                    function () {
                        Live.CreateMessageItem(data.data.liveElements);
                    }, 0);
            }
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
                    if (Live.options.lastismeat)
                        item.same = false;

                    //item.zindex = Live.options.zindex;
                    //Live.options.zindex--;

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
                        Live.options.lastismeat = true;
                        $msgyouTpl = $(doT.template(msgmeatTpl)(item));
                    }
                    else {
                        Live.options.lastismeat = false;
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

            setTimeout(function () {
                Live.options.loading = false;
            }, 0)

            $loading.hide();
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
                        $msg.removeClass("audioAnimation");
                    },
                });

                window.chatAudioPlayer = audio;
                window.chatAudioPlayer.play();
                $msg.addClass("audioAnimation").data("audio", audio);
            } else if ($msg.hasClass("audioAnimation")) { // 取消播放
                audio.stop();
                window.chatAudioPlayer.stop();
            } else { // 重播
                window.chatAudioPlayer = audio;
                window.chatAudioPlayer.play();
                $msg.addClass("audioAnimation");
            }
        });
    };

    var prevTop = 0,
            currTop = 0;
    $(document).scroll(function () {
        var scrollTop = $(document).scrollTop();
        var wHeight = $(window).height();
        var dHeight = $(document).height();
        if (scrollTop + wHeight + 10 >= dHeight && !Live.options.loading) {
            Live.options.loading = true;
            Live.GetLiveTimeLine();
        }

        if (prevTop - scrollTop > 0) { //判断小于则为向上滚动
            //$footer.fadeIn();
            //$header.fadeIn();
            $header.removeClass('headerAnimationTop').addClass('headerAnimationDown');
            $footer.removeClass('footerAnimationTop').addClass('footerAnimationDown');

        } else if (scrollTop > 50 && scrollTop - prevTop > 50) {
            //$footer.fadeOut();
            //$header.fadeOut();
            $header.removeClass('headerAnimationDown').addClass('headerAnimationTop');
            $footer.removeClass('footerAnimationDown').addClass('footerAnimationTop');
        }

        if (scrollTop <= 50) {
            $footer.show();
            $header.show();
        }

        //if (wHeight === scrollTop) {
        //    $footer.hide();
        //    $header.hide();
        //}

        prevTop = scrollTop
    });

    module.exports = Live;
});