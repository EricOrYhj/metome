define(function (require, exports, module) {

    require('../live/live');
    require('../common/constant');

    var main = {};

    main.init = function () {
        $('.msgWrapper').on("click", main.playAudio);
    };

    main.playAudio = function () {
        var $this = $(this);
        require.async('modules/uicontrol/mp3player/mp3player', function (player) {
            var $msg = $this.closest(".msgItem");
            var msg = $msg.find(".audioInfo").data("audio");
            var audio = $msg.data('audio');
            if (window.chatAudioPlayer) {
                window.chatAudioPlayer.stop();
            }
            if (!audio) { // 第一次播放
                audio = new player({
                    mp3_url: msg + '?avthumb/mp3',
                    wav_url: msg + '?avthumb/wav',
                    onStop: function () {
                        $msg.removeClass("audioPlaying");
                    },
                });

                window.chatAudioPlayer = audio;
                window.chatAudioPlayer.play();
                $msg.addClass("audioPlaying").data("audio", audio);
            } else if ($msg.hasClass("audioPlaying")) { // 取消播放
                audio.stop();
                window.chatAudioPlayer.stop();
            } else { // 重播
                window.chatAudioPlayer = audio;
                window.chatAudioPlayer.play();
                $msg.addClass("audioPlaying");
            }
        });
    };

    module.exports = main;
});