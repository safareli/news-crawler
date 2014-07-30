var Extractor = require('../../lib/extractor.js');
module.exports = function(opt){
	return Extractor(function($){
		var $element = (opt.selector);
		return $element[opt.func].apply($element,opt.args == null ? [] : opt.args);
	});
}