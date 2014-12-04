/**
 * Created by remo on 23/10/14.
 */

'use strict';

revoList.app.controller('searchController', ['$scope', 'apiData', '$location', function($scope, apiData, $location){

    $scope.searchQuery = $location.search().searchQuery;

    apiData.search.query({q: decodeURI($location.search().searchQuery)}).then(function(data){
        $scope.result = data;
    });

}]);