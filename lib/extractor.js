function getUndefined(){ return; };
var fs = require('fs'),
	_Extractors = {};
function getExtractor(name,options){
	//todo aq gaasxavs albat fileExistsSync
	var filename = './app/extractors/'+name;
	if( _Extractors[name] == null && fs.fileExistsSync(filename)){
		_Extractors[name] = require(filename);
	}
	return _Extractors[name](options);
}
function Extractor(func,def){
	if (typeof func !== 'function') {
		def = func;
		func = getUndefined;
	}
	this._function = func;
	this._default = def
}

Extractor.prototype.extract = function($,window) {
	var result = this._function($,window);
	return (result == null)  ? this._default : result;
};

Extractor.build = function(type, extractorOptions){
	return Object.keys(extractorOptions).reduce(function(extractors,key){
		var options = extractorOptions[key];
		var name = type+'.'+options.extractor;
		delete options.extractor;
		extractors[key] = getExtractor(name,options);
		return extractors;
	},{});
};
module.exports = Extractor