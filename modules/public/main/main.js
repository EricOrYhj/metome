define(function (require, exports, module) {

    var Live = require('../live/live');

    var main = {};

    main.Init = function () {

        Live.GetLiveCover();
        Live.GetLiveTimeLine();

    };

    module.exports = main;
});