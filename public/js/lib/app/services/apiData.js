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
            return this.api.update(model);
        },

        remove: function(model){
            return this.api.remove(model);
        },

        action: function(name, id, config){
            return api.url(this.api.entityType + '/' + (typeof id !== 'undefined' ? id + '/' : '') + name, config);
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
            layer.my = function(){
                return this.action('my');
            };
            layer.addTrack = function(playlistId, track){
                return this.action('addTrack', playlistId, {
                    method: 'POST',
                    data: track
                });
            };
            layer.byTrack = function(track){
                return api.url('playlist/byTrack/' + track.provider + '/' + track.id);
            };

            layer.like = function(playlistId){
                return this.action('like', playlistId);
            };

            layer.dislike = function(playlistId){
                return this.action('dislike', playlistId);
            };

            return layer;
        })(),

        search: (function(){
            var layer = new DataLayer('search');
            return layer;
        })(),

        track: (function(){
            var layer = new DataLayer('track');
            return layer;
        })(),
    }

}]);