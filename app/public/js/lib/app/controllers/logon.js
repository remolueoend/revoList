/**
 * Created by remo on 29/11/14.
 */

'use strict';

revoList.app.controller('logonController', ['$scope', function($scope){

    $scope.logon = function(){
        FB.login(function(response){
            if(response.authResponse){
                $scope.$close(response.authResponse);
            }else{
                //$scope.$dismiss();
            }
        });
    };

}]);