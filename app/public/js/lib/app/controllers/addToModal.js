/**
 * Created by remo on 15/12/14.
 */

'use strict';

revoList.app.controller('addToModalController', ['$scope', 'apiData', 'me', function($scope, apiData, me){

    apiData.playlist.byTrack($scope.track).then(function(data){
        $scope.playlists = data;
    });


    $scope.addToNewPlaylist = function(){
        apiData.playlist.create({title: $scope.newPlaylist}, $scope.form).then(function(newPlaylist){
            $scope.addToPlaylist(newPlaylist._id);
        });
    };

    $scope.addToPlaylist = function(playlistId){
        apiData.playlist.addTrack(playlistId, $scope.track).then(function(){
            $scope.$close("track added to playlist.");
        });
    };

    $scope.removeFromPlaylist = function(playlistId){
        apiData.playlist.removeTrack(playlistId, $scope.track).then(function(){
            $scope.$close("track removed from playlist.");
        });
    };

}]);