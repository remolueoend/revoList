/**
 * Created by remo on 23/10/14.
 */

'use strict';

revoList.app.controller('searchController', ['$scope', 'apiData', '$routeParams', function($scope, apiData, $routeParams){

    $scope.searchQuery = $routeParams.query;

    apiData.search.query({q: decodeURI($scope.searchQuery)}).then(function(data){
        $scope.result = data;
    });

}]);