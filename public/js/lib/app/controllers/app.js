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
            //window.location = '/search?searchQuery=' + encodeURI(q);

            if($location.path() === '/search'){
                $location.search('searchQuery', encodeURI(q));
                //$route.reload();
            }else{
                $location.path('/search').search('searchQuery', encodeURI(q));
            }
        }
    };

}]);