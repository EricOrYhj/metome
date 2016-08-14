define(function (require) {
    var Tool = {};

    /**
     * 获取文件拓展名
     * @param fileName
     * @returns {*}
     */
    Tool.getFileExtends = function (fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    };

    /**
     * 根据文件扩展名判断文件是否图片
     * @param fileExt
     * @returns {boolean}
     */
    Tool.isPicture = function (fileExt) {

        if (!fileExt) return false;

        var fileExts = ["jpg", "gif", "png", "jpeg", "bmp"];

        for (var i in fileExts) {
            if (fileExts[i] === fileExt.toLowerCase()) return true;
        }

        return false;
    };

    /**
     * 标签转化
     * @param msg
     * @returns {string}
     */
    Tool.tagConvert = function (msg) {
        return msg.replace(/</g, "&lt").replace(/>/g, "&gt;");
    };

    Tool.removeHTMLTag = function (str) {
        return str.replace(/<[^>]*>/ig, '');
    };

    /**
     * 获取JSON对象的长度
     * @param obj
     * @returns {number}
     */
    Tool.getJSONLength = function (obj) {
        var length = 0;
        for (var item in obj) {
            length++;
        }
        return length;
    };

    /**
     * 懒加载图片
     * @param $target
     */
    Tool.lazyload = function ($target, callback) {
        var $lazyTarget = $target.find("[data-src]");
        if (!$lazyTarget.length && typeof $target.attr("data-src") != "undefined") $lazyTarget = $target;

        $lazyTarget.each(function (index, img) {
            var newImg = new Image();
            var $img = $(img);

            if ($img.data("loaded")) return;
            //图片加载失败
            newImg.onerror = function () {
                img.src = Config.errorImgPath;
                $img.data("loaded", true).closest(".imgPreview").removeClass("loading");
            };

            //图片加载成功
            newImg.onload = function () {
                img.src = $img.attr("data-src");
                $img.data("loaded", true).closest(".imgPreview").removeClass("loading").fadeIn();
                // callback
                if (callback) {
                    callback();
                }
            };

            newImg.src = $img.attr("data-src");
        });
    };


    /**
     * 一组图片加载完成后的回调
     * @param $target
     * @param callback
     */
    Tool.onBatchImageLoad = function ($target, callback) {

        var total = $target.length * 2, current = 0;
        console.log("total:", total);

        $.each($target, function (index, img) {
            img.onload = function () {
                current++;
                if (total === total) callback();
            }
        })

    };

    /**
     * 获取UUID
     */
    Tool.getUUID = (function () {
        function id() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }

        return function () {
            return id() + id() + '-' + id() + '-' + id() + '-' +
              id() + '-' + id() + id() + id();
        };
    })();

    /**
     * 获取URL参数
     * @param name
     * @returns {*}
     */
    Tool.getURLQuery = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    };

    /**
     * 时间戳的转换
     * @param dateStr
     * @returns {*}
     */
    Tool.createTimeSpan = function (dateStr) {

        var dateTime = new Date();

        var date = dateStr.split(" ")[0];
        var year = date.split("-")[0];
        var month = date.split("-")[1] - 1;
        var day = date.split("-")[2];

        var time = dateStr.split(" ")[1];
        var hour = time.split(":")[0];
        var minute = time.split(":")[1];
        var second = time.split(":")[2];

        dateTime.setFullYear(year);
        dateTime.setMonth(month);
        dateTime.setDate(day);
        dateTime.setHours(hour);
        dateTime.setMinutes(minute);
        dateTime.setSeconds(second);

        var now = new Date();

        var today = new Date();
        today.setFullYear(now.getFullYear());
        today.setMonth(now.getMonth());
        today.setDate(now.getDate());
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);

        var milliseconds = 0;
        var timeSpanStr;
        if (dateTime - today >= 0) {
            milliseconds = now - dateTime;
            if (milliseconds < 1000 && milliseconds < 60000) {
                timeSpanStr = '刚刚';
            } else if (milliseconds > 1000 && milliseconds < 60000) {
                timeSpanStr = Math.floor(milliseconds / 1000) + '秒前';
            } else if (milliseconds > 60000 && milliseconds < 3600000) {
                timeSpanStr = Math.floor(milliseconds / 60000) + '分钟前';
            } else {
                timeSpanStr = '今天' + " " + hour + ":" + minute;
            }
        }
        else {
            milliseconds = today - dateTime;
            if (milliseconds < 86400000) {
                timeSpanStr = '昨天' + " " + hour + ":" + minute;
            } else if (milliseconds > 86400000 && year == today.getFullYear()) {
                timeSpanStr = (month + 1) + '月' + day + '日' + " " + hour + ":" + minute;
            } else {
                timeSpanStr = year + '年' + (month + 1) + '月' + day + '日' + " " + hour + ":" + minute;
            }
        }
        return timeSpanStr;
    };

    /**
     * 格式化消息时间
     * @param dateStr
     * @returns {*}
     */
    Tool.formatMsgDate = function (dateStr) {

        dateStr = dateStr || new Date().format("yyyy-MM-dd hh:mm:ss.S");

        var dateTime = new Date();

        var date = dateStr.split(" ")[0];
        var year = date.split("-")[0];
        var month = date.split("-")[1] - 1;
        var day = date.split("-")[2];

        var time = dateStr.split(" ")[1];
        var hour = time.split(":")[0];
        var minute = time.split(":")[1];
        var second = time.split(":")[2];

        dateTime.setFullYear(year);
        dateTime.setMonth(month);
        dateTime.setDate(day);
        dateTime.setHours(hour);
        dateTime.setMinutes(minute);
        dateTime.setSeconds(second);

        var now = new Date();

        var today = new Date();
        today.setFullYear(now.getFullYear());
        today.setMonth(now.getMonth());
        today.setDate(now.getDate());
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);

        var milliseconds = 0;
        var timeSpanStr;
        if (dateTime - today >= 0) {
            timeSpanStr = hour + ":" + minute;
        } else {
            milliseconds = today - dateTime;
            if (milliseconds < 86400000) {
                timeSpanStr = '昨天' + " " + hour + ":" + minute;
            } else if (milliseconds > 86400000 && year == today.getFullYear()) {
                timeSpanStr = (month + 1) + '月' + day + '日';
            } else {
                timeSpanStr = year + '年' + (month + 1) + '月' + day + '日';
            }
        }
        return timeSpanStr;
    };

    /**
     * 格式化消息时间
     * @param dateStr
     * @returns {*}
     */
    Tool.formatMsgTime = function (timespan) {

        var dateTime = new Date(timespan);

        var year = dateTime.getFullYear();
        var month = dateTime.getMonth() + 1;
        var day = dateTime.getDate();
        var hour = dateTime.getHours();
        var minute = dateTime.getMinutes();
        var second = dateTime.getSeconds();

        var now = new Date();

        var today = new Date();
        today.setFullYear(now.getFullYear());
        today.setMonth(now.getMonth());
        today.setDate(now.getDate());
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);

        var milliseconds = 0;
        var timeSpanStr;
        if (dateTime - today >= 0) {
            timeSpanStr = hour + ":" + minute;
        } else {
            milliseconds = today - dateTime;
            if (milliseconds < 86400000) {
                timeSpanStr = '昨天' + " " + hour + ":" + minute;
            } else if (milliseconds > 86400000 && year == today.getFullYear()) {
                timeSpanStr = (month + 1) + '-' + day + ' ' + hour + ':' + minute;
            } else {
                timeSpanStr = year + '-' + (month + 1) + '-' + day + ' ' + hour + ':' + minute;
            }
        }
        return timeSpanStr;
    };

    Tool.getImageThumbnail = function (url, w, h) {
        var querystring = '?imageView2/1';
        w ? querystring = querystring + '/w/' + w : null;
        h ? querystring = querystring + '/h/' + h : null;

        querystring = querystring + '/q/100';

        return url + querystring;
    };

    Tool.EventWorker = function () {
        var o = $({});
        var event = {};

        event.receive = function () {
            o.on.apply(o, arguments);
        };

        event.cancel = function () {
            o.off.apply(o, arguments);
        };

        event.dispatch = function () {
            o.trigger.apply(o, arguments);
        };

        return event;
    };

    /**
     * 设置cookie
     * @param name
     * @param value
     * @param expire
     */
    window.setCookie = function (name, value, expire) {
        var expireDate;
        if (!expire) {
            var nextyear = new Date();
            nextyear.setFullYear(nextyear.getFullYear() + 10);
            expireDate = nextyear.toGMTString();
        } else
            expireDate = expire.toGMTString();

        if (document.domain.indexOf('.mingdao.com') == -1) {
            document.cookie = name + "=" + escape(value) + ";expires=" + expireDate + ";path=/";
        } else {
            document.cookie = name + "=" + escape(value) + ";expires=" + expireDate + ";path=/;domain=.mingdao.com";
        }
    };

    /**
     * 读取cookie
     * @param name
     * @returns {*}
     */
    window.getCookie = function (name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr !== null) {
            return unescape(arr[2]);
        }
        return null;
    };


    /**
     * 当前div滚动时阻止上级元素滚动
     */
    $.fn.preventPageScroll = function () {
        $(this).on('mousewheel DOMMouseScroll', function (e) {
            var e0 = e.originalEvent,
              delta = e0.wheelDelta || -e0.detail;

            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        });
    };


    window.Tool = Tool;


    return Tool;
});
