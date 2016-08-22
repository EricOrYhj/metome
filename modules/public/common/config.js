define(function (require, module, exports) {

    var Config = {
        // 头像尺寸
        AVATAR_24: "?imageView2/1/w/60/h/60/q/90",
        AVATAR_48: "?imageView2/1/w/60/h/60/q/90",
        AVATAR_100: "?imageView2/1/w/60/h/60/q/90",

        placeholderAvatar: './resource/images/metome_avatar.png',
        // 全局的辅助图
        avatarImgPath: "./resource/images/user.png", // 头像默认图片
        errorImgPath: "./resource/images/chat_error.png", // 图片加载错误时显示的图片
        placeholderImgPath: "./resource/images/chat_placeholder.png", // 图片加载中时显示的默认图片
        ajaxLoadingImg: "./resource/images/chat_ajax_loading.gif",

        PREVIEW_IMG: "?imageView2/2/w/800", // 图片预览的的大小配置，依据的是青牛的api
    };

    window.Config = Config;

    module.exports = Config;
});