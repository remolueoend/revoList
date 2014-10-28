/**
 * Created by remo on 26/10/14.
 */

'use strict';

revoList.app.factory('fbAuth', ['$q', function($q){

    function authInfo(fb){
        var d = $q.defer();

        fb.init({
            appId      : '1551776555034153',
            xfbml      : false,
            version    : 'v2.1',
            status     : true
        });

        fb.getLoginStatus(function(response){
            if(response.status === 'connected'){
                d.resolve(response.authResponse);
            }else{
                FB.login(function(response){
                    d.resolve(response.authResponse);
                });
            }
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