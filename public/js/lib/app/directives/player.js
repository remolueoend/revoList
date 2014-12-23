/**
 * Created by remo on 03/12/14.
 */

'use strict';

revoList.app.directive('playerUi', ['$rootScope', '$location', function($rootScope, $location){

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
        player.on('trackLoaded', function(track, sourceUrl){
            $scope.currentTrack = track;
            $scope.sourceUrl = sourceUrl;
            $($element).show();
        });

        $scope.locateTrack = function(){
            if($location.path() !== $scope.sourceUrl){
                $location.path($scope.sourceUrl).hash('locate');
            }else{
                $rootScope.$broadcast('locateTrack', player.currentTrack);
            }
        };
    }

    return {
        restrict: 'AEC',
        controller: ['$scope', '$element', 'player', controller],
        scope: {},
        templateUrl: '/partials/player'
    };

}]);