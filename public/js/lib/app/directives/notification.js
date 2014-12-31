/**
 * Created by remo on 31/12/14.
 */

'use strict';

revoList.app.directive('notification', ['$timeout', function($timeout){

    function link(scope, elem, attr){
        $timeout(function(){
            scope.alerts.splice(scope.index, 1);
        }, 3000);
    }

    return {
        restrict: 'EAC',
        link: link,
        scope: {
            alerts: '=',
            index: '='
        }
    }
}]);