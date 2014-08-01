var Extractor = require('../../lib/extractor.js');
module.exports = function(opt){
	return new Extractor(function($){
  	var $element = $(opt.selector);
    return $element[opt.func].apply($element,opt.args == null ? [] : opt.args);
	});
}