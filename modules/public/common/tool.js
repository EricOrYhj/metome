define(function (require) {
    var Tool = {};
    /**
     * 格式化显示日期格式
     * @param date
     * @returns {string}
     */
    Tool.formatDate = function (date) {
        var now = typeof date === "undefined" ? new Date() : new Date(date);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();

        if (month < 10) month = "0" + month;
        if (minute < 10) minute = "0" + minute;
        var date = year + "-" + month + "-" + day + " " + hour + ":" + minute;

        return date;
    };
    /**
     * 格式化文件大小，像8MB20KB这样的显示格式
     * @param size
     * @returns {string}
     */
    Tool.formatFileSize = function (size) {
        var byteSize = Math.round(size / 1024 * 100) / 100;
        var suffix = 'K';
        if (byteSize > 1024) {
            byteSize = Math.round(byteSize / 1024 * 100) / 100;
            suffix = 'M';
        } else {
            byteSize = Number(byteSize).toFixed(0);
        }

        return byteSize + suffix;
    };

    /**
     * 格式化音频文件的长度，如�:20'20"
     * @param audioLength
     * @returns {string}
     */
    Tool.formatAudioLength = function (audioLength) {

        if (audioLength < 0) audioLength = 0;

        var audioLen = "",
          temp;

        temp = Math.floor(audioLength / (60 * 60));
        audioLen = temp != 0 ? temp + ":" : "";//�
        temp = Math.floor(audioLength % (60 * 60) / 60);
        audioLen += (temp != 0) ? temp + "':" : "";//�
        audioLen += Math.floor(audioLength % 60) + '"';//�

        return audioLen;
    };


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
     * 得到文件相应的class
     * @param fileExtends
     * @returns {*}
     */
    Tool.getFileClass = function (fileExtends) {

        fileExtends = fileExtends.toLowerCase();

        var fileClass = 'iconFileDefault',//默认不支持的icon

          fileClassJson = {
              //图片
              "jpg": "iconFilePic",
              "gif": "iconFilePic",
              "png": "iconFilePic",
              "tif": "iconFilePic",
              "bmp": "iconFilePic",
              //MS 文件
              "ppt": "iconFilePPT",
              "pptx": "iconFilePPT",
              "doc": "iconFileWord",
              "docx": "iconFileWord",
              "xls": "iconFileExcel",
              "xlsx": "iconFileExcel",
              //压缩文件
              "zip": "iconFileZIP",
              "rar": "iconFileRAR",
              "pdf": "iconFilePDF",
              "txt": "iconFileDefault",
              "vsd": "iconFileVSD",
              "mmap": "iconFileMMAP"
          };

        for (var key in fileClassJson) {
            if (key === fileExtends) {
                fileClass = fileClassJson[key];
                break;
            }
        }
        return fileClass;
    };

    /**
     * 链接转化,将字符串中的链接转化为成a 标签
     * @param str
     * @returns {*|XML|string|void}
     */
    Tool.toLink = function (str) {
        // url前面加一个空格
        str = str.replace(/(http|https|ftp):\/\//ig, ' $1://');
        var urlReg = /((http|https|ftp):\/\/|w{1,3}\.)[^\s\|<\|\u4E00-\u9FA5]+/ig;
        // var urlReg = /((http|https|ftp):\/\/|www)[^\s\|<\|\u4E00-\u9FA5]*[^(http|https|ftp:\/\/)]/ig;
        return str.replace(urlReg, function (m) {
            var _href = m;
            if (m.match(/^w{1,3}/)) {
                _href = 'http://' + m;
            }
            return '<a class="convertLink" target="_blank" href="' + _href + '">' + m + '</a>';
        });
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
     * CSS3 animation 执行完的事件的名称
     * @returns {*}
     */
    Tool.getAnimEndEventName = function () {
        return 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';
    };

    Tool.getTransEndEventName = function () {
        return 'webkitTransitionEnd oTransitionEnd otransitionend transitionend';
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
                timeSpanStr = md_lang.myfeed_updates_time_justnow;
            } else if (milliseconds > 1000 && milliseconds < 60000) {
                timeSpanStr = Math.floor(milliseconds / 1000) + md_lang.myfeed_updates_time_second;
            } else if (milliseconds > 60000 && milliseconds < 3600000) {
                timeSpanStr = Math.floor(milliseconds / 60000) + md_lang.myfeed_updates_time_minute;
            } else {
                timeSpanStr = md_lang.date_text_2 + " " + hour + ":" + minute;
            }
        }
        else {
            milliseconds = today - dateTime;
            if (milliseconds < 86400000) {
                timeSpanStr = md_lang.WB130 + " " + hour + ":" + minute;
            } else if (milliseconds > 86400000 && year == today.getFullYear()) {
                timeSpanStr = (month + 1) + md_lang.C004 + day + md_lang.C005 + " " + hour + ":" + minute;
            } else {
                timeSpanStr = year + md_lang.C003 + (month + 1) + md_lang.C004 + day + md_lang.C005 + " " + hour + ":" + minute;
            }
        }
        return timeSpanStr;
    };

    /**
     * 格式化消息的发送时间，以便精简显示
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
                timeSpanStr = md_lang.WB130 + " " + hour + ":" + minute;
            } else if (milliseconds > 86400000 && year == today.getFullYear()) {
                timeSpanStr = (month + 1) + md_lang.C004 + day + md_lang.C005;
            } else {
                timeSpanStr = year + md_lang.C003 + (month + 1) + md_lang.C004 + day + md_lang.C005;
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

    Tool.getFeedUrlById = function (id) {
        return '/feeddetail?itemID=' + id;
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
