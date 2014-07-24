/*
 * news-crawler
 * https://github.com/safareli/news-crawler
 *
 * Copyright (c) 2014 irakli safareli
 * Licensed under the MIT license.
 */

'use strict';

var jsdom = require("jsdom");
var events = require('events');

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
    var eventEmitter = new events.EventEmitter();
    return jsdom.env(
        options.url,["http://code.jquery.com/jquery.js"],
        function (errors, window) {
            if(errors) return eventEmitter.emit('error',errors);
            var $ = window.jQuery, keys = ['image', 'title', 'description', 'url', 'site_name', 'type'];
            eventEmitter.emit('data',keys.reduce(function(data,key){
                var element, extra = options.extras[key], def = options.defaults[key],
                    res = $("meta[property=og:"+key+"]").attr("content");

                if(extra && (res.length === 0  || extra.important))
                    res = (extra.important)? extra.func($) : extra($);
                
                if(def && (res.length === 0  || def.important))
                    res = (def.important)? def.value : def;

                return data[key] = res, data;
            },{}));
            window.close();
        }
    ), eventEmitter;
};
