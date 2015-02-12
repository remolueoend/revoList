/**
 * Created by remo on 30/01/15.
 */

var fs = require('fs'),
    path = require('path'),
    deferred = require('deferred');

module.exports = (function(){

    var cfg = {},
        cfgPath = path.join(__dirname, 'config.json'),
        updated = false;

    /**
     * Checks the config file for updates and returns a promise
     * resolving the parsed config.
     * @returns {d.promise}
     */
    function update(){
        var d = deferred();

        if(updated){
            d.resolve(cfg);
        }else{
            fs.readFile(cfgPath, function(err, data){
                if(err) return;
                cfg = JSON.parse(data);

                d.resolve(cfg);
            });
        }

        return d.promise;
    }

    fs.watch(cfgPath, function(event, fileName){
        if(event === 'change'){
            updated = false;
            update();
        }
    });

    /**
     * Returns a promise resolving the app config.
     */
    return function config(){
        return update();
    }

})();

