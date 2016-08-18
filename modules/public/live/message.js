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
            Message.options.uid = data.uid;
            //Message.options.me = data.uid === cid;

            Message.options.me = data.internalStatus >= 2;

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
                ustatus: data.internalStatus,
                cidat: false,
                uidat: false
            };

            if (data.contentType === 0 && (data.type === 0 || data.type === 1)) {//普通文本

                message.type = Constant.MSGTYPE_TEXT;
                message.class = "text";

                data.fragment = data.fragment;

                message.content = Message.Emotion(data.fragment);
                message.content = Message.Tag(data.fragment);

            }
            else if (data.contentType === 0 && data.type === 4) {//非主播标签

                message.type = Constant.MSGTYPE_TEXT;
                message.class = "text";

                data.fragment = data.fragment;

                message.content = Message.Emotion(data.fragment);
                message.content = Message.Mark(data.fragment);

            }
            else if (data.contentType === 0 && data.type === 3) {//主播标签

                message.type = Constant.MSGTYPE_FEEL;
                message.class = "feel";

                data.fragment = data.fragment;

                message.content = Message.Emotion(data.fragment);
            }
            else if (data.contentType === 1 && (data.type === 0 || data.type === 1)) {//图片

                message.type = Constant.MSGTYPE_PIC;
                message.class = "pic msgCard";
                message.file = {
                    original: data.fragmentImage + Config.PREVIEW_IMG,
                    placeholder: Config.placeholderImgPath
                }
            } else if (data.type === 13 || data.contentType === 13) {//音频

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
            } else if (data.type === 12 || data.contentType === 12) {//视频

                message.type = Constant.MSGTYPE_VIDEO;
                message.class = "video msgCard";
                message.file = {
                    original: data.fragment,
                    placeholder: data.fragmentImage
                }
            } else if (data.type === 11 || data.contentType === 11) {//主播@

                message.cidat = true;

                message.type = Constant.MSGTYPE_TEXT;
                message.class = "text";

                var at = JSON.parse(data.fragment);

                var text = Message.At(at.text, at.atStart, at.atEnd);

                message.content = Message.Emotion(text);
                //message.content = Message.Tag(data.fragment);
            } else if (data.type === 10 || data.contentType === 10) {//游客@

                message.type = Constant.MSGTYPE_TEXT;
                message.class = "text";

                var at = JSON.parse(data.fragment);

                var text = Message.At(at.text, at.atStart, at.atEnd);

                message.content = Message.Emotion(text);
                //message.content = Message.Tag(data.fragment);
            }

            messages.push(message)
        }

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
                original: data.coverImage + Config.PREVIEW_IMG,
                placeholder: Config.placeholderImgPath
            },
            title: data.title,
            zindex: 10001,
        };

        return cover;
    }

    Message.Mark = function (msg) {
        msg = '<span class="audioColor"> 「' + msg + '」</span>';
        return msg
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

    Message.At = function (msg, start, end) {

        var at = msg.substr(start, end);
        msg = msg.replace(at, '<span class="audioColor">' + at + '&nbsp;&nbsp;</span>');

        return msg;
    }

    Message.Emotion = function (msg) {
        return $.fn.emotion.parse(msg);
    };

    module.exports = Message;
});