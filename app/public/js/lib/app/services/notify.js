/**
 * Created by remo on 26/12/14.
 */

'use strict';

revoList.app.factory('notify', [function(){

    var _scope;

    function setup(scope){
        _scope = scope;
    }

    function success(message){
        addAlert(message, 'success');
    }


    function error(message){
        addAlert(message, 'danger');
    }

    function addAlert(message, type){
        if(_scope){
            _scope.alerts.splice(0, 0, {msg: message, type: type});
        }
    }

    return {
        success: success,
        error: error,
        setup: setup
    }

}]);