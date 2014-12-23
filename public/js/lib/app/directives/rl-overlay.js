/**
 * Created by remo on 14/12/14.
 */

'use strict';

revoList.app.directive('rlOverlay', function(){

    return {
        link: function(scope, elem, attr){
            $(elem).hover(
                function(){ $(this).find('.overlay').css('display', 'block'); },
                function(){ $(this).find('.overlay').css('display', ''); }
            );
        },
        restrict: 'C'
    }

});