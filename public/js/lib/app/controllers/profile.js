/**
 * Created by remo on 23/10/14.
 */

'use strict';

revoList.app.controller('profileController', ['$scope', 'apiData', 'me', function($scope, apiData, me){

    apiData.playlist.query({owner: "744103575663944"}).then(function(data){
    });

}]);