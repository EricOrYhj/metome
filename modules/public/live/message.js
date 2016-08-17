define(function (require, exports, module) {

    var Tool = require('../common/tool');
    require('../common/config');
    require('../common/constant');

    var Message = {};

    Message.options = {
        uid: '',
        same: false,
        me: false
    };

    //"contentType": 0,   --消息类型： 0文本。1图片
    //"type": 0,   -- 0 主播文本 1 回复文本 2 转发记录 3 主播贴标记录 4 粉丝贴标5.点赞 6订阅,7分享，8关注 9国王邀请，
    //10 有人@ 11主播@ 12直播小视频 13音频 14 红包
    Message.format = function (datas, cid) {
        var messages = [];

        for (var i = 0; i < datas.length; i++) {

            var data = datas[i];
            Message.options.same = Message.options.uid === data.uid,
            Message.options.uid = data.uid,
            Message.options.me = data.uid === cid;

            var atUid = data.atUid;

            var message = {
                id: data.id,
                ctime: data.createTime,
                time: Tool.formatMsgTime(data.createTime),
                uid: data.uid,
                avatar: data.avatar + Config.AVATAR_100,
                placeholder: Config.avatarImgPath,
                uname: data.nickName,
                me: Message.options.me,
                same: Message.options.same,
                mid: data.fragmentId,
                ustatus: data.internalStatus
            };

            if (data.contentType === 0) {

                message.type = Constant.MSGTYPE_TEXT;

                data.fragment = data.fragment;

                message.content = Message.parse(data.fragment);
                Message.Tag(data.fragment);

                message.class = "text";

            } else if (data.contentType === 1) {

                message.type = Constant.MSGTYPE_PIC;
                message.class = "pic msgCard";
                message.file = {
                    original: data.fragmentImage,
                    placeholder: Config.placeholderImgPath
                }
            } else if (data.type === 13 || data.contentType === 13) {

                message.type = Constant.MSGTYPE_AUDIO;
                message.class = "audio msgCard";

                var audio = JSON.parse(data.fragment);

                var duration = parseInt(audio.duration / 1000);
                var width = 30;
                if ((120 / parseInt(audio.duration / 1000)) < 3) {
                    width = 100 / parseInt(120 / parseInt(audio.duration / 1000));
                }

                message.file = {
                    original: data.fragmentImage,
                    duration: duration,
                    width: width
                }
            } else if (data.type === 12 || data.contentType === 12) {

                message.type = Constant.MSGTYPE_VIDEO;
                message.class = "video msgCard";
                message.file = {
                    original: data.fragment,
                    placeholder: data.fragmentImage
                }
            }

            messages.push(message)
        }

        // var audio = {
        //     ctime: 1462157542000,
        //     time: Tool.formatMsgTime(1462157542000),
        //     uid: 301,
        //     avatar: "http://cdn.me-to-me.com/FpXdLCD5Nhos0NbWPaLHcegzAiMe?imageView2/1/w/100/h/100/q/90",
        //     uname: "sman",
        //     me: true,
        //     same: true,
        //     mid: 841,
        //     ustatus: 1,
        //     class: "audio msgCard",
        //     type: 4,
        //     file: {
        //         original: "https://dn-mdmedia.qbox.me/fe288386-3d26-4eab-b5d2-51eeab82a7f9/2015/12/09/2015-12-09-12-26-54-832.mp3"
        //     }
        // }

        // var video = {
        //     ctime: 1462157542000,
        //     time: Tool.formatMsgTime(1462157542000),
        //     uid: 301,
        //     avatar: "http://cdn.me-to-me.com/FpXdLCD5Nhos0NbWPaLHcegzAiMe?imageView2/1/w/100/h/100/q/90",
        //     uname: "sman",
        //     me: true,
        //     same: true,
        //     mid: 841,
        //     ustatus: 1,
        //     class: "video msgCard",
        //     type: 5,
        //     file: {
        //         original: "http://www.kaltura.com/p/243342/sp/24334200/playManifest/entryId/0_c0r624gh/flavorId/0_w48dtkyq/format/url/protocol/http/a.mp4"
        //     }
        // }

        // messages.push(audio);

        // messages.push(video);

        console.log(messages);

        return messages;
    };

    Message.cover = function (data) {

        data.title = Message.Tag(data.title);

        var cover = {
            ctime: data.createTime,
            time: Tool.formatMsgTime(data.createTime),
            uid: data.uid,
            avatar: data.avatar + Config.AVATAR_100,
            placeholder: Config.avatarImgPath,
            uname: data.nickName,
            type: Constant.MSGTYPE_PIC,
            class: "pic msgCard",
            file: {
                original: data.coverImage,
                placeholder: Config.placeholderImgPath
            },
            title: data.title,
            zindex: 10001,
        };

        return cover;
    }

    Message.Tag = function (msg) {

        var result = /^「(.*)」$/g.exec(msg);

        var reg = new RegExp('\\「(.+)\\」', 'gi');

        var val = reg.exec(msg);  // 返回一个数组.

        if (val && val.length > 0) {

            msg = msg.replace(val[0], '<span class="audioColor">' + val[0] + '</span>');
        }

        return msg;
    }

    Message.parse = function (msg) {
        return $.fn.emotion.parse(msg);
    };

    module.exports = Message;
});