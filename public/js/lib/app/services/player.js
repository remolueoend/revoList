/**
 * Created by remo on 03/12/14.
 */

'use strict';

revoList.app.factory('player', ['youtubePlayer', 'soundcloudPlayer', function(youtubePlayer, soundcloudPlayer){

    function Player(){
        var _this = this;
        this.isPlaying = false;
        this.currentTrack = undefined;
        this.player = undefined;
        this.currentPlaylist = [];
        this.currentIndex = 0;
        this.sourceUrl = undefined;
        this.events = {
            ended: function(){ _this.next(); },
            paused: function(){ _this.isPlaying = false; _this.trigger('paused'); },
            playing: function(){ _this.isPlaying = true; _this.trigger('playing'); },
            ready: function(){ _this.play(); },
            progress: function(p){ _this.trigger('progress', p); }
        };
        this.listeners = { playing: [], paused: [], progress: [], trackLoaded: [] };
    }
    Player.prototype = {
        playTrack: function(playlist, index, sourceUrl){
            this.currentPlaylist = playlist;
            this.currentIndex = index;
            this.sourceUrl = sourceUrl;
            this.loadTrack(playlist[index]);
        },

        loadTrack: function(track){
            if(this.currentTrack && this.currentTrack.provider !== track.provider && this.player){
                this.player.stop();
            }
            this.currentTrack = track;
            switch(track.provider){
                case 'youtube':
                    this.player = new youtubePlayer(this.events);
                    break;
                case 'soundcloud':
                    this.player = new soundcloudPlayer(this.events);
                    break;
            }

            this.player.loadTrack(track);
            this.trigger('trackLoaded', track, this.sourceUrl);

        },

        next: function(){
            if(this.currentPlaylist.length) {
                if (this.currentIndex < this.currentPlaylist.length - 1) {
                    this.currentIndex++;
                } else {
                    this.currentIndex = 0;
                }
                this.loadTrack(this.currentPlaylist[this.currentIndex]);
            }
        },

        previous: function(){
            if(this.currentPlaylist.length) {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                } else {
                    this.currentIndex = this.currentPlaylist.length - 1;
                }
                this.loadTrack(this.currentPlaylist[this.currentIndex]);
            }
        },

        play: function(){
            if(this.player && this.currentTrack){
                this.player.play();
            }
        },

        pause: function(){
            if(this.player && this.currentTrack){
                this.player.pause();
            }
        },

        on: function(event, handler){
            var _this = this;
            this.listeners[event].push(handler);

            return function(){
                var i = _this.listeners[event].indexOf(handler);
                if(i >= 0){
                    _this.listeners[event].splice(i, 1);
                }
            }
        },

        trigger: function(event){
            var args = Array.prototype.slice.call(arguments).splice(1);
            this.listeners[event].forEach(function(l){
                l.apply(void 0, args);
            });
        },

        seekTo: function(seconds){
            this.player.seekTo(seconds);
        }
    };

    return new Player();

}]);