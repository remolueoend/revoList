/**
 * Created by remo on 23/10/14.
 */

'use strict';

revoList.app.controller('profileController', ['$scope', 'api', function($scope, api){
    var rest = api('user');

    rest.query().then(function(users){
        $scope.users = users;
    });

    $scope.save = function(index){
        var model = $scope.users[index];
        if(typeof model._id !== "undefined"){
            rest.update(model);
        }else{
            rest.create(model).then(function(nm){
                $scope.users[index] = nm;
            });
        }
    };

    $scope.delete = function(index){
        rest.remove($scope.users[index]).then(function(){
            $scope.users.splice(index, 1);
        });
    };

    $scope.add = function(){
        $scope.users.push({});
    };

}]);