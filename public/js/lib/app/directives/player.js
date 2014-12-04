/**
 * Created by remo on 03/12/14.
 */

'use strict';

revoList.app.directive('playerUi', function(){

    function controller($scope, player){

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
        player.on('progress', function(prog){
            $scope.$apply(function(){
                $scope.progress = 100 * prog;
            });
        });
    }

    return {
        restrict: 'AEC',
        controller: ['$scope', 'player', controller],
        scope: {},
        templateUrl: '/partials/player'
    };

});