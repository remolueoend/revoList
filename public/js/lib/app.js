/**
 * Created by remo on 22/10/14.
 */

'use strict';

/**
 * Base namespace
 */
var revoList = (function(){

    return {
        /**
         * Angular app instance of the revoList app.
         * @type {module}
         */
        app: angular.module('revo-list', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ui.bootstrap-slider']),

        /**
         * Title of app, used for page titles and so on
         */
        appTitle: 'revoList'
    }
})();

revoList.app
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'partials/profile'
            }).
            when('/:partial', {
                controller: 'defaultController',
                templateUrl: function(routeValues){
                    return 'partials/' + routeValues.partial;
                }
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }])
    .factory('$exceptionHandler', ['$log', 'log', function($log, log) {
        var logger = new log('$exceptionHandler');
        return function(exception, cause) {
            $log.error(exception);
            logger.error({msg: exception.message, stack: exception.stack});
        };
    }]);