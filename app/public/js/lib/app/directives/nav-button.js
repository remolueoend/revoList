/**
 * Created by remo on 23/12/14.
 */

'use strict';

revoList.app.directive('navButton', ['$location', function($location){

    function link(scope, elem, attr){
        scope.$on('$routeChangeSuccess', function(){
            if($location.path() === $(elem).attr('href')){
                $(elem).addClass('active');
            }else{
                $(elem).removeClass('active');
            }
        });
    }

    return {
        restrict: 'CAE',
        link: link
    }

}]);