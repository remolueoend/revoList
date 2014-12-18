/**
 * Created by remo on 18/12/14.
 */

'use strict';

revoList.app.filter('username', function(){

    return function(input){
        return typeof input === 'object' ? input.firstName + ' ' + input.lastName : '';
    };

});