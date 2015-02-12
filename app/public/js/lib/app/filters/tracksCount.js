/**
 * Created by remo on 18/12/14.
 */

'use strict';

revoList.app.filter('tracksCount', function(){

    return function(input){
        if(typeof input === 'number'){
            if(input === 1){
                return '1 track';
            }else{
                return input + ' tracks';
            }
        }else{
            return '0 tracks'
        }
    }

});