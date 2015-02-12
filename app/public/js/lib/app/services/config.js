/**
 * Created by remo on 23/10/14.
 */

'use strict';

revoList.app.factory('config', ['$http', '$q', function($http, $q){

    var conf;

    return function config(){
        var d = $q.defer();
        if(typeof conf !== "undefined"){
            d.resolve(conf);
        }else{
            $http.get('/config').then(function(resp){
                conf = resp.data;
                d.resolve(conf);
            });
        }

        return d.promise;
    }

}]);