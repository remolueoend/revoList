/**
 * Created by remo on 04/12/14.
 */

'use strict';

revoList.app.service('soundcloudPlayer', [function(){

    var containerId = 'soundcloud-player-container',
        player = undefined;

    function SoundcloudPlayer(events){
        var _this = this;
        this.events = events;
        this.options = {
            buying: false,
            liking: false,
            download: false,
            sharing: false,
            show_artwork: false,
            show_comments: false,
            show_playcount: false,
            show_user: false,
            callback: function(){
               _this.play();
            }
        };
    }
    SoundcloudPlayer.prototype = {

        loadTrack: function(track){
            if(!player){
                this.loadPlayer();
            }
            player.load('http://api.soundcloud.com/tracks/' + track.id, this.options);
        },

        loadPlayer: function(){
            var _this = this;
            player = SC.Widget(containerId);
            player.bind(SC.Widget.Events.READY, function(){
                //_this.play();
            });
            player.bind(SC.Widget.Events.PLAY, function(){
                _this.events.playing();
            });
            player.bind(SC.Widget.Events.PAUSE, function(){
                _this.events.paused();
            });
            player.bind(SC.Widget.Events.FINISH, function(){
                _this.events.ended();
            });
            player.bind(SC.Widget.Events.PLAY_PROGRESS, function(e){
                _this.getDuration(function(d){
                    _this.events.progress({current: e.currentPosition / 1000, duration: d / 1000});
                });
            });
        },

        getDuration: (function(){

            var duration = undefined;

            return function(callback){
                if(typeof duration !== 'undefined'){
                    callback(duration);
                }else{
                    player.getDuration(function(d){
                        duration = d;
                        callback(duration);
                    });
                }
            }

        })(),

        play: function(){
            if(player){
                player.play();
            }
        },

        pause: function(){
            if(player){
                player.pause();
            }
        },

        stop: function(){
            if(player){
                player.pause();
            }
        },

        seekTo: function(seconds){
            if(player){
                player.seekTo(seconds * 1000);
            }
        }
    };

    return SoundcloudPlayer;

}]);