/**
 * Created by remo on 22/10/14.
 */

'use strict';

revoList.app.factory('api', ['$resource', '$http', '$q', 'config', 'auth', 'validator', function($resource, $http, $q, config, auth, validator){

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
     * Object caching api instances based on their entity type.
     * @type {{}}
     * @private
     */
    var _apiInstanceCache = {};


    /**
     * Api constructor providing an HTTP interface to the API.
     * @param {string} [entityType] The name of the entity type. Must be set
     * for RESTful calls.
     * @constructor
     */
    function Api(entityType){
        if(!(this instanceof Api)){
            if(!_apiInstanceCache[entityType]) {
                _apiInstanceCache[entityType] = new Api(entityType);
            }
            return _apiInstanceCache[entityType];
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
                res.get({id: id}, function(data){
                    d.resolve(data);
                });
            });

            return d.promise;
        },

        /**
         * Returns a promise resolving a collection of entites.
         *
         * @returns {promise} An angular promise
         */
        query: function(filter){
            var d = $q.defer();
            this.resource().then(function(res){
                res.query(filter, function(data){
                    d.resolve(data);
                });
            });

            return d.promise;
        },

        /**
         * Creates a new entity on the server based on the given model.
         *
         * @param {object} model The model data of the entity
         * @returns {promise} An angular promise
         */
        create: function(model, form){
            var d = $q.defer();
            this.resource().then(function(res){
                var entity = new res(model);
                entity.$create(function(data){
                    d.resolve(data);
                    validator.validateForm(form, {status: 200});
                }, function(resp){
                    validator.validateForm(form, resp);
                });
            });

            return d.promise;
        },

        /**
         * Updates the given model.
         *
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
         * Deletes the given model.
         *
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


    /**
     * Calls the provided url on the API.
     * @param {string} path The url to call
     * @param {object} config The request config.
     * @param {FormController} form An optional form instance.
     */
    Api.url = function(path, config, form){
        config = config || {};
        config.params = config.params || {};
        if(path[0] !== '/') path = '/' + path;
        var d = $q.defer();

        $q.all([apiConf(), auth.accessToken()]).then(function(r){
            config.url = r[0].base.replace('{{path}}', path);
            config.params.access_token = r[1];
            $http(config).then(function(resp){
                validator.validateForm(form, resp);
                d.resolve(resp.data);
            }, function(resp){
                validator.validateForm(form, resp);
                d.reject(resp);
            });
        });

        return d.promise;
    };

    return Api;

}]);