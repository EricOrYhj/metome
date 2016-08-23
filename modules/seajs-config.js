/* eslint-disable max-len */
seajs.config({
    base: '/dist/',
    preload: [
      Function.prototype.bind ? '' : 'es5Safe',
      window.JSON ? '' : 'json',
    ],
    alias: {
        'main': 'modules/public/main/main',
        /* common*/
        'util': 'modules/common/util.js',
        /* uicontrol*/
        'emotion': 'modules/uicontrol/emotion/emotion',
        'twemoji': 'modules/uicontrol/twemoji/twemoji',
        'dot': 'modules/uicontrol/doT/doT.js',
        'mp3player': 'modules/uicontrol/mp3player/mp3player.js',
        'video': 'modules/uicontrol/video/video.js',
        'videocss': 'modules/uicontrol/video/video-js.css',

        'scrollLoading': 'modules/vendor/jquery/1.8.3/jquery.scrollLoading.js'
    },
    map: [
       [/^(.*\.(?:css|js|htm|html))(\?.*)?$/i, '$1?20160823']
    ]
});
