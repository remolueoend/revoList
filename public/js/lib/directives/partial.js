/**
 * Created by remo on 22/10/14.
 */

'use strict';

revoList.app.directive('partial', [function () {
    return {
        link: function(scope, element){
            document.title = revoList.appTitle + ' - ' + element.attr("title");
        },
        restrict: 'EC'
    }
}]);