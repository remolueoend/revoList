/**
 * Created by remo on 02/12/14.
 */

'use strict';

revoList.app.directive('displayTrack', ['player', '$modal', function(player, $modal){

    function controller($scope) {
        $scope.play = function(){
            player.playTrack($scope.playlist, $scope.i);
        };

        $scope.addToPlaylist = function(){
            var mScope = $scope.$new();
            mScope.track = $scope.track;
            $modal.open({templateUrl: '/partials/addToPlaylist', size: 'md', scope: mScope});
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