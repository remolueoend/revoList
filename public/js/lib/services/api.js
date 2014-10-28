/**
 * Created by remo on 22/10/14.
 */

'use strict';

revoList.app.factory('api', ['$resource', '$http', '$q', 'config', 'auth', function($resource, $http, $q, config, auth){

    /**
     * Returns a promise resolving the API configuration.
     * @returns {promise}
     */
    var apiConf = (function(){

        /**
         * static variable saving the API configuration
         */
        var _apiConf;

        /**
         * Returns a promise resolving the API configuration.
         * @returns {promise}
         */
        function apiConf(){
            var d = $q.defer();
            if(typeof _apiConf !== "undefined"){
                d.resolve(_apiConf);
            }else{
                config().then(function(val){
                    _apiConf = val.api;
                    d.resolve(_apiConf);
                });
            }

            return d.promise;
        }

        return apiConf;
    })();


    /**
     * Api constructor providing an HTTP interface to the API.
     * @param {string} [entityType] The name of the entity type. Must be set
     * for RESTful calls.
     * @constructor
     */
    function Api(entityType){
        if(!(this instanceof Api)){
            return new Api(entityType);
        }

        this.entityType = entityType;
        this.res = undefined;
    }

    /**
     * static member providing info to the current authentication.
     */
    Api.auth = auth;

    Api.prototype = {

        /**
         * Returns a promise resolving the API resource interface used
         * to create REST requests.
         * @returns {promise}
         */
        resource: function(){
            var d = $q.defer(),
                _this = this;

            if(typeof this.res !== "undefined"){
                d.resolve(this.res);
            }else{
                $q.all([apiConf(), auth.accessToken()]).then(function(resp){
                    _this.res = $resource(resp[0].url, {entity: _this.entityType, id: '@_id', accessToken: resp[1]}, {
                        create: {method: 'post'},
                        update: {method: 'put'}
                    });
                    d.resolve(_this.res);
                });
            }

            return d.promise;
        },

        /**
         * Returns a promise resolving a single entity instance.
         * @param {*} id The id of the entity to get
         * @returns {promise} An angular promise
         */
        get: function(id){
            var d = $q.defer();
            this.resource().then(function(res){
                res.get({id: id}).then(function(data){
                    d.resolve(data);
                });
            });

            return d.promise;
        },

        /**
         * Returns a promise resolving a single entity instance.
         * @returns {promise} An angular promise
         */
        query: function(){
            var d = $q.defer();
            this.resource().then(function(res){
                res.query(function(data){
                    d.resolve(data);
                });
            });

            return d.promise;
        },

        /**
         * Creates a new entity on the server based on the given model.
         * @param {object} model The model data of the entity
         * @returns {promise} An angular promise
         */
        create: function(model){
            var d = $q.defer();
            this.resource().then(function(res){
                var entity = new res(model);
                entity.$create(function(data){
                    d.resolve(data);
                });
            });

            return d.promise;
        },

        /**
         * Updates the given model
         * @param model
         * @returns {promise}
         */
        update: function(model){
            var d = $q.defer();
            this.resource().then(function(res){
                var entity = new res(model);
                entity.$update(function(data){
                    d.resolve(data);
                });
            });

            return d.promise;
        },

        /**
         * Deletes the given model
         * @param model
         * @returns promise}
         */
        remove: function(model){
            var d = $q.defer();
            this.resource().then(function(res){
                var entity = new res(model);
                entity.$delete(function(data){
                    d.resolve(data);
                });
            });

            return d.promise;
        }
    };

    return Api;

}]);