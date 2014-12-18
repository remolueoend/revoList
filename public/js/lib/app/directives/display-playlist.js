/**
 * Created by remo on 02/12/14.
 */

'use strict';

revoList.app.directive('displayPlaylist', ['$modal', 'apiData', 'me', function($modal, apiData, me){

    function controller($scope) {
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

        };

        apiData.track.get($scope.playlist.tracks[0]).then(function(t){
            $scope.playlist.thumbnail = t.thumbnail;
        });

        apiData.user.get($scope.playlist.owner).then(function(u){
            $scope.ownerInstance = u;
        });

        me().then(function(u){
            $scope.me = u;
            if($scope.playlist.likes && $scope.playlist.likes.indexOf(u._id) !== -1){
                $scope.liked = true;
            }
        });
    }

    function link(scope, elem, attr){
        console.log(scope);
    }


    return {
        restrict: 'ECA',
        scope: {
            playlist: '='
        },
        templateUrl: '/partials/display-playlist',
        controller: controller,
        link: link
    }

}]);