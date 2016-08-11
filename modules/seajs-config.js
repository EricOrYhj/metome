/* eslint-disable max-len */
seajs.config({
  base: '/dist',
  preload: [
    Function.prototype.bind ? '' : 'es5Safe',
    window.JSON ? '' : 'json',
  ],
  alias: {
    /* common*/
    'util': 'common/util.js',
    /* uicontrol*/
    'twemoji': 'uicontrol/twemoji/twemoji',
    'dot': 'uicontrol/doT/doT.js'
  },
  map: [
     [/^(.*\.(?:css|js|htm|html))(\?.*)?$/i, '$1?2016']
  ]
});
