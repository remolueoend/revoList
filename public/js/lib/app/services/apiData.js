/**
 * Created by remo on 29/11/14.
 */

'use strict';

revoList.app.factory('apiData', ['api', '$q', '$http', function(api, $q, $http){

    function DataLayer(entityType){
        this.api = api(entityType);
    }
    DataLayer.prototype = {
        get: function(id){
            return this.api.get(id);
        },

        query: function(filter){
            return this.api.query(filter);
        },

        create: function(model){
            return this.api.create(model);
        },

        update: function(model){
            this.api.update(model);
        },

        remove: function(model){
            this.api.remove(model);
        }
    };


    return {
        user: (function(){
            var layer = new DataLayer('user');
            layer.me = function(){
                return api.url('/user/me');
            };

            return layer;
        })(),

        playlist: (function(){
            var layer = new DataLayer('playlist');
            return layer;
        })(),

        search: (function(){
            var layer = new DataLayer('search');
            return layer;
        })()
    }

}]);