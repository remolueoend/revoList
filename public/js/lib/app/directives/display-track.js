/**
 * Created by remo on 02/12/14.
 */

'use strict';

revoList.app.directive('displayTrack', ['player', function(player){

    function controller($scope) {
        $scope.play = function(){
            player.playTrack($scope.playlist, $scope.i);
        };

        $scope.addToPlaylist = function(){

        };

        $scope.like = function(){

        };
    }


    return {
        restrict: 'ECA',
        scope: {
            track: '=',
            playlist: '=',
            i: '='
        },
        templateUrl: '/partials/display-track',
        controller: controller
    }

}]);