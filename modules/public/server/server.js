define(function (require, exports, module) {
    var apiUrl = "http://114.215.196.92:8080";

    var api = {
        liveTimeline: apiUrl + '/api/live/liveTimeline'
    };

    var Server = {
        GetLiveTimeLine: function (topicId, sinceId, callback) {
            var params = {
                topicId: '20053',
                sinceId: '0',
                uid: '295',
                token: '76cfdad8ebe94ef9abe6b1e0fa3695e3'
            }

            callback(returnData.data.liveElements);

            JsonPost(api.liveTimeline, params, callback);
        },
        GetLiveCover: function () {

        }
    };

    var JsonpGet = function (url, params, callback) {
        $.ajax({
            url: url,
            type: 'GET',                                //jsonp 类型下只能使用GET,不能用POST,这里不写默认为GET
            dataType: 'jsonp',                          //指定为jsonp类型
            data: params,                //数据参数
            jsonp: 'callback',                          //服务器端获取回调函数名的key，对应后台有$_GET['callback']='getName';callback是默认值
            success: function (result) {                  //成功执行处理，对应后台返回的getName(data)方法。
                callback(result);
            },
            error: function (msg) {
            }
        });
    };


    var JsonGet = function (url, params, callback) {
        $.ajax({
            url: url,       //正常
            type: 'GET',　　　　　　　　　　　　　　　　　　　 //这里是普通ajax,可以用POST
            dataType: 'json',
            data: params,
            success: function (result) {
                callback(result);
            },
            error: function (msg) {
            }
        });
    };

    var JsonPost = function (url, params, callback) {
        $.ajax({
            url: url,       //正常
            type: 'POST',　　　　　　　　　　　　　　　　　　　 //这里是普通ajax,可以用POST
            contentType: "application/x-www-form-urlencoded",
            dataType: 'json',
            data: params,
            success: function (result) {
                callback(result);
            },
            error: function (msg) {
            }
        });
    };

    var returnData = {
        "accessToken": "78bb7fc2b27746dba4d16ce43b12c0f9",
        "code": 20029,
        "data": {
            "liveElements": [
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 1,
                    "createTime": 1462453989000,
                    "fragmentId": 966,
                    "fragmentImage": "http://cdn.me-to-me.com/FtLrR1F7Z_3io0pB0NZNFBJpTKnO",
                    "id": 966,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 0,
                    "createTime": 1462454022000,
                    "fragment": "少女心的粉色背带带",
                    "fragmentId": 967,
                    "id": 967,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 1,
                    "createTime": 1462454035000,
                    "fragmentId": 968,
                    "fragmentImage": "http://cdn.me-to-me.com/FvK2NldmyxAyEGpOd1YwOimTXxiN",
                    "id": 968,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 1,
                    "createTime": 1462454116000,
                    "fragmentId": 969,
                    "fragmentImage": "http://cdn.me-to-me.com/FsKcETvyQmNnThk2SikeoiSA204G",
                    "id": 969,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FmxPkUPvn72V5Ivi3rdpZxzRY7bT",
                    "contentType": 0,
                    "createTime": 1462454150000,
                    "fragment": "脱！脱！",
                    "fragmentId": 970,
                    "id": 970,
                    "internalStatus": 1,
                    "isFollowed": 1,
                    "nickName": "暴打陈斌",
                    "type": 1,
                    "uid": 305
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FmxPkUPvn72V5Ivi3rdpZxzRY7bT",
                    "contentType": 0,
                    "createTime": 1462454170000,
                    "fragment": "汗都出来了，脱两件衣服啊！",
                    "fragmentId": 971,
                    "id": 971,
                    "internalStatus": 1,
                    "isFollowed": 1,
                    "nickName": "暴打陈斌",
                    "type": 1,
                    "uid": 305
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 1,
                    "createTime": 1462454181000,
                    "fragmentId": 972,
                    "fragmentImage": "http://cdn.me-to-me.com/Fh_LMDJeAPwed6oozphPedZMZYQH",
                    "id": 972,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 0,
                    "createTime": 1462454184000,
                    "fragment": "办公室的肌腿",
                    "fragmentId": 973,
                    "id": 973,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454202000,
                    "fragment": "来个蛋蛋照",
                    "fragmentId": 974,
                    "id": 974,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 1,
                    "uid": 304
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454250000,
                    "fragment": "好大的屁股撸",
                    "fragmentId": 975,
                    "id": 975,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 1,
                    "uid": 304
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 1,
                    "createTime": 1462454275000,
                    "fragmentId": 976,
                    "fragmentImage": "http://cdn.me-to-me.com/FoKXrgyx6WhMwcTrybZQsNU3G0wn",
                    "id": 976,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 0,
                    "createTime": 1462454275000,
                    "fragment": "硕大的大肚皮",
                    "fragmentId": 977,
                    "id": 977,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454285000,
                    "fragment": "找蛋？",
                    "fragmentId": 978,
                    "id": 978,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 1,
                    "uid": 304
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 1,
                    "createTime": 1462454327000,
                    "fragmentId": 979,
                    "fragmentImage": "http://cdn.me-to-me.com/Fn_oywK0ffw7vdwlyy2ov38fLtwE",
                    "id": 979,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 0,
                    "createTime": 1462454328000,
                    "fragment": "眼睛被伤到了",
                    "fragmentId": 980,
                    "id": 980,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454373000,
                    "fragment": "这个不好看……美女骑车我想看",
                    "fragmentId": 981,
                    "id": 981,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 1,
                    "uid": 304
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FmxPkUPvn72V5Ivi3rdpZxzRY7bT",
                    "contentType": 0,
                    "createTime": 1462454413000,
                    "fragment": "穿太多，不看了",
                    "fragmentId": 982,
                    "id": 982,
                    "internalStatus": 1,
                    "isFollowed": 1,
                    "nickName": "暴打陈斌",
                    "type": 1,
                    "uid": 305
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FjecTRJ9F8OTHz_489bew2qsFKtO",
                    "contentType": 0,
                    "createTime": 1462454480000,
                    "fragment": "爱的深沉",
                    "fragmentId": 983,
                    "id": 983,
                    "internalStatus": 1,
                    "isFollowed": 0,
                    "nickName": "肥明",
                    "type": 4,
                    "uid": 308
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FjecTRJ9F8OTHz_489bew2qsFKtO",
                    "contentType": 0,
                    "createTime": 1462454503000,
                    "fragment": "角度迷离",
                    "fragmentId": 984,
                    "id": 984,
                    "internalStatus": 1,
                    "isFollowed": 0,
                    "nickName": "肥明",
                    "type": 4,
                    "uid": 308
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FjecTRJ9F8OTHz_489bew2qsFKtO",
                    "contentType": 0,
                    "createTime": 1462454548000,
                    "fragment": "国王有点诚意好吗，裤子都脱了",
                    "fragmentId": 985,
                    "id": 985,
                    "internalStatus": 1,
                    "isFollowed": 0,
                    "nickName": "肥明",
                    "type": 1,
                    "uid": 308
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FpXdLCD5Nhos0NbWPaLHcegzAiMe",
                    "contentType": 0,
                    "createTime": 1462454564000,
                    "fragment": "卧槽",
                    "fragmentId": 986,
                    "id": 986,
                    "internalStatus": 1,
                    "isFollowed": 1,
                    "nickName": "sman",
                    "type": 1,
                    "uid": 295
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 0,
                    "createTime": 1462454588000,
                    "fragmentId": 987,
                    "id": 987,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454590000,
                    "fragment": "蛋蛋的忧伤",
                    "fragmentId": 988,
                    "id": 988,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 4,
                    "uid": 304
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 1,
                    "createTime": 1462454598000,
                    "fragmentId": 989,
                    "fragmentImage": "http://cdn.me-to-me.com/Fs3gzJkwJsrVyRQp4_OSy5qHa_10",
                    "id": 989,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 0,
                    "createTime": 1462454608000,
                    "fragment": "美女上",
                    "fragmentId": 991,
                    "id": 991,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454643000,
                    "fragment": "这“骑”骑的好欢",
                    "fragmentId": 992,
                    "id": 992,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 1,
                    "uid": 304
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 1,
                    "createTime": 1462454644000,
                    "fragmentId": 993,
                    "fragmentImage": "http://cdn.me-to-me.com/Fq0F5okKbcbV2MELDsVAE4lb_WOo",
                    "id": 993,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FjecTRJ9F8OTHz_489bew2qsFKtO",
                    "contentType": 0,
                    "createTime": 1462454645000,
                    "fragment": "一双碧人",
                    "fragmentId": 994,
                    "id": 994,
                    "internalStatus": 1,
                    "isFollowed": 0,
                    "nickName": "肥明",
                    "type": 4,
                    "uid": 308
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FjecTRJ9F8OTHz_489bew2qsFKtO",
                    "contentType": 0,
                    "createTime": 1462454651000,
                    "fragment": "表情有点微妙",
                    "fragmentId": 995,
                    "id": 995,
                    "internalStatus": 1,
                    "isFollowed": 0,
                    "nickName": "肥明",
                    "type": 4,
                    "uid": 308
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 0,
                    "createTime": 1462454654000,
                    "fragment": "沟来了",
                    "fragmentId": 996,
                    "id": 996,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454655000,
                    "fragment": "乳沟来了",
                    "fragmentId": 997,
                    "id": 997,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 1,
                    "uid": 304
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FjecTRJ9F8OTHz_489bew2qsFKtO",
                    "contentType": 0,
                    "createTime": 1462454665000,
                    "fragment": "什么都有了",
                    "fragmentId": 998,
                    "id": 998,
                    "internalStatus": 1,
                    "isFollowed": 0,
                    "nickName": "肥明",
                    "type": 1,
                    "uid": 308
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454670000,
                    "fragment": "以后再不能停飞机了",
                    "fragmentId": 999,
                    "id": 999,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 1,
                    "uid": 304
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FjecTRJ9F8OTHz_489bew2qsFKtO",
                    "contentType": 0,
                    "createTime": 1462454685000,
                    "fragment": "事业通顺发达！",
                    "fragmentId": 1000,
                    "id": 1000,
                    "internalStatus": 1,
                    "isFollowed": 0,
                    "nickName": "肥明",
                    "type": 1,
                    "uid": 308
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FpXdLCD5Nhos0NbWPaLHcegzAiMe",
                    "contentType": 0,
                    "createTime": 1462454696000,
                    "fragment": "我擦",
                    "fragmentId": 1001,
                    "id": 1001,
                    "internalStatus": 1,
                    "isFollowed": 1,
                    "nickName": "sman",
                    "type": 1,
                    "uid": 295
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454698000,
                    "fragment": "想要的举手",
                    "fragmentId": 1002,
                    "id": 1002,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 1,
                    "uid": 304
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/3b046c12-5751-4125-b79c-f826065632cd",
                    "contentType": 0,
                    "createTime": 1462454698000,
                    "fragment": "???",
                    "fragmentId": 1003,
                    "id": 1003,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "测试帐号",
                    "type": 1,
                    "uid": 296
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FjecTRJ9F8OTHz_489bew2qsFKtO",
                    "contentType": 0,
                    "createTime": 1462454713000,
                    "fragment": "爱的奉献",
                    "fragmentId": 1004,
                    "id": 1004,
                    "internalStatus": 1,
                    "isFollowed": 0,
                    "nickName": "肥明",
                    "type": 4,
                    "uid": 308
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 0,
                    "createTime": 1462454735000,
                    "fragment": "骑完的藏獒是这样的",
                    "fragmentId": 1005,
                    "id": 1005,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 1,
                    "createTime": 1462454736000,
                    "fragmentId": 1006,
                    "fragmentImage": "http://cdn.me-to-me.com/FtEDLHvndkVkvoNmAW_nH-34oj0W",
                    "id": 1006,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454740000,
                    "fragment": "再来点料吧",
                    "fragmentId": 1007,
                    "id": 1007,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 1,
                    "uid": 304
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454750000,
                    "fragment": "老邓拉屎经典动作",
                    "fragmentId": 1008,
                    "id": 1008,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 1,
                    "uid": 304
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FjecTRJ9F8OTHz_489bew2qsFKtO",
                    "contentType": 0,
                    "createTime": 1462454763000,
                    "fragment": "我好好贴了个游戏测评，你们却！",
                    "fragmentId": 1009,
                    "id": 1009,
                    "internalStatus": 1,
                    "isFollowed": 0,
                    "nickName": "肥明",
                    "type": 1,
                    "uid": 308
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FpXdLCD5Nhos0NbWPaLHcegzAiMe",
                    "contentType": 0,
                    "createTime": 1462454769000,
                    "fragment": "明天买个动感单车放办公室如何",
                    "fragmentId": 1010,
                    "id": 1010,
                    "internalStatus": 1,
                    "isFollowed": 1,
                    "nickName": "sman",
                    "type": 1,
                    "uid": 295
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FjecTRJ9F8OTHz_489bew2qsFKtO",
                    "contentType": 0,
                    "createTime": 1462454779000,
                    "fragment": "做得好！太好了。我们就喜欢看这些！",
                    "fragmentId": 1011,
                    "id": 1011,
                    "internalStatus": 1,
                    "isFollowed": 0,
                    "nickName": "肥明",
                    "type": 1,
                    "uid": 308
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454787000,
                    "fragment": "我觉得充气娃娃会好点",
                    "fragmentId": 1012,
                    "id": 1012,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 1,
                    "uid": 304
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FpXdLCD5Nhos0NbWPaLHcegzAiMe",
                    "contentType": 0,
                    "createTime": 1462454790000,
                    "fragment": "运动的情怀",
                    "fragmentId": 1013,
                    "id": 1013,
                    "internalStatus": 1,
                    "isFollowed": 1,
                    "nickName": "sman",
                    "type": 4,
                    "uid": 295
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FryPW7z_xXT6Roik6BHyMuQybLjL",
                    "contentType": 0,
                    "createTime": 1462454801000,
                    "fragment": "你们喜欢看男版还是女版",
                    "fragmentId": 1014,
                    "id": 1014,
                    "internalStatus": 2,
                    "isFollowed": 0,
                    "nickName": "白眼少女",
                    "type": 0,
                    "uid": 301
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/FpXdLCD5Nhos0NbWPaLHcegzAiMe",
                    "contentType": 0,
                    "createTime": 1462454802000,
                    "fragment": "???",
                    "fragmentId": 1015,
                    "id": 1015,
                    "internalStatus": 1,
                    "isFollowed": 1,
                    "nickName": "sman",
                    "type": 1,
                    "uid": 295
                },
                {
                    "atUid": 0,
                    "avatar": "http://cdn.me-to-me.com/ac9b8cde-52fd-470a-8ba7-dd975b265e8e",
                    "contentType": 0,
                    "createTime": 1462454814000,
                    "fragment": "图片需要放大",
                    "fragmentId": 1016,
                    "id": 1016,
                    "internalStatus": 0,
                    "isFollowed": 0,
                    "nickName": "带头大哥",
                    "type": 1,
                    "uid": 304
                }
            ]
        },
        "message": "获取直播信息成功"
    }

    //"contentType": 0,   --消息类型： 0文本。1图片
    //"fragmentId": 3,   --消息id
    //"isFollow": 0,   --是否关注了 0 否 1是
    //"nickName": "小小宝",
    //"publishTime": 1460434034000,
    //"type": 0,   -- 0 主播文本 1 回复文本 2 转发记录 3 主播贴标记录 4 粉丝贴标5.点赞 6订阅,7分享，8关注 9国王邀请，10 有人@ 11主播@ 12直播小视频 13音频 14 红包
    //"uid": 293，
    //"internalStatus":0  -- 人员关系 0 圈外 1 圈内 2 小王 3 国王

    module.exports = Server;
});

/** 通用请求 */
(function ($) {
    /** @type {Object} ajax 请求队列 */
    var ajaxQueue = $({});
    /** @type {Object} 正在请求中的 queueName */
    var requesting = {};

    /**
     * 请求 Ajax API 接口
     * @param  {String} controllerName 模块名称
     * @param  {String} actionName     操作名称
     * @param  {Object} paramObj       请求参数
     * @param  {Object} options        额外配置
     * @param  {Boolean} options.silent 发生错误时不弹出提示
     * @param  {String} options.method HTTP 请求方法，默认为 POST
     * @return {Promise}               返回结果的 promise
     */
    function requestApi(controllerName, actionName, paramObj, options) {
        var ajaxOptions = (options && options.ajaxOptions) || {};
        if (options && options.method) { ajaxOptions.type = options.method; }
        paramObj = paramObj || {};

        for (var key in paramObj) {
            var val = paramObj[key];
            if (typeof val === 'function') { val = val(); }
            if (val && typeof val === 'object') { val = JSON.stringify(val); }
            paramObj[key] = val;
        }

        var alert = (options && options.silent)
                ? function () { }
                : function (msg, level) {
                    level = level || 3;
                    window.alert(msg, level);
                };

        var ajax;
        var dfd = $.Deferred();
        var promise = dfd.promise();

        function doRequest(next) {
            requesting[queueName] = true;
            ajax = $.ajax($.extend({
                url: '/ajaxpage/AjaxHeader.ashx?controller='
                            + encodeURIComponent(controllerName)
                            + '&action='
                            + encodeURIComponent(actionName),
                type: 'POST',
                cache: false,
                data: paramObj,
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded',
            }, ajaxOptions));
            ajax.then(undefined, function (jqXHR, textStatus) {
                var errorCode, errorMessage;
                if (textStatus === 'abort') {
                    errorCode = 1;
                    errorMessage = '请求被取消';
                } else if (jqXHR.status === 0) {
                    errorCode = 0;
                    errorMessage = '请求服务器失败，请检查您的网络';
                } else if (jqXHR.status < 200 || jqXHR.status > 299) {
                    errorCode = jqXHR.status;
                    errorMessage = getErrorMessageByCode(jqXHR.status) || '发生未知错误，请联系明道支持';
                }

                if (jqXHR.responseText) {
                    try {
                        var res = JSON.parse(jqXHR.responseText);
                        if (res.exception) return $.Deferred().resolve(res);
                    } catch (jsonError) {
                        try {
                            var textErrorMessage = $(jqXHR.responseText).find('#textErrorMessage').val();
                            if (textErrorMessage) { /* TODO: 处理服务端返回的错误信息*/ }
                        } catch (htmlError) { void 0; }
                    }
                }

                if (errorMessage && textStatus !== 'abort') {
                    // 火狐在用户跳走时会弹 “请求服务器失败”
                    if (errorCode !== 0 && !$.browser.mozilla) alert(errorMessage);
                }

                return $.Deferred().reject({
                    errorCode: errorCode,
                    errorMessage: errorMessage,
                });
            })
            .then(function (res) {
                var errorCode, errorMessage;
                if (typeof res !== 'object') {
                    errorCode = -1;
                    errorMessage = '解析返回结果错误，请联系明道支持';
                } else if (res.exception) {
                    errorCode = res.state;
                    errorMessage = res.exception;
                } else {
                    return res.data;
                }
                alert(errorMessage || '未知错误，请联系明道支持');
                return $.Deferred().reject({
                    errorCode: errorCode,
                    errorMessage: errorMessage,
                });
            })
            .then(dfd.resolve, dfd.reject)
            .always(function () {
                if (next) { next(); }
                if (!ajaxQueue.queue(controllerName).length) {
                    requesting[queueName] = false;
                }
            });
        }

        var queueName = controllerName + '.' + actionName;
        ajaxQueue.queue(queueName, doRequest);

        promise.abort = function (statusText) {
            // proxy abort to the ajax if it is active
            if (ajax) {
                return ajax.abort(statusText);
            }
            // if there wasn't already a ajax we need to remove from queue
            var queue = ajaxQueue.queue(queueName),
              index = $.inArray(doRequest, queue);
            if (index > -1) {
                queue.splice(index, 1);
            }
            // and then reject the deferred
            dfd.reject(1);
            return promise;
        };

        if (!requesting[queueName]) {
            ajaxQueue.dequeue(queueName);
        }

        return promise;
    }

    requestApi.abortAll = function () {
        ajaxQueue.clearQueue();
        requesting = {};
    };

    $.api = requestApi;
}(jQuery));