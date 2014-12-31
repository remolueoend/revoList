/**
 * Created by remo on 03/12/14.
 */

'use strict';

revoList.app.service('youtubePlayer', [function(){

    var containerId = 'youtube-player-container',
        player = undefined,
        progressInt = undefined;

    function YoutubePlayer(events){
        this.events = events;
    }
    YoutubePlayer.prototype = {

        loadTrack: function(track){
            if(player){
                player.loadVideoById(track.id);
            }else{
                this.loadPlayer(track);
            }
        },

        loadPlayer: function(track){
            var _this = this;
            player = new YT.Player(containerId, {
                height: 50,
                width: 100,
                videoId: track.id,
                playerVars: {
                    controls: 0,
                    enablejsapi: 1,
                    disablekb: 0,
                    rel: 0,
                    playsinline: 0,
                    showinfo: 0
                },
                events: {
                    'onReady': function(){ _this.play() },
                    'onStateChange': function(e){ _this.stateChanged(e); }
                }
            });
        },

        play: function(){
            if(player){
                player.playVideo();
            }
        },

        pause: function(){
            if(player){
                player.pauseVideo();
            }
        },

        stop: function(){
            this.clearInterval();
            if(player){
                player.stopVideo();
            }
        },

        seekTo: function(seconds){
            if(player){
                player.seekTo(seconds, true);
            }
        },

        stateChanged: function(event){
            var _this = this;
            switch(event.data){
                case YT.PlayerState.CUED:
                    this.events.ready();
                    break;
                case YT.PlayerState.ENDED:
                    this.events.ended();
                    this.clearInterval();
                    break;
                case YT.PlayerState.PAUSED:
                    this.events.paused();
                    this.clearInterval();
                    break;
                case YT.PlayerState.PLAYING:
                    this.events.playing();
                    if(typeof progressInt === 'undefined'){
                        progressInt = window.setInterval(function(){
                            _this.events.progress({current: player.getCurrentTime(), duration: player.getDuration()});
                        }, 200);
                    }
                    break;
            }
        },

        clearInterval: function(){
            window.clearInterval(progressInt);
            progressInt = undefined;
        }
    };

    return YoutubePlayer;

}]);