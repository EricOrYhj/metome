/* eslint-disable max-len */
seajs.config({
  base: '/',
  preload: [
    Function.prototype.bind ? '' : 'es5Safe',
    window.JSON ? '' : 'json',
  ],
  alias: {
    /* common*/
    'util': 'modules/common/util.js',
    /* uicontrol*/
    'twemoji': 'modules/uicontrol/twemoji/twemoji',
    'dot': 'modules/uicontrol/doT/doT.js'
  },
  map: [
     [/^(.*\.(?:css|js|htm|html))(\?.*)?$/i, '$1?2016']
  ]
});
