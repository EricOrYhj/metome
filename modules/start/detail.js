define(function (require, exports, module) {

    require('tooltip');
    require('../../vendor/jquery/jquery-ui-1.10.4.custom.js');
    require('../../vendor/jquery/jquery.slider.js');

    var doT = require('doT');

    var list = require('../list/list.js');
    var common = require('../common/common.js');
    var constant = require('../common/constant');

    var detail = {};

    detail.init = function () {
        detail.bindEvent();
    };

    detail.bindEvent = function () {
        //图片点击绑定详情
        $(document).on('click', '.appGridHover', function () {
            detail.getAppDetail($(this));
        });

        $(document).on('click', '.appGridHover', function () {
            detail.getAppDetail($(this));
        });

        detail.commentLike();//喜欢评论
        detail.commentUnlike();//取消喜欢评论
        detail.appCatClick();//WEB分类选择

        var $changeTabName = $('.changeTabName');
        //切换视图精彩应用 我的应用
        $changeTabName.click(function () {
            var _this = $(this);
            var myApp = _this.attr('data-id');
            $changeTabName.removeClass('changeTabNameCurrent');
            $changeTabName.each(function () {
                if ($(this).attr('data-id') == myApp) {
                    $(this).addClass('changeTabNameCurrent');
                }
            });
            $(".catItem").removeClass("catItemCurrent").find('i').addClass('icon-1xColor');

            if (myApp == 'myApp') {
                $('#catChoose').hide();
                $('#myAppChoose').show();
                $("#myAppChoose li:eq(0)").addClass("catItemCurrent").find('i').removeClass('icon-1xColor');
                list.getAppList(detail, 'myApp', 'All');
            } else {
                $('#catChoose').show();
                $('#myAppChoose').hide();
                $("#catChoose li:eq(0)").addClass("catItemCurrent").find('i').removeClass('icon-1xColor');
                list.getAppList(detail, '', 'home');
            }
        });
        //detail.initAddAdminInput();
        //筛选条件
        $('.typeListFrame .typeListFrameItem').click(function () {
            var appType = $(this).attr('data-id');
            if (appType) {
                constant.appType2 = appType;
                if (constant.appType == 'myApp') {
                    constant.category.categoryId = appType;
                }
            }
            $('.typeValue').text($(this).text());
            list.getAppList(detail, constant.appType, constant.category.categoryId);
        });

        //手机首页筛选条件
        $('.MRightPage .appRemmondGrid').click(function () {
            var appType = $(this).attr('data-id');
            if (appType) {
                constant.appType2 = appType;
            }
            if (appType == 'myApp') {
                list.getAppList(detail, 'myApp', constant.category.categoryId);
            } else {
                list.getAppList(detail, constant.appType, constant.category.categoryId);
            }
        });
        //更多
        $('.recGridLink').click(function () {
            var _this = $(this);
            var appCategoryID = _this.attr('data-id');
            var appType = $('.changeTabNameCurrent').attr('data-id');

            if (appCategoryID != '' && appCategoryID != null) {
                if (appCategoryID == "home")
                { location.replace(location.href); }
                else
                { list.getAppList(detail, appType, appCategoryID); }
            }
        });

        //loading页面
        var loadingBox = $('.loadingbox');
        if (loadingBox.length === 0) {
            var loadingHtml = '';
            loadingHtml += '<div class="loadingbox">';
            loadingHtml += '<div class="overlay"></div>';
            loadingHtml += '<div class="loadingCircle"><div class="loadingCircleImg"></div></div>';
            loadingHtml += '</div>';
            $('body').append(loadingHtml);
        }

        //直接弹出一个详情层
        var hiddenAppid = $('#hiddenAppid').val();
        if (hiddenAppid) {
            detail.getAppDetail('', hiddenAppid);
        }

        //tip 提示
        $(document).on({
            mouseover: function mouseover() {
                var _this = $(this);
                if (_this.data("bindtip")) return;

                var paddingTop = parseInt(_this.css('paddingTop'));
                var offsetLeft = 30;
                var arrowLeft = 10;
                if (!paddingTop > 0) {
                    paddingTop = 0;
                    offsetLeft = 0;
                    arrowLeft = 5;
                }
                _this.MD_UI_Tooltip({
                    arrowLeft: arrowLeft, //tip箭头的左位移，可以负�
                    offsetLeft: offsetLeft, //tip的左位移，可以负�
                    offsetTop: paddingTop, //tip的上位移，可以负�
                    width: 180,
                    checkWidth: true,
                    checkHeight: true
                });
                _this.data("bindtip", true);
                _this.mouseenter();
            },
            mouseout: function mouseout() {
                $(".md_tooltip").hide();
                $(".md_tooltip").remove();
            }
        }, '.iconTip');
    };

    detail.Options = {
        relCommLoading: 0,
        score: 0,//打分
        appID: '',
        topicsAllCount: 10,
        detail: '',//应用详情
        recommendAppList: '',//用户评分列表
        myTopic: '',//我的评分
        appName: '',//应用名字
        appIcon: '',//应用图标地址
        appList: '',//应用列表
        admins: '',//管理员列表
        listLength: 0,//应用列表长度
        length: 0,//计算的长度
        rowLength: 6,//每行的长度
        allCount: 0,
        recommendApptop: 0,
        groupHtml: '',
        selectGroupHeight: '',
        type: '',//筛选条件
        viewType: 1,//列表视图(1单行2单排)
    };

    //分类选择查询列表
    detail.appCatClick = function () {
        $('.catItem').unbind("click").click(function () {
            var _this = $(this);
            var catId = _this.find('.catLink').attr('data-id');
            var appType = $('.changeTabNameCurrent').attr('data-id');

            $(".catItem").addClass('catItemChoose').find('i').addClass('icon-1xColor');
            $(".catItemChoose").removeClass('catItemCurrent');

            _this.removeClass('appCategoryHover').addClass('catItemCurrent').find('i').removeClass('icon-1xColor');

            if (!$('.mTopFixed').is(':hidden')) {
                constant.page.pageSize = 10;
            }

            if (catId != '' && catId != null) {
                if (catId == "home") {
                    location.replace(location.href);
                }
                else {
                    if (catId == 'Company' || catId == 'Person' || catId == 'SoldOut') {
                        appType = 'myApp';
                        constant.project.projectId = '';
                    }

                    if (catId == 'Company') {
                        constant.project.projectId = _this.find('.catLink').attr('project-id');;
                    }

                    list.getAppList(detail, appType, catId);
                }
            } else {
                if ($('.appCategoryMergeUl').is(":hidden")) {
                    $('.appCategoryMergeUl').show();
                } else {
                    $('.appCategoryMergeUl').hide();
                }
            }

            if ($('.mNavLog').attr('data-id') == 'caidJiantou') {
                $('.mNavLog').find('img').attr('src', '../Content/images/caidList.gif');
                $('.mNavLog').attr('data-id', 'caidList');
            } else {
                $('.mNavLog').find('img').attr('src', '../Content/images/caidJiantou.gif');
                $('.mNavLog').attr('data-id', 'caidJiantou');
            }
        });
    };

    //详情弹出层
    detail.getAppDetail = function (obj, appID) {
        if (appID) {
            detail.Options.appID = appID;
        } else {
            detail.Options.appID = obj.attr('appID');
        }

        $('.loadingbox').show();

        //手机类型
        var phoneType = 'all';
        if (/android/i.test(navigator.userAgent)) {
            phoneType = 'android';
        }
        if (/ipad|iphone|mac/i.test(navigator.userAgent)) {
            phoneType = 'iphone';
        }
        history.replaceState({}, '明道应用市场', '?appID=' + detail.Options.appID);

        require.async('./tpl/detail.html', function (detailTpl) {
            $.get('/App/Index?format=json', { AppID: detail.Options.appID }, function (data) {
                detail.Options.detail = data.AppDetails;
                if (detail.Options.detail) {
                    detail.Options.recommendAppList = data.RecommendAppList;
                    detail.Options.topics = data.Topics;
                    detail.Options.topicsAllCount = data.topicsAllCount;
                    detail.Options.myTopic = data.MyTopic;
                    constant.user = data.User;
                    constant.project.projects = data.ProjectList;

                    detail.Options.appIcon = detail.Options.detail.AvatarFull;
                    detail.Options.appName = detail.Options.detail.AppName;

                    if (detail.Options.myTopic) {
                        detail.Options.score = detail.Options.myTopic.Score;
                    }
                    var detailHtml = doT.template(detailTpl)({
                        appdetail: detail.Options.detail,
                        recommendAppList: detail.Options.recommendAppList,
                        topics: detail.Options.topics,
                        topicsAllCount: detail.Options.topicsAllCount,
                        myTopic: detail.Options.myTopic,
                        user: constant.user,
                        phoneType: phoneType,
                        projects: constant.project.projects
                    });
                    $('.loadingbox').hide();

                    var remindbox = $('.remindbox');
                    var container = remindbox.find('.container');
                    remindbox.hide();
                    container.find('.content').html("");

                    common.showAppDetailFrom(detailHtml, function (lightbox) {
                    });

                    //绑定事件
                    detail.slides();//详情介绍图片
                    detail.myComment();//我的评分
                    detail.myCommentCommit();//提交评分

                    //detail.appInstall();//安装推荐按钮
                    $('.detailsPage .appButton').click(function () {
                        if (phoneType != 'all' && detail.Options.detail.IsWeb == 'false') {
                            common.Commit('该应用未提供移动适配方案，请到PC网页进行安装和使用', 2);
                        } else {
                            var _this = $(this);
                            detail.appInstall(_this);
                        }
                    });
                    detail.moreComment();//更多评论
                    detail.manageButton();

                    //弹窗滚动
                    $('.lightbox').scroll(function () {
                        var obj = $('.container');
                        var scrollTop = $(this)[0].scrollTop;
                        var recommendApp = $('.container').offset().top;

                        //if (scrollTop > 630) {
                        //    var detailLeft = $('.detailLeft').width();
                        //    obj.find('.recommendApp').removeAttr("style");
                        //    obj.find('.recommendApp').css({ 'position': 'absolute', 'left': detailLeft, 'padding-top': scrollTop - 160 });
                        //} else {
                        //    var detailLeft = $('.detailLeft').width();
                        //    obj.find('.recommendApp').removeAttr("style");
                        //    obj.find('.recommendApp').css({ 'position': 'absolute', 'left': detailLeft, 'padding-top': 0 });
                        //}
                        //if (scrollTop == 0) {
                        //    var detailLeft = $('.detailLeft').width();
                        //    obj.find('.recommendApp').removeAttr("style");
                        //    obj.find('.recommendApp').css({ 'position': 'absolute', 'left': detailLeft, 'padding-top': scrollTop });
                        //}
                    });

                } else {
                    $('.loadingbox').hide();
                    //$('.lightbox .content').html('');
                    //$('.lightbox .content').append(detailHtml);;
                    var remindbox = $('.remindbox');
                    var container = remindbox.find('.container');
                    remindbox.hide();
                    container.find('.content').html("");
                    common.Commit("找不到该应用！", 2);
                }
            });
        });
    };

    //图片播放插件
    detail.slides = function () {
        //绑定图片
        $('#slides').slidesjs({
            width: 630,
            height: 400,
            play: {
                active: true,
                auto: true,
                interval: 3000,
                swap: true
            },
            callback: {
                loaded: function (num) {
                    var $img = $('.slidesjs-control img').eq(num - 1);

                    var imgObj = new Image();
                    imgObj.src = $img.attr('src');

                    if (imgObj.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
                        detail.imgOnload($img, imgObj);
                        return;
                    }

                    $img.load(function () {
                        detail.imgOnload($img, imgObj);
                    });
                },
                start: function (num) {
                    var $img = $('.slidesjs-control img').eq(num - 1);

                    var imgObj = new Image();
                    imgObj.src = $img.attr('src');

                    if (imgObj.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
                        detail.imgOnload($img, imgObj);
                        return;
                    }

                    $img.load(function () {
                        detail.imgOnload($img, imgObj);
                    });
                }
            }
        });
    };

    //图片加载
    detail.imgOnload = function ($this, imgObj) {
        var imgWidth = imgObj.width;
        var imgHeight = imgObj.height;
        var top = 0;
        var left = 0;

        var imgFrameWidth = $('.appDetail .appImages').width();
        var imgFrameHeight = 400;
        if (imgFrameWidth < 630) {
            imgFrameHeight = 200;
        }

        if (imgWidth >= imgFrameWidth && (imgWidth / imgFrameWidth) >= (imgHeight / imgFrameHeight)) {
            imgHeight = imgHeight / imgWidth * imgFrameWidth;
            imgWidth = imgFrameWidth;
            if (imgHeight < imgFrameHeight) {
                top = (imgFrameHeight - imgHeight) / 2;
            }
        }
        else if (imgHeight > imgFrameHeight) {
            imgWidth = imgWidth / imgHeight * imgFrameHeight;
            imgHeight = imgFrameHeight;
            if (imgWidth < imgFrameWidth) {
                left = (imgFrameWidth - imgWidth) / 2;
            }
        }
        else {
            top = (imgFrameHeight - imgHeight) / 2;
            left = (imgFrameWidth - imgWidth) / 2;
        }

        $this.css({
            width: imgWidth,
            height: imgHeight,
            "margin-top": top + 'px',
            "margin-left": left + 'px'
        });
    };

    //评分事件
    detail.myComment = function () {
        //评分图标移动
        var myCommentNotice = $('.myCommentNotice');
        var myCommentMsg = $('.myCommentMsg');
        if (myCommentNotice.length === 0 && myCommentMsg.length === 0) {
            detail.myCommentMouseOver();
        } else if (myCommentMsg.length > 0) {
            detail.myCommentUpdate(myCommentMsg);
        }
    };

    //修改评分
    detail.myCommentUpdate = function (myCommentMsg) {
        $('.myCommentUpdate').click(function () {
            detail.myCommentMouseOver();
            $(this).hide();
            $('.myCommentMsg').hide();
            $('.myComment').show();
            $('#myCommentTextarea').val(myCommentMsg.text());
        });
    };

    //评分移动和移动事件
    detail.myCommentMouseOver = function () {
        $('.appTopicsStar .topicStarSize').mouseover(function () {
            var score = $(this).attr("score");
            var n = new Number(score) + 1;
            if (score != null) {
                for (var m = 0; m < n; m++) {
                    $('#score' + m).removeClass('topicStarWhite');
                    $('#score' + m).addClass('topicStarBlue');
                }
            }
        }).mouseout(function () {
            $('.appTopicsStar .topicStarSize').removeClass('topicStarBlue');
            $('.appTopicsStar .topicStarSize').addClass('topicStarWhite');
        });

        //评分框
        $('.appTopicsStar .topicStarSize').click(function () {
            $('.appTopicsStar .topicStarSize').unbind('mouseout');
            $('.appTopicsStar .topicStarSize').unbind('mouseover');
            $('.appTopicsStar .topicStarSize').removeClass('topicStarBlue');
            $('.appTopicsStar .topicStarSize').addClass('topicStarWhite');
            var score = $(this).attr("score");
            var n = new Number(score) + 1;
            detail.Options.score = n * 2;
            if (score != null) {
                for (var m = 0; m < n; m++) {
                    $('#score' + m).removeClass('topicStarWhite');
                    $('#score' + m).addClass('topicStarBlue');
                }
            }
            $('.myComment').show();
        });

    };

    //提交评分
    detail.myCommentCommit = function () {
        //评分提交
        $('.myCommentCommit').click(function () {
            var content = $('#myCommentTextarea').val().trim();
            if (!content) return common.Commit("请输入评价内容", 2);
            if (!detail.Options.score) return common.Commit("请评分", 2);
            $.post('/Topic/Add?format=json', { AppID: detail.Options.appID, Content: content, Score: detail.Options.score }, function (data) {
                if (data.result) {
                    common.Commit("评论成功");
                    $('.myComment').hide();

                    var myCommentMsg = $('.myCommentMsg');
                    if (myCommentMsg.length === 0) {
                        $('.appTopicsStar').append('<div class="myCommentMsg"></div>');
                    }
                    $('.myCommentMsg').show();
                    $('.myCommentMsg').text(content);
                    $('.myCommentMsg').append('<div class="myCommentUpdate"><div class="myCommentUpdateImg"></div><span style="padding-left:10px;">修改</span></div>');
                    detail.myCommentUpdate($('.myCommentMsg'));
                    $('.topicStarSize').unbind();
                } else {
                    common.Commit("评论失败，请重试", 2);
                }
            });

        });
    };

    //安装和推荐
    detail.appInstall = function (_this) {
        //安装按钮点击
        var action = _this.attr('action');
        if (action === 'install') {
            detail.appInstallPersonal(_this);
        }
        else if (action === 'recommend') {
            constant.project.projectId = _this.attr('projectid');

            detail.recommandAdmin(_this);
        }
        else if (action === 'login') {
            location.href = "https://www.mingdao.com/login.htm?ReturnUrl=https://app.mingdao.com";
        }
        else if (action == 'company') {
            constant.project.projectId = _this.attr('projectid');

            detail.Config(_this);
        }
        else if (action == 'delete') {
            detail.UnInstall(_this);
        }
        else if (action == 'topic') {
            detail.AddTopic(_this);
        }
        else if (action == 'open') {
            var homeUrl = _this.attr('homeUrl');
            window.open(homeUrl);
        } else if (action == 'detail') {
            detail.getAppDetail('', _this.closest('.listPageAppDetail').find('.appGridHover').attr('appid'));
        }
    };

    //个人应用直接安装
    detail.appInstallPersonal = function (_this) {
        var $installLoading = $(".installLoading div");

        var installInfo = {
            avatar: detail.Options.appIcon,
            name: detail.Options.appName,
            appID: detail.Options.appID,
            homeUrl: '',
            message: ''
        }
        $installLoading.show().animate({ width: "70%" }, 1000, function () { });

        require.async('./tpl/install.html', function (installTpl) {
            $.post('/App/Install?format=json', { appid: detail.Options.appID }, function (data) {
                if (data.result) {
                    $installLoading.animate({ width: "100%" }, 300, function () {
                        setTimeout(function () {
                            $installLoading.fadeOut(500).css('width', '0');
                        }, 3000);
                        installInfo.message = '应用安装成功';
                        installInfo.homeUrl = data.app.HomeUrl;
                        var html = doT.template(installTpl)(installInfo);
                        var installBox = $('.installBox');
                        if (installBox.length === 0) {
                            $('body').append('<div class="installBox"></div>');
                        }
                        $('.installBox').append(html);
                        $('.installBox').show();
                        $(".installForm").animate({ right: "15px" }, 500, function () {
                            $(".installForm .appCancle").click(function () {
                                $(".installForm").animate({ right: "-300px" }, 500, function () {
                                    $('.installBox').html('');
                                    $('.installBox').hide();
                                });
                            });
                        });
                        _this.attr('action', '');
                        _this.text('已安装');
                        detail.myCommentMouseOver();
                        $('.myCommentNotice').hide();
                    });
                } else {
                    $installLoading.animate({ width: "90%" }, 200, function () {
                        setTimeout(function () {
                            $installLoading.fadeOut(500).css('width', '0');
                        }, 3000);
                        if (data.error) {
                            installInfo.message = data.error;
                        } else {
                            installInfo.message = '应用安装失败';
                        }
                        common.Commit(data.error, '2');
                        var html = doT.template(installTpl)(installInfo);
                        var installBox = $('.installBox');
                        if (installBox.length === 0) {
                            $('body').append('<div class="installBox"></div>');
                        }
                        $('.installBox').append(html);
                        $('.installBox').show();
                        $(".installForm").animate({ right: "15px" }, 500, function () {
                            $(".installForm .appCancle").click(function () {
                                $('.installBox').html('');
                                $('.installBox').hide();
                            });

                        });
                    });
                }
            });
        });
    }

    //推荐管理员
    detail.recommandAdmin = function (_this) {
        require.async('./tpl/recommend.html', function (remTpl) {
            $.get('/Project/Admin?projectid=' + constant.project.projectId, {}, function (data) {
                detail.Options.admins = data;
                var parent = _this.parent();
                if (!detail.Options.appIcon) {
                    detail.Options.appIcon = parent.find('.appGridHover').find('.appGridImg').attr('src');
                }
                var suggestInfo = {
                    admins: detail.Options.admins,
                    avatar: detail.Options.appIcon,
                    name: detail.Options.appName,
                    appID: detail.Options.appID,
                    message: '推荐成功'
                }
                var html = doT.template(remTpl)(suggestInfo);

                var recommendbox = $('.recommendbox');
                if (recommendbox.length === 0) {
                    $('body').append('<div class="recommendbox"><div class="overlay"></div><div class="recommendDetail"></div></div>');
                }
                $('.recommendDetail').append(html);

                var recommendDialog = $('.recommendDetail .recommendDialog');
                var left = (($(window).width() - recommendDialog.width()) / 2);
                left = left < 0 ? 0 : left;
                recommendDialog.css('left', left + 'px').css('top', 100 + 'px');
                $('.recommendbox').show();
                //推荐取消
                $('.recommendbox .cancelButton').click(function () {
                    $('.recommendbox').hide();
                    $('.recommendbox .recommendDetail').html('');
                });
                //推荐提交
                $('.recommendbox .submitButton').click(function () {
                    var toAdmins = [];
                    var items = $('.recommendbox').find('.managerItem');
                    for (var i = 0; i < items.length; i++) {
                        var item = $(items[i]);
                        if (item.find('.managerCheckbox').prop('checked')) {
                            toAdmins.push(item.data('id'));
                        }
                    }
                    //var reason = $('.recommendbox').find('#recommendReason').html();
                    var reason = $('.recommendbox').find('#recommendReason').val();
                    var message = '我觉得应用 ' + detail.Options.appName + ' 很赞，';

                    if (reason && reason != "填写推荐理由！") {
                        message += reason;
                        if (toAdmins.length == 0) {
                            $('.recommendbox .submitTitle').show();
                            $('.recommendbox .warnMsg').text('需要选择管理员');
                        } else {
                            $.post('/App/Suggest?format=json', { Admins: toAdmins.join(','), Message: message }, function (data) {
                                if (data) {
                                    common.Commit('推荐成功！');
                                }
                                else {
                                    common.Commit('推荐失败！', 3);
                                }
                            });
                        }
                    } else {
                        $('.recommendbox .submitTitle').show();
                        $('.recommendbox .warnMsg').text('需要填写推荐理由');
                    }
                });

                //推荐取消
                $('.recommendbox .overlay').click(function (e) {
                    var target = $(e.target);
                    if (target.closest(".recommendbox .recommendDetail").length == 0) {
                        $('.recommendbox').hide();
                        $('.recommendbox .recommendDetail').html('');
                    }
                });

                $('#recommendReason').focus(function () {
                    if ($(this)) {
                        var msg = $(this).html();
                        if (msg == "填写推荐理由！") {
                            $(this).html('');
                        }
                    }
                }).blur(function () {
                    var msg = $(this).html();
                    if (msg == "") {
                        $(this).html('填写推荐理由！');
                    }
                });
            });
        });
    };

    //更多评分
    detail.moreComment = function () {
        $('.appCommentsMore').click(function () {
            $('.appCommentsMore').unbind();

            require.async('./tpl/topic.html', function (topicTpl) {

                $.get('/Topic/Index/' + detail.Options.appID, { pagesize: detail.Options.topicsAllCount, format: 'json' }, function (data) {
                    detail.Options.topics = data.topicList;
                    constant.user = data.user;
                    var topicRowHtml = doT.template(topicTpl)({
                        topics: detail.Options.topics,
                        user: constant.user
                    });
                    $('.appComments').html('');
                    $('.appComments').html(topicRowHtml);
                });

            });
        });
    };

    //评论点赞
    detail.commentLike = function () {
        $(document).on('click', '.commentLikeWhite', function () {
            var _this = $(this);
            var topicID = _this.attr('topicID')
            $.get('/Topic/Like', { topicID: topicID, format: 'json' }, function (data) {
                if (data) {
                    common.Commit('已赞');
                    _this.removeClass('commentLikeWhite').addClass('commentLikeBlue').attr('action', 'unlike');
                    var num = parseInt(_this.parent().find('.commentLikeNum').text());
                    if (num) {
                        num++;
                        _this.parent().find('.commentLikeNum').text(num);
                    } else {
                        num = 1;
                        _this.parent().find('.commentLikeNum').text(num);
                    }
                } else {
                    common.Commit('失败', 2);
                }
            });
        });
    };

    //评论取消点赞
    detail.commentUnlike = function () {
        $(document).on('click', '.commentLikeBlue', function () {
            var _this = $(this);
            var topicID = _this.attr('topicID');
            var action = _this.attr('action');
            if (action === 'unlike') {
                $.get('/Topic/unLike', { topicID: topicID, format: 'json' }, function (data) {
                    if (data) {
                        common.Commit('取消成功');
                        _this.removeClass('commentLikeBlue').addClass('commentLikeWhite').attr('action', 'like');
                        var num = parseInt(_this.parent().find('.commentLikeNum').text());
                        if (num) {
                            num--;
                            _this.parent().find('.commentLikeNum').text(num);
                        } else {
                            num = '';
                            _this.parent().find('.commentLikeNum').text(num);
                        }
                    } else {
                        common.Commit('失败', 2);
                    }
                });
            } else if (action === 'like') {
                $.get('/Topic/Like', { topicID: topicID, format: 'json' }, function (data) {
                    if (data) {
                        common.Commit('取消成功');
                        _this.removeClass('commentLikeWhite').addClass('commentLikeBlue').attr('action', 'unlike');
                        var num = parseInt(_this.parent().find('.commentLikeNum').text());
                        if (num) {
                            num--;
                            _this.parent().find('.commentLikeNum').text(num);
                        } else {
                            num = '';
                            _this.parent().find('.commentLikeNum').text(num);
                        }
                    } else {
                        common.Commit('取消失败', 2);
                    }
                });
            }
        });
    };

    //树形列表
    detail.appListTree = function () {
        $('#changeViewShu').click(function () {
            detail.Options.viewType = 2;
            list.getAppList(detail, constant.appType, constant.category.categoryId, 1);
            //绑定事件
        });
    };

    //单行列表
    detail.appListSingle = function () {
        $('#changeViewHeng').click(function () {
            detail.Options.viewType = 1;
            list.getAppList(detail, constant.appType, constant.category.categoryId, 1);
        });
    };

    //管理按钮
    var manageTimer;
    detail.manageButton = function () {
        $('.appManageButton').hover(function (e) {
            e.preventDefault();
            clearTimeout(manageTimer);
            var list = $(this).parent().find('.appManageActionList');
            list.css('display', 'inline-block').hover(function (e) {
                clearTimeout(manageTimer);
            }, function (e) {
                $(this).hide();
            });
        }, function (e) {
            e.preventDefault();
            var list = $(this).parent().find('.appManageActionList');
            manageTimer = setTimeout(function (e) { list.hide(); }, 300);
        });
    };

    //单行列表安装推荐管理员
    detail.appListSingleRecommand = function () {
        //绑定事件赋值一系列
        $('.listPageAppDetail .appAction').click(function () {
            var _this = $(this);
            var _thisParent = _this.parent().parent().parent();
            detail.Options.appID = _thisParent.parent().find('.appGridHover').attr('appid');
            var parent = _thisParent.parent();
            detail.Options.appName = parent.find('.propertyFrame').find('.appName').text();
            detail.Options.appIcon = parent.find('.appGridIcon').find('.appGridImg').attr('src');

            detail.appInstall(_this);
        });
    };

    //瀑布流
    detail.QueueFadeIn = function () {
        var el = $("#appListPage .listPageAppDetail,#appListPage .appGridNext,#appListPage .appGridTabLast").eq(detail.Options.relCommLoading);
        el.fadeIn(100, function () {
            detail.Options.relCommLoading++;
            detail.QueueFadeIn();
        });
    };

    //我的应用评价
    detail.AddTopic = function (_this) {
        var _this = _this.parent().parent().parent();
        var categories = _this.parent().find('.propertyFrame').find('.appCategory').find('span').text();

        require.async('./tpl/addtopic.html', function (addtopicTpl) {

            $.get('/Topic/My?appid=' + detail.Options.appID, function (data) {
                var topicMessage = '';
                var indexScore = 0;
                if (data.result) {
                    topicMessage = data.topic.Message;
                    detail.Options.score = data.topic.Score;
                } else {
                    topicMessage = '';
                    detail.Options.score = 0;
                }
                var addTopic = doT.template(addtopicTpl)({
                    appIcon: detail.Options.appIcon,
                    appName: detail.Options.appName,
                    categories: categories,
                    topicMessage: topicMessage,
                    score: detail.Options.score
                });
                common.showRemindbox(addTopic);
                detail.myCommentMouseOver();

                $('.myCommentCommit').click(function () {
                    var content = $('.myCommentTextarea').val().trim();
                    if (!content) {
                        $('.addTopicBox .submitTitle').show();
                        $('.addTopicBox .warnMsg').text('需要填写评论理由');
                    }
                    if (!detail.Options.score) {
                        $('.recommendbox .submitTitle').show();
                        $('.addTopicBox .warnMsg').text('需要选择评论分数');
                    }
                    $.post('/Topic/Add?format=json', { AppID: detail.Options.appID, Content: content, Score: detail.Options.score }, function (data) {
                        if (data.result) {
                            common.Commit("评论成功");
                        } else {
                            common.Commit("评论失败，请重试", 2);
                        }
                    });
                });
            });

        });
    };

    //我的应用卸载
    detail.UnInstall = function (_this) {
        var projectId = _this.attr('projectid');

        if (!projectId) {
            projectId = constant.project.projectId
        }

        var _this = _this.parent().parent().parent();
        var categories = _this.parent().find('.propertyFrame').find('.appCategory').find('span').text();

        require.async(['./tpl/cancelinstall.html', './tpl/uninstall.html'], function (cancelTpl, uninstallTpl) {

            var cancelInstall = doT.template(cancelTpl)({
                appIcon: detail.Options.appIcon,
                appName: detail.Options.appName,
                categories: categories
            });
            common.showRemindbox(cancelInstall);

            $('.cancelInstallBox .submitButton').click(function () {
                $.post('/App/UnInstall?format=json', { appID: detail.Options.appID, projectid: projectId }, function (data) {
                    if (data.result) {
                        $(".installLoading div").css('width', '100%');
                        $(".installLoading div").show();
                        $(".installLoading div").animate({ width: "0" }, 1000, function () {
                            setTimeout(function () {
                                $(".installLoading div").fadeOut(500);
                                $(".installLoading div").css('width', '0');
                            }, 3000);
                            var suggestInfo = {
                                avatar: detail.Options.appIcon,
                                name: detail.Options.appName,
                                appID: detail.Options.appID,
                                message: '卸载成功'
                            }
                            var html = doT.template(uninstallTpl)(suggestInfo);
                            var installBox = $('.installBox');
                            if (installBox.length === 0) {
                                $('body').append('<div class="installBox"></div>');
                            }
                            $('.installBox').append(html);
                            $('.installBox').show();
                            $('#div_' + detail.Options.appID).prev().remove();
                            $('#div_' + detail.Options.appID).remove();
                            $(".installForm").animate({ right: "15px" }, 500, function () {
                                $(".installForm .appRecommendCancle").click(function () {
                                    $(".installForm").animate({ right: "-300px" }, 500, function () {
                                        $('.installBox').html('');
                                        $('.installBox').hide();
                                    });
                                });
                            });
                        });
                        $('.remindbox').hide();
                        $('.remindbox .cancelInstallDetail').html('');
                    } else {
                        common.Commit('卸载失败', '2');
                    }
                });
            });

            //卸载取消
            $('.cancelInstallBox .cancelButton').click(function () {
                $('.remindbox').hide();
                $('.remindbox .cancelInstallDetail').html('');
            });
        });
    };

    //企业应用配置弹层
    detail.Config = function (_this) {
        require.async(['./tpl/config.html', './tpl/install.html'], function (configTpl, installTpl) {

            $.get('/App/Config', { appid: detail.Options.appID, projectid: constant.project.projectId, format: 'json' }, function (data) {
                if (data.result) {
                    var error = data.error;
                    common.Commit(error, '2');
                } else {
                    var admins = data.Admins;
                    var groups = data.Groups;

                    var config = doT.template(configTpl)({
                        appIcon: detail.Options.appIcon,
                        appName: detail.Options.appName,
                        admins: admins,
                        groups: groups,
                        user: constant.user
                    });
                    common.showConfigbox(config);
                    if (groups && groups.length > 0) {
                        $('.selectGroupRadio').attr("checked", false);
                        $('.selectGroupRadioGroups').prop("checked", true);
                        $('#partGroupsRadio').show();
                    }

                    //添加管理员弹层
                    $('.appConfigDetail .addAdminButton').click(function () {
                        var configbox = $('.configbox .container').css('top');
                        //$('.configbox .container').animate({ top: 30 }, 500, function () {
                        //    detail.getAdminBox(remindboxTop);
                        //});
                        detail.getAdminBox(configbox);
                    });
                    //添加群组
                    $('.appConfigDetail #partGroupsRadio').click(function () {
                        detail.selectGroup();
                    });
                    //提交配置安装
                    $('.appConfigDetail .submitButton').click(function () {
                        var groups = [];
                        if (!$('#allGroupsRadio').is(':checked')) {
                            var groupsItems = $('.selectedGroupList .selectedGroupItem');
                            for (var i = 0; i < groupsItems.length; i++) {
                                groups.push($(groupsItems[i]).data('id'));
                            }
                        }
                        var admins = [];
                        var adminItems = $('.addedAdminList .addedAdminItem');
                        for (var i = 0; i < adminItems.length; i++) {
                            admins.push($(adminItems[i]).data('id'));
                        }
                        $.post('/App/Config?format=json', {
                            appid: detail.Options.appID,
                            projectid: constant.project.projectId,
                            CustomName: detail.Options.appName,
                            GroupIDs: groups.join(','),
                            AdminIDs: admins.join(',')
                        }, function (data) {
                            if (!data.result) {
                                data.error ? common.Commit(data.error) : common.Commit('安装失败，请重试');
                            }
                            else {
                                if (data.configtype == "config") {
                                    common.Commit("设置成功！");
                                } else {
                                    var installInfo = {
                                        avatar: detail.Options.appIcon,
                                        name: detail.Options.appName,
                                        appID: detail.Options.appID,
                                        message: ''
                                    }
                                    $(".installLoading div").show();
                                    $(".installLoading div").animate({ width: "100%" }, 600, function () {
                                        setTimeout(function () {
                                            $(".installLoading div").fadeOut(500);
                                            $(".installLoading div").css('width', '0');
                                        }, 3000);
                                        installInfo.message = '应用安装成功';
                                        installInfo.homeUrl = data.app.HomeUrl;
                                        var html = doT.template(installTpl)(installInfo);
                                        var installBox = $('.installBox');
                                        if (installBox.length === 0) {
                                            $('body').append('<div class="installBox"></div>');
                                        }
                                        $('.installBox').append(html);
                                        $('.installBox').show();
                                        $(".installForm").animate({ right: "15px" }, 1000, function () {
                                            $(".installForm .appCancle").click(function () {
                                                $(".installForm").animate({ right: "-300px" }, 500, function () {
                                                    $('.installBox').html('');
                                                    $('.installBox').hide();
                                                });
                                            });
                                        });
                                        var detailsPage = $('.detailsPage');
                                        detailsPage.find('.appApplyButton').attr('action', 'company');
                                        detailsPage.find('.appApplyButton').text('管理');
                                        $('#div_' + detail.Options.appID).find('.appApplyButton').text('管理');
                                        detail.myCommentMouseOver();
                                        $('.myCommentNotice').hide();
                                    });
                                }
                            }
                        });
                    });

                    //关闭
                    $('.appConfigDetail .cancelButton').click(function () {
                        var configbox = $('.configbox');
                        configbox.hide();
                        container.find('.content').html("");
                    });
                    detail.checkGroupButtom();
                    detail.initDeleteLink();
                }

            });

        });
    };

    //添加管理员弹出层
    detail.getAdminBox = function (remindboxTop) {
        var html = '<div class="configAdminForm"><div class="configAdminDetail">';
        html += '<label class="addAdminLink" for="addAdminCheckbox">+添加管理员</label>';
        html += '<input type="checkbox" class="addAdminCheckbox" id="addAdminCheckbox">';
        html += '<input type="text" class="addAdminInput" placeholder="输入同事姓名或Email..."></div><div style="height:10px;"></div></div>';
        common.showConfigAdminbox(html, remindboxTop);
        detail.selectUsers();
    };

    //用户查询
    detail.selectUsers = function () {
        var input = $('.addAdminInput');
        $.widget('custom.adminAutoComplete', $.ui.autocomplete, {
            _renderItem: function (ul, item) {
                var name = item.label.split('\t\t\t')[0];
                var email = item.label.split('\t\t\t')[1];
                var avatar = item.label.split('\t\t\t')[2];
                var li = $('<li>').addClass('adminAutocompleteItem').attr('id', 'li_' + item.value);
                li.data('item.autocomplete', item)
                var a = $('<a>').addClass('adminAutocompleteLink');
                var userAvatar = $('<div>').addClass('userAvatar');
                userAvatar.append('<img src=' + avatar + ' class="userIcon">');
                var nameDiv = $('<div>').addClass('nameDiv');
                nameDiv.text(name);
                a.append(userAvatar).append(nameDiv);
                a.appendTo(li);
                li.appendTo(ul);
                $('.configAdminDetail').append(ul);
                return li;
            }
        });

        input.adminAutoComplete({
            source: function (request, response) {
                var keywords = request.term;
                $.get('/Project/User?format=json&keywords=' + keywords + '&projectid=' + constant.project.projectId, function (data) {
                    var result = [];
                    for (var i = 0; i < data.length; i++) {
                        var user = data[i];
                        result.push({
                            label: user.name + '\t\t\t' + user.email + '\t\t\t' + user.avatar,
                            value: user.id
                        });
                    }
                    response(result);
                });
            },
            select: function (event, ui) {
                event.preventDefault();
                //console.log(ui);
                if (ui.item) {
                    //input.val('');
                    //input[0].focus();
                    //input[0].selectionStart = 0;

                    var existingItems = $('.addedAdminItem');
                    for (var i = 0; i < existingItems.length; i++) {
                        if ($(existingItems[i]).data('id') == ui.item.value) {
                            common.Commit('已选择', '2');
                            return;
                        }
                    }
                    $('.addedAdminList').append($('<li class="addedAdminItem" data-id="' + ui.item.value + '"><span><img src="' + ui.item.label.split('\t\t\t')[2] + '" alt="" class="groupAvatar"></span>' +
                       '<span class="addedAdminName">' + ui.item.label.split('\t\t\t')[0] + '</span> <span class="addedAdminDeleteLink">×</span></li>'));
                    detail.initDeleteLink();
                }
            },
            focus: function (event, ui) {
                event.preventDefault();
                //console.log(ui);
                if (ui.item) {
                    $(".adminAutocompleteItem").css("background", "");
                    //$("div:contains('" + ui.item.label.split('\t\t\t')[1] + "')").parent().css("background", "#c6d9e4");
                    $('#li_' + ui.item.value + '').css("background", "#c6d9e4");
                    input.val(ui.item.label.split('\t\t\t')[0]);
                }
            },
        });
    };

    //群组查找
    detail.selectGroup = function () {
        var html = '<div class="configAdminForm"><div class="configAdminDetail">';
        html += '<label class="addAdminLink" for="addAdminCheckbox">+添加群组</label>';
        html += '<input type="checkbox" class="addAdminCheckbox" id="addAdminCheckbox">';
        html += '<input type="text" class="addAdminInput lbSearchInput" placeholder="搜索群组"></div><div style="height:10px;"></div></div>';
        common.showConfigAdminbox(html);
        if (detail.Options.groupHtml) {
            $('.configAdminDetail').append(detail.Options.groupHtml);
            detail.selsectGroupBind();

        } else {
            detail.getGroups();
        }
    };

    //获取群组
    detail.getGroups = function () {
        var allGroupsDict = {}, selectedGroupsDict = {}, remainGroupsDict = {};
        $.get('/Project/Group?format=json&projectid=' + constant.project.projectId, function (groups) {
            $.each(groups, function (index, item) {
                allGroupsDict[item.id] = item;
                if (!selectedGroupsDict[item.id]) {
                    remainGroupsDict[item.id] = item;
                }
            });
            var groupHtml = '<ul class="allGroupsList">';
            for (var x in remainGroupsDict) {
                groupHtml += '   <li class="allGroupsItem" data-id="' + remainGroupsDict[x].id + '" title="' + remainGroupsDict[x].name + '">';
                groupHtml += '   <img src="' + remainGroupsDict[x].avatar + '" alt="' + remainGroupsDict[x].name + '" class="groupAvatar">';
                groupHtml += '    <div class="groupName">' + remainGroupsDict[x].name + '</div>';
                groupHtml += '   </li>';
            }
            groupHtml += '   </ul>';
            $('.configAdminDetail').append(groupHtml);

            detail.Options.groupHtml = groupHtml

            detail.selsectGroupBind();
        });

    };

    //绑定群组搜索结果事件
    detail.selsectGroupBind = function () {
        var remainGroupsList = $('.configAdminForm').find('.allGroupsList');
        $.each(remainGroupsList.find('.allGroupsItem'), function (index, value) {
            var name = $(value).find('.groupName').toPinyin();
            $(value).data('pinyin', name.toLowerCase());
        });

        $('.configAdminForm').find('.lbSearchInput').keyup(function (e) {
            var keyword = $('<span>' + $('.configAdminForm').find('.lbSearchInput').val() + '</span>').toPinyin().toLowerCase();
            console.log(keyword);
            var remainGroupsList = $('.configAdminForm').find('.allGroupsItem');

            for (var i = 0; i < remainGroupsList.length; i++) {
                var item = $(remainGroupsList[i]);
                var py = item.data('pinyin');
                if (py.indexOf(keyword) < 0) { item.hide(); }
                else { item.show(); }
            }
        });

        $('.allGroupsList .allGroupsItem').click(function () {
            var groupID = $(this).attr('data-id');
            var groupName = $(this).find('.groupName').text();
            var groupAvatar = $(this).find('.groupAvatar').attr('src');
            var existingItems = $('.selectedGroups .selectedGroupItem');
            for (var i = 0; i < existingItems.length; i++) {
                if ($(existingItems[i]).data('id') == groupID) {
                    common.Commit('已选择', '2');
                    return;
                }
            }
            $('.selectedGroupList').append($('<li class="selectedGroupItem" data-id="' + groupID + '"><span><img src="' + groupAvatar + '" alt="战略研究wwwwwwwwwwww" class="groupAvatar"></span> ' +
               '<span class="selectedGroupName">' + groupName + '</span> <span class="addedAdminDeleteLink">×</span></li>'));
            detail.initDeleteLink();
            if (detail.Options.selectGroupHeight) {
                if ($('.appConfigDetail .selectedGroups').height() > detail.Options.selectGroupHeight) {
                    detail.Options.selectGroupHeight = $('.appConfigDetail .selectedGroups').height();
                    var top = $('.configAdminbox .container').offset().top;
                    $('.configAdminbox .container').css('top', top + 40);
                }
            } else {
                detail.Options.selectGroupHeight = $('.appConfigDetail .selectedGroups').height();
                var top = $('.configAdminbox .container').offset().top;
                $('.configAdminbox .container').css('top', top + 40);
            }
        });
    };

    //移除添加的
    detail.initDeleteLink = function () {
        $('.addedAdminDeleteLink').click(function (e) {
            $(this).parent().remove();
        });
    };

    //全部员工和群组选择
    detail.checkGroupButtom = function () {
        $('.selectGroupRadio').click(function () {
            $('.selectGroupRadio').attr("checked", false);
            $(this).prop("checked", true);
            if ($(this).val() === 'select') {
                $('#partGroupsRadio').show();
                $('.appConfigDetail .selectedGroups').show();
            } else {
                $('#partGroupsRadio').hide();
                $('.appConfigDetail .selectedGroups').hide();
            }
        });
    };

    module.exports = detail;
});