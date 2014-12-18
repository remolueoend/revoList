/**
 * Created by remo on 16/12/14.
 */

'use strict';

revoList.app.controller('addToModalPlaylistController', ['$scope', function($scope){

    $scope.$watch('p.selected', function(nv, ov){
        if(nv !== ov){
            if(nv === true){
                $scope.addToPlaylist($scope.p._id);
            }else{
                $scope.removeToPlaylist($scope.p._id);
            }
        }
    });

}]);