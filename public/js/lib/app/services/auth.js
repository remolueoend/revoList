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
                        'Authorization': 'Basic ' + btoa('revoList_webApp_client:revoList_webApp_secret')
                    }
                })
                    .success(function(resp){
                        authDeferred.resolve(resp);
                        if(creds.logon){
                            logAuth(resp);
                        }
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
     * Logs the logon of a user
     */
    function logAuth(authResp){
        config().then(function(cfg){
            $http.get(cfg.api.base.replace('{{path}}', '/user/me'), {
                params: {
                    access_token: authResp.access_token
                }
            }).then(function(resp){
                logger.logon(resp.data);
            });
        });
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

        var _currentVersion = '1';

        function _setAccessToken(host, authResp){
            $.cookie('revoList_' + host, authResp.access_token, {expires: 1, path: '/'});
            $.cookie('revoList_' + host + '_v', _currentVersion, {expires: 365, path: '/'});
        }

        function _getAccessToken(host){
            if($.cookie('revoList_' + host + '_v') === _currentVersion){
                return $.cookie('revoList_' + host);
            }else{
                return void 0;
            }
        }

        function accessToken(force) {
            var d = $q.defer();

            config().then(function(cfg){
                var _accessToken = _getAccessToken(cfg.api.host);
                if(_accessToken == null || force){
                    auth().then(function(resp){
                        _setAccessToken(cfg.api.host, resp);
                        d.resolve(resp.access_token);
                    });
                }else{
                    d.resolve(_accessToken);
                }
            });

            return d.promise;
        }

        return accessToken;
    })();

    return auth;

}]);