/**
 * Created by remo on 18/12/14.
 */

'use strict';

revoList.app.controller('playlistController', ['$scope', 'apiData', '$routeParams', '$q', 'me', '$modal', function($scope, apiData, $routeParams, $q, me, $modal){

    $scope.init = function(playlist){
        $scope.playlist = playlist;
        loadDirectiveData();
    };

    $scope.like = function(){
        apiData.playlist.like($scope.playlist._id).then(function(){
            $scope.liked = true;
            $scope.playlist.likes = $scope.playlist.likes || [];
            $scope.playlist.likes.push($scope.me._id);
        });
    };

    $scope.dislike = function(){
        apiData.playlist.dislike($scope.playlist._id).then(function(){
            $scope.liked = false;
            $scope.playlist.likes.splice($scope.playlist.likes.indexOf($scope.me._id), 1);
        });
    };

    $scope.edit = function(){
        var mScope = $scope.$new();
        mScope.playlist = $scope.playlist;
        mScope.tracks = $scope.tracks;
        $modal.open({templateUrl: '/partials/editPlaylist', scope: mScope});
    };

    function loadDirectiveData() {

        apiData.track.get($scope.playlist.tracks[0]).then(function (t) {
            $scope.playlist.thumbnail = t.thumbnail;
        });

        apiData.user.get($scope.playlist.owner).then(function (u) {
            $scope.ownerInstance = u;
        });

        me().then(function (u) {
            $scope.me = u;
            if ($scope.playlist.likes && $scope.playlist.likes.indexOf(u._id) !== -1) {
                $scope.liked = true;
            }
        });

        $scope.tracks = [];
        $scope.playlist.tracks.forEach(function(tid){
            apiData.track.get(tid).then(function(t){
                $scope.tracks.push(t);
            });
        });
    }

    if($routeParams.playlistId){
        apiData.playlist.get($routeParams.playlistId).then(function(p){
            $scope.playlist = p;

            loadDirectiveData();
        });
    }
}]);