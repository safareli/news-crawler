var Extractor = require('../../lib/extractor.js');
var moment = require('moment');

module.exports = function(opt){
	return new Extractor(function($,window){
		var $element = $(opt.selector),
			date = $element[opt.func].apply($element,opt.args == null ? [] : opt.args);
    return moment(date, opt.format).locale(opt.lang).unix();
	}, +new Date); 
	/*TODO : es sheileba bagi iyos imito ro tu es funcqcia memorishi iyo es date uvargisia*/
};