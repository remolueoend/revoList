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

        create: function(model, form){
            return this.api.create(model, form);
        },

        update: function(model){
            return this.api.update(model);
        },

        remove: function(model){
            return this.api.remove(model);
        },

        action: function(name, id, config, form){
            return api.url(this.api.entityType + '/' +
                (id != null ? id + '/' : '') + name, config, form);
        }
    };


    return {
        user: (function(){
            var layer = new DataLayer('user');
            layer.me = function(){
                return api.url('/user/me');
            };

            layer.likes = function(userId){
                return this.action('likes', userId);
            };

            layer.search = function(query){
                return this.action('search', void 0, {
                    params: {
                        q: query
                    }
                });
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

            layer.removeTrack = function(playlistId, track){
                return this.action('removeTrack', playlistId, {
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

            layer.changeTitle = function(playlistId, newTitle, form){
                return this.action('changeTitle', playlistId, {
                    params: {
                        title: newTitle
                    }
                }, form);
            };

            layer.search = function(query){
                return this.action('search', void 0, {
                    params: {
                        q: query
                    }
                });
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
        })()
    }

}]);