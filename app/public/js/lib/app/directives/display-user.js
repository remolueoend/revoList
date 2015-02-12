/**
 * Created by remo on 23/12/14.
 */

'use strict';

revoList.app.directive('displayUser', function(){



    return {
        templateUrl: '/partials/display-user',
        restrict: 'CAE',
        scope: {
            user: '='
        }
    }

});