var jqdom = require("../../lib/jqdom");
module.exports = function (opt) {
    return jqdom('http://www.top.ge/stat_req.php?ID='+opt.id).then(function($){
        var selector = 'form[name="vau"]+table tr:not(:first):not(:last)';
        return $(selector).get().reduce(function(urls,tr){
            var $el = $(tr);
            return urls.concat.apply(urls,
                ($el.find('td:eq(1)').text()> opt.minViews) 
                    ? [$el.find('td:eq(2)').text()/*url*/]
                    : []);
        },[]);
    });
}