/*
 * news-crawler
 * https://github.com/safareli/news-crawler
 *
 * Copyright (c) 2014 irakli safareli
 * Licensed under the MIT license.
 */

'use strict';

var jqdom = require("./jqdom");

function log(){
    setTimeout(console.log.apply.bind(console.log,console,arguments), 100);
    return arguments[arguments.length - 1];
}

/*
options = {
    url:'String',
    keys:['image', 'title', 'description', 'url', 'site_name', 'type'],
    extras:{
        'key:String': 'Function($)' || {
            'important': 'Boolean',
            'func': 'Function($)'
        }
    },
    defaults:{
        'key:String': 'String' || {
            'important': 'Boolean',
            'value': 'String'
        }
    }
}*/
exports.getData = function (options) {
    return jqdom(options.url).then(function($,window){
        return options.keys.reduce(function(data,key,i){
            var extra = options.extras && options.extras[key],
                def = options.defaults && options.defaults[key],
                $el = $(options.source[0].replace('{key}',key)),
                res = $el[options.source[1]].apply($el,options.source.slice(2)) || "";

            if(extra && (res.length === 0  || extra.important))
                res = (extra.important)? extra.func($,window) : extra($,window);

            if(def && (res.length === 0  || def.important))
                res = (def.important)? def.value : def;

            return data[key] = res, data;
        },{});
    });
};

exports.getUrls = function (id) {
    return jqdom('http://www.top.ge/stat_req.php?ID='+id).then(function($){
        var selector = 'form[name="vau"]+table tr:not(:first):not(:last)';
        return $(selector).get().reduce(function(urls,tr){
            var $el = $(tr);
            return urls.concat.apply(urls,
                ($el.find('td:eq(1)').text()/*views*/ > 50) 
                    ? [$el.find('td:eq(2)').text()/*url*/]
                    : []);
        },[]);
    });
};