/**
 * Created by remo on 29/11/14.
 */

'use strict';

revoList.app.controller('appController', ['$scope', 'me', '$location', '$route', function($scope, me, $location, $route){

    me().then(function(user){
       $scope.currentUser = user;
    });

    $scope.search = function(){
        var q = $scope.searchQuery;
        if(q && q.length) {
            $location.path('/search/' + encodeURI(q));
        }
    };

    $scope.$on('$locationChangeSuccess', function() {
        if($location.path().indexOf('/search') !== 0){
            $scope.searchQuery = '';
        }
    });

}]);