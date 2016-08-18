define(function (require, exports, module) {

    require('emotion');
    //require('scrollLoading');

    var Live = require('../live/live');
    var Tool = require('../common/tool');

    var main = {};

    main.Init = function () {

        Live.options.topicId = Tool.getURLQuery('topicId');

        if (!Live.options.topicId) {
            alert("没有直播id");

            return false;
        }

        Live.GetLiveCover();
        Live.GetLiveTimeLine();
    };

    module.exports = main;
});