define(function (require, exports, module) {
  var Constant = {};
  /**
   * 用户类别
   * @type {number}
   */
  Constant.USERTYPE_PERSONAL = 1;
  Constant.USERTYPE_GROUP = 2;

  /**
   * 文件类型
   * @type {number}
   */
  Constant.FILETYPE_PIC = 1; // 图片
  Constant.FILETYPE_FILE = 2; // 文件
  Constant.FILETYPE_AUDIO = 3; // 音频
  Constant.FILETYPE_VIDEO = 4; // 视频

  /**
   * 消息类型
   * @type {number}
   */
  Constant.MSGTYPE_TEXT = 1;    //文本消息
  Constant.MSGTYPE_PIC = 2;     //图片消息
  Constant.MSGTYPE_FILE = 3;      //文件消息
  Constant.MSGTYPE_AUDIO = 4;     //音频消息
  Constant.MSGTYPE_VIDEO = 5;     //视频消息
  Constant.MSGTYPE_EMOTION = 9;     //图片类型的表情消息

  /**
   * 键盘按键映射
   * @type {{ESC: number, ENTER: number}}
   */
  Constant.KEYMAP = {
    ESC: 27,
    ENTER: 13,
    UP: 38,
    DOWN: 40,
  };

  Constant.GROUPUPDATE = {
    ALL: 1,
    NAME: 2,
    AVATAR: 3,
    COUNT: 4,
  };

  window.Constant = Constant;

  module.exports = Constant;
});
