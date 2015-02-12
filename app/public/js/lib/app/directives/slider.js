/**
 * Created by remo on 15/12/14.
 */

'use strict';

revoList.app.directive('slider', ['player', function(player){

    var _link = function(scope, elem, attr){
            var sliderInstance = $(elem).slider({
            formatter: function(raw){
                var hr = raw % 3600,
                    h = (raw - hr) / 3600,
                    mr = hr % 60,
                    m = (hr - mr) / 60;

                return (h !== 0 ? h + ':' : '') + (m > 9 ? m : '0' + m) + ':' + (mr > 9 ? mr : '0' + mr);
            }
        });
        sliderInstance.slider('setValue', 0);

        var durationSet = false,
            isSliding = false;

        player.on('trackLoaded', function(track){
            sliderInstance.slider('setValue', 0);
            durationSet = false;
        });
        player.on('progress', function(prog){
            if(!durationSet){
                sliderInstance.slider('setAttribute', 'max', prog.duration);
                if(prog.duration){
                    durationSet = true;
                }
            }
            if(!isSliding){
                sliderInstance.slider('setValue', prog.current);
            }
        });

        sliderInstance.slider('on', 'slideStart', function(e){
            isSliding = true;
        });

        sliderInstance.slider('on', 'slideStop', function(e){
            isSliding = false;
            player.seekTo(e.value);
        });
    };

    return {
        restrict: 'EAC',
        link: _link
    }

}]);