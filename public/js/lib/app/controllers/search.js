/**
 * Created by remo on 23/10/14.
 */

'use strict';

revoList.app.controller('searchController', ['$scope', 'apiData', '$routeParams', 'facebook', function($scope, apiData, $routeParams, facebook){

    $scope.searchQuery = $routeParams.query;

    apiData.search.query({q: decodeURI($scope.searchQuery)}).then(function(data){
        $scope.trackResult = data;
    });

    apiData.playlist.search($scope.searchQuery).then(function(data){
        $scope.playlistResult = data;
    });

    apiData.user.search($scope.searchQuery).then(function(data){
        $scope.userResult = data;
        $scope.userResult.forEach(function(u){
            setUserPic(u);
        });
    });

    function setUserPic(user){
        facebook().then(function(fb){
            fb.api('/' + user.id + '/picture?type=large', function(resp){
                user.picture = resp.data.url;
            })
        });
    }



}]);