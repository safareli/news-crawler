/*
 * news-crawler
 * https://github.com/safareli/news-crawler
 *
 * Copyright (c) 2014 irakli safareli
 * Licensed under the MIT license.
 */

'use strict';

var jsdom = require("jsdom");
var Q = require('q');

/*
options = {
    url:'String',
    extras:{
        'key:String': 'Function($)' || {
            'important': 'Boolean'
            'func': 'Function($)'
        }
    },
    defaults:{
        'key:String': 'String' || {
            'important': 'Boolean'
            'value': 'String'
        }
    }
*/
function log(data){
    return console.log(data),data;
}
exports.getDataByUrl = function (options) {
    var deferred = Q.defer();
    return jsdom.env(
        options.url,["http://code.jquery.com/jquery.js"],
        function (errors, window) {
            if(errors){
                deferred.reject(errors);
            } else {
                var $ = window.jQuery, keys = ['image', 'title', 'description', 'url', 'site_name', 'type'];
                deferred.resolve(log(keys.reduce(function(data,key){
                    var extra = options.extras && options.extras[key], def = options.defaults && options.defaults[key],
                        res = $('meta[property="og:'+key+'"]').attr("content");
    
                    if(extra && (res.length === 0  || extra.important))
                        res = (extra.important)? extra.func($) : extra($);
                    
                    if(def && (res.length === 0  || def.important))
                        res = (def.important)? def.value : def;
    
                    return data[key] = res, data;
                },{})));
            }
            window.close();
        }
    ), deferred.promise;
};
