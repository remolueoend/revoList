/**
 * Created by remo on 20/12/14.
 */

'use strict';

revoList.app.controller('editPlaylistController', ['$scope', 'apiData', 'notify', function($scope, apiData, notify){

    $scope.remove = function(index){
        apiData.playlist.removeTrack($scope.playlist._id, $scope.tracks[index]).then(function(){
            $scope.tracks.splice(index, 1);
            notify.success('track removed from playlist');
        });
    };

    $scope['delete'] = function(){
        apiData.playlist.remove($scope.playlist).then(function(){
            var ps = $scope.$parent.$parent.$parent.playlists;
            var i = ps.indexOf($scope.playlist);
            if(i >= 0){
                ps.splice(i, 1);
                $scope.$close();
                notify.success('Your playlist is in heaven now :|');
            }
        });
    };

    $scope.changeTitle = function(){
        apiData.playlist.changeTitle($scope.playlist._id, $scope.newTitle, $scope.form).then(function(){
            $scope.playlist.title = $scope.newTitle;
            notify.success('Your playlist is now called "' + $scope.newTitle + '"');
        });
    };

    $scope.newTitle = $scope.playlist.title;

}]);