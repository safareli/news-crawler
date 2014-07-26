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

function log(){
    
    setTimeout(
        console.log.apply.bind(console.log,console,arguments)
    , 100);
    return arguments[arguments.length - 1];
}

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
exports.getDataByUrl = function (options) {
    var deferred = Q.defer();
    return jsdom.env(
        options.url,["http://code.jquery.com/jquery.js"],
        function (errors, window) {
            if(errors){
                deferred.reject(errors);
            } else {
                var $ = window.jQuery, keys = ['image', 'title', 'description', 'url', 'site_name', 'type'];
                deferred.resolve(keys.reduce(function(data,key,i){
                    var extra = options.extras && options.extras[key], def = options.defaults && options.defaults[key],
                        res = $('meta[property="og:'+key+'"]').attr("content");
                    if(extra && (res.length === 0  || extra.important))
                        res = (extra.important)? extra.func($) : extra($);
                    
                    if(def && (res.length === 0  || def.important))
                        res = (def.important)? def.value : def;
    
                    return data[key] = res, data;
                },{}));
            }
            window.close();
        }
    ), deferred.promise;
};

exports.getUrlsById = function (id) {
    var deferred = Q.defer();
    return jsdom.env(
        log('http://www.top.ge/stat_req.php?ID='+id),["http://code.jquery.com/jquery.min.js"],
        function (errors, window) {
            console.log("starting parse ID",id);
            if(errors){
                deferred.reject(errors);
            } else {
                var $ = window.jQuery;
                deferred.resolve($('form[name="vau"]+table tr:not(tr:eq(0))').get().reduce(function(urls,tr){
                    var $el = $(tr);
                    return urls.concat.apply(urls,
                        ($el.find('td:eq(1)').text()/*views*/ > 50) 
                            ? [$el.find('td:eq(2)').text()/*url*/]
                            : []);
                },[]));
            }
            window.close();
        }
    ), deferred.promise;
};