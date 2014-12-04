/**
 * Created by remo on 29/11/14.
 */

'use strict';

revoList.app.factory('me', ['apiData', '$q', function(apiData, $q){

    /**
     * Object caching the current user.
     */
    var _me;

    /**
     * Returns a promise resolving the current user's info object.
     */
    return function me(){
        var d = $q.defer();

        if(!_me){
            apiData.user.me().then(function(user){
                _me = user;
                d.resolve(_me);
            });
        }else{
            d.resolve(_me);
        }

        return d.promise;
    }

}]);