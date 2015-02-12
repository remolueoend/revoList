/**
 * Created by remo on 18/12/14.
 */

'use strict';

revoList.app.filter('likesCount', function(){

    return function(input){
        if(typeof input === 'number'){
            if(input === 1){
                return '1 like';
            }else{
                return input + ' likes';
            }
        }else{
            return '0 likes'
        }
    }

});