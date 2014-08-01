var Extractor = require('../../lib/extractor.js');
module.exports = function(opt){
	return new Extractor(function ($){
		return $('meta[property="og:'+opt.name+'"]').attr('content');
	});
}