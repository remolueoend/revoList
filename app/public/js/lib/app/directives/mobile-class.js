/**
 * Created by remo on 23/12/14.
 */

'use strict';

revoList.app.directive('mobileClass', function(){

    function link(scope, elem, attr){
        var classes = attr.mobileClass.split(':');
        if($('html.mobile').length){
            $(elem).addClass(classes[0]);
        }else if(classes[1]){
            $(elem).addClass(classes[1]);
        }
    }

    return {
        restrict: 'A',
        link: link
    }

});