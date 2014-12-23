/**
 * Created by remo on 02/12/14.
 */

'use strict';

revoList.app.directive('displayTrack', ['player', '$modal', '$timeout', '$location', '$rootScope', function(player, $modal, $timeout, $location, $rootScope){

    function link(scope, elem, attr){

        var trackLoadedHandler,
            trackPausedHandler,
            trackPlayingHandler,
            playing,
            paused;

        trackLoadedHandler = player.on('trackLoaded', function(track){
            handleLoadedTrack(track);
        });

        /**
         * Sets the directive up depending on the given track.
         * @param track
         */
        function handleLoadedTrack(track){
            if(isOwnTrack(scope, track)){
                playing = true, paused = false;
                $(elem).addClass('current');

                trackPausedHandler = player.on('paused', function(){
                    onPaused();
                });
                trackPlayingHandler = player.on('playing', function(){
                    onPlaying();
                });
            }else{
                paused = false, playing = false;
                $(elem).removeClass('current');
                if(trackPausedHandler) trackPausedHandler();
                if(trackPlayingHandler) trackPlayingHandler();
            }
        }

        function onPlaying(){
            $(elem).addClass('playing');
            $(elem).removeClass('paused');
            paused = false, playing = true;
        }

        function onPaused(){
            $(elem).addClass('paused');
            $(elem).removeClass('playing');
            paused = true, playing = false;
        }

        function locateTrack(){
            $('html, body').animate({
                scrollTop: $(elem).find(".track-cell").offset().top - 20 + 'px'
            }, 'fast');
        }

        $(elem).on('remove', function(){
            trackLoadedHandler();
            trackPausedHandler();
            trackPlayingHandler();
        });

        /**
         * Gets called by the view by clicking on the directive.
         * If the current track is already loaded by the player,
         * the player gets paused/started accordingly.
         * Else the current track gets loaded by the player.
         */
        scope.play = function(){
            if(playing) {
                player.pause();
            }else if(paused){
                player.play();
            }else{
                player.playTrack(scope.playlist, scope.i, scope.sourceUrl);
            }

        };

        /**
         * Gets called by the View to add this track to a playlist.
         * Opens a modal dialog.
         */
        scope.addToPlaylist = function(){
            var mScope = scope.$new();
            mScope.track = scope.track;
            $modal.open({templateUrl: '/partials/addToPlaylist', size: 'md', scope: mScope});
        };


        $timeout(function(){
            // Initially call handleLoadedTrack to proper style/setup the directive instance:
            handleLoadedTrack(player.currentTrack);

            // Id this directive's track is played, scroll to the played track on page load:
            if(isOwnTrack(scope, player.currentTrack)){
                if(player.isPlaying){
                    onPlaying();
                }else{
                    onPaused();
                }

                if($location.hash() === 'locate') {
                    locateTrack();
                }
            }
        });

        $rootScope.$on('locateTrack', function(e, track){
            if(isOwnTrack(scope, track)){
                locateTrack();
            }
        });
    }

    /**
     * Returns if the given track is the track represented by this directive instance.
     * @param scope
     * @param track
     */
    function isOwnTrack(scope, track){
        if(track){
            return scope.track.id === track.id && scope.track.provider === track.provider;
        }
        return false;
    }


    return {
        restrict: 'ECA',
        scope: {
            track: '=',
            playlist: '=',
            i: '=',
            sourceUrl: '@'
        },
        templateUrl: '/partials/display-track',
        link: link
    }

}]);