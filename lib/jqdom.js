
var jsdom = require("jsdom"),
    Q = require('q');
module.exports = function(url){
    console.log(url);
    var deferred = Q.defer();
    return jsdom.env(url , ['http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'], function (errors, window) {
        deferred.promise.fin(window.close.bind(window));
        if(errors){
            console.log('errors',errors);
            deferred.reject(errors);
        } else {
            deferred.resolve(window.jQuery,window);
        }
    }), deferred.promise;
}
 