/**
 * Created by remo on 26/10/14.
 */

'use strict';

revoList.app.factory('fbAuth', ['$q', '$modal', 'log', 'config', 'facebook', function($q, $modal, log, config, facebook){

    var logger = new log('fbAuth');

    function authInfo(){
        var d = $q.defer();

        facebook().then(function(fb){

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

    return function fbAuth(){
        var d = $q.defer();
        authInfo().then(function(resp){
            d.resolve({uid: resp.userID, accessToken: resp.accessToken});
        });

        return d.promise;
    };

}]);