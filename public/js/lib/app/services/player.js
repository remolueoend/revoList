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
        playTrack: function(playlist, index){
            currentPlaylist = playlist;
            currentIndex = index;
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
            this.trigger('trackLoaded', track);

        },

        next: function(){
            if(currentPlaylist) {
                if (currentIndex < currentPlaylist.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                this.loadTrack(currentPlaylist[currentIndex]);
            }
        },

        previous: function(){
            if(currentPlaylist) {
                if (currentIndex > 0) {
                    currentIndex--;
                } else {
                    currentIndex = currentPlaylist.length - 1;
                }
                this.loadTrack(currentPlaylist[currentIndex]);
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
            this.listeners[event].push(handler);
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

    var currentPlaylist = [],
        currentIndex = 0;

    return new Player();

}]);