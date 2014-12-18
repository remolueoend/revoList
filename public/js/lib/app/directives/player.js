/**
 * Created by remo on 03/12/14.
 */

'use strict';

revoList.app.directive('playerUi', function(){

    function controller($scope, $element, player){

        $scope.player = player;
        player.on('playing', function(){
            $scope.$apply(function(){
                $scope.isPlaying = true;
            });
        });
        player.on('paused', function(){
            $scope.$apply(function(){
                $scope.isPlaying = false;
            });
        });
        player.on('trackLoaded', function(track){
            $scope.currentTrack = track;
            $($element).show();
        });
    }

    return {
        restrict: 'AEC',
        controller: ['$scope', '$element', 'player', controller],
        scope: {},
        templateUrl: '/partials/player'
    };

});