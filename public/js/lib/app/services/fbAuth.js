/**
 * Created by remo on 26/10/14.
 */

'use strict';

revoList.app.factory('fbAuth', ['$q', '$modal', 'log', 'config', function($q, $modal, log, config){

    var logger = new log('fbAuth');

    function authInfo(fb){
        var d = $q.defer();

        config().then(function(cfg){
            fb.init({
                appId      : cfg.FB.appId,
                xfbml      : false,
                version    : 'v2.1',
                status     : true
            });

            fb.getLoginStatus(function(response){
                if(response.status === 'connected'){
                    d.resolve(response.authResponse);
                }else{
                    logger.info('starting Facebook authentication process');
                    $modal.open({templateUrl: '/partials/logon', keyboard: false, size: 'md', backdrop: 'static'})
                        .result.then(function(response){
                            d.resolve(response);
                        });
                }
            });
        });

        return d.promise;
    }

    function resolve(deferred){
        authInfo(window.FB).then(function(resp){
            deferred.resolve({uid: resp.userID, accessToken: resp.accessToken});
        });
    }

    return function fbAuth(){
        var d = $q.defer();

        if(window.FB){
            resolve(d);
        }else{
            window.fbAsyncInit = function() {
                resolve(d);
            };
        }

        return d.promise;
    };

}]);