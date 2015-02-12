/**
 * Created by remo on 31/12/14.
 */

'use strict';

revoList.app.factory('facebook', ['$q', 'config', function($q, config){

    var isInit = false;

    function resolve(d){
        if(!isInit){
            config().then(function(cfg){
                window.FB.init({
                    appId      : cfg.FB.appId,
                    xfbml      : false,
                    version    : 'v2.1',
                    status     : true
                });
                isInit = true;
                d.resolve(window.FB);
            });
        }else{
            d.resolve(window.FB);
        }
    }

    return function(){
        var d = $q.defer();
        if(window.FB){
            resolve(d);
        }else{
            window.fbAsyncInit = function(){
                resolve(d);
            };
        }

        return d.promise;
    }

}]);