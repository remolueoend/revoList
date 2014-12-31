/**
 * Created by remo on 26/12/14.
 */

'use strict';

revoList.app.controller('alertController', ['notify', '$scope', function(notify, $scope){

    $scope.alerts = [];
    notify.setup($scope);

}]);