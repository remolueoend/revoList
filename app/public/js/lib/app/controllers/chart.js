/**
 * Created by remo on 23/12/14.
 */

'use strict';

revoList.app.controller('chartController', ['$scope', 'apiData', function($scope, apiData){

    apiData.playlist.query().then(function(data){
        $scope.playlists = data;
    });

}]);