/**
 * Created by remo on 04/12/14.
 */

'use strict';

revoList.app.factory('log', [function(){

    var req = new XMLHttpRequest();

    function request(level, data){
        req.open('post', '/log/' + level, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        req.send(JSON.stringify(data));
    }

    function RemoteLogger(component){
        this.comp = component;
    }
    RemoteLogger.prototype = {
        info: function(msg){
            request('info', {component: this.comp, msg: msg});
        },

        error: function(err){
            err.component = this.comp;
            request('error', err);
        },
        logon: function(user){
            request('logon', {user: user});
        }
    };

    return RemoteLogger;

}]);