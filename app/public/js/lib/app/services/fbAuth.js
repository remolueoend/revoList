/**
 * Created by remo on 26/10/14.
 */

'use strict';

revoList.app.factory('fbAuth', ['$q', '$modal', 'log', 'config', 'facebook', '$route', function($q, $modal, log, config, facebook, $route){

    var logger = new log('fbAuth');

    function authInfo(){
        var d = $q.defer();

        facebook().then(function(fb){

            fb.getLoginStatus(function(response){
                if(response.status === 'connected'){
                    d.resolve({auth: response.authResponse, logon: false});
                }else{
                    logger.info('starting Facebook authentication process');
                    $modal.open({templateUrl: '/partials/logon', keyboard: false, size: 'md', backdrop: 'static'})
                        .result.then(function(response){
                            d.resolve({auth: response, logon: true});

                        }, function(){
                            $route.reload();
                        });
                }
            });
        });

        return d.promise;
    }

    return function fbAuth(){
        var d = $q.defer();
        authInfo().then(function(resp){
            d.resolve({uid: resp.auth.userID, accessToken: resp.auth.accessToken, logon: resp.logon});
        });

        return d.promise;
    };

}]);