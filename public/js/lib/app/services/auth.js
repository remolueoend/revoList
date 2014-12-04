/**
 * Created by remo on 27/10/14.
 */

'use strict';

revoList.app.factory('auth', ['$http', 'config', 'fbAuth', '$q', 'log', function($http, config, fbAuth, $q, log){

    var isAuthenticating = false,
        authDeferred,
        user,
        logger = new log('auth');

    function auth(){
        if(!isAuthenticating){
            authDeferred = $q.defer();
            isAuthenticating = true;

            $q.all([fbAuth(), config()]).then(function(resp){
                var creds = resp[0], ac = resp[1].api;

                $http({
                    method: 'POST',
                    url: ac.base.replace('{{path}}', '/oauth/token'),
                    data: $.param({username: creds.uid, password: creds.accessToken, grant_type: 'password'}),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Basic ' + btoa('REMO_CLIENT:REMO_SECRET')
                    }
                })
                    .success(function(resp){
                        authDeferred.resolve(resp);
                    })
                    .error(function(resp){
                        alert('auth error');
                        authDeferred.reject(resp);
                    })
                    .finally(function(){
                        isAuthenticating = false;
                    })
            });
        }

        return authDeferred.promise;
    }

    /**
     * Returns a promise resolving the current authenticated user.
     */
    auth.user = (function(){

        var _user;

        function _getUser(){
            return _user;
        }

        function _setUser(usr){
            _user = usr;
        }

        function user(){
            var d = $q.defer();

            var u = _getUser();
            if(typeof u === 'undefined'){
                auth().then(function(authResp){
                    _setUser();
                    d.resolve();
                });
            }else{
                d.resolve(u);
            }

            return d.promise;
        }


        return user;

    })();


    /**
     * Returns a promise resolving the current used access token.
     */
    auth.accessToken = (function() {

        function _setAccessToken(authResp){
            sessionStorage.setItem("revoList.at", authResp.access_token);
            setTimeout(function () {
                sessionStorage.removeItem("revoList.at");
            }, authResp.expires_in * 1000);
        }

        function _getAccessToken(){
            return sessionStorage.getItem("revoList.at");
        }

        function accessToken(force) {
            var d = $q.defer();

            var _accessToken = _getAccessToken();
            if(_accessToken === null || force){
                auth().then(function(authResp){
                    _setAccessToken(authResp);
                    d.resolve(authResp.access_token);
                });
            }else{
                d.resolve(_accessToken);
            }

            return d.promise;
        }

        return accessToken;
    })();

    return auth;

}]);