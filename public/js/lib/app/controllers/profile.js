/**
 * Created by remo on 23/10/14.
 */

'use strict';

revoList.app.controller('profileController', ['$scope', 'apiData', 'me', '$routeParams', '$q', function($scope, apiData, me, $routeParams, $q){

    currentUser().then(function(u){
        loadPlaylists(u._id);
        loadLikes(u._id);

        $scope.user = u;
    });

    function loadPlaylists(owner){
        apiData.playlist.query({owner: owner}).then(function(data){
            $scope.playlists = data;
        });
    }

    function loadLikes(owner){
        apiData.user.likes(owner).then(function(data){
            $scope.likes = data;
        });
    }

    function currentUser(){
        var d = $q.defer();
        if($routeParams.user){
            apiData.user.get($routeParams.user).then(function(u){
                d.resolve(u);
            });
        }else{
            me().then(function(u){
                d.resolve(u);
            });
        }

        return d.promise;
    }

}]);