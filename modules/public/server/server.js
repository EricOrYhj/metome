define(function (require, exports, module) {
    var apiUrl = "http://114.215.196.92:8080";

    var api = {
        liveCover: apiUrl + '/api/live/liveCover',
        liveTimeline: apiUrl + '/api/live/liveTimeline',
    };

    var Server = {
        GetLiveTimeLine: function (topicId, sinceId, callback) {
            var security = { "appId": "100201", "currentTime": "1471077216791", "nonce": "043eb17ae3eb4bc09407e63b3bb10a12", "sign": "aa35ad90185ba7760a9a9bd2b587610af385a761" };

            var params = {
                uid: '295',
                token: '76cfdad8ebe94ef9abe6b1e0fa3695e3',
                appId: '110202',
                security: JSON.stringify(security),
                topicId: topicId,
                sinceId: sinceId,
            }

            JsonPost(api.liveTimeline, params, callback);
        },

        GetLiveCover: function (topicId, callback) {
            var security = { "appId": "100201", "currentTime": "1471077216791", "nonce": "043eb17ae3eb4bc09407e63b3bb10a12", "sign": "aa35ad90185ba7760a9a9bd2b587610af385a761" };

            var params = {
                uid: '295',
                token: '76cfdad8ebe94ef9abe6b1e0fa3695e3',
                appId: '110202',
                security: JSON.stringify(security),
                topicId: topicId,
                sinceId: '0',
            }

            JsonPost(api.liveCover, params, callback);
        }
    };

    var JsonpGet = function (url, params, callback) {
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            data: params,
            jsonp: 'callback',
            success: function (result) {
                callback(result);
            },
            error: function (msg) {
            }
        });
    };


    var JsonGet = function (url, params, callback) {
        $.ajax({
            url: url,
            type: 'GET',
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
            url: url,
            type: 'POST',
            contentType: "application/x-www-form-urlencoded",
            dataType: 'json',
            data: params,
            success: function (result) {
                callback(result);
            },
            error: function (msg) {
                console.log(msg);
            }
        });
    };

    module.exports = Server;
});
