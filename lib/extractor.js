function getUndefined(){ return; };
var fs = require('fs'),
  path = require('path'),
  _Extractors = {};
function getExtractor(name,options){
  var fileName = path.join(process.cwd(),'./app/extractors/',name) + '.js';
	if( _Extractors[name] == null){
    if(!fs.existsSync(fileName)){
      throw new Error('extractor: '+name+' doesnot exists et =>' + fileName)
    }
		_Extractors[name] = require(fileName);
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

Extractor.build = function(type, options){
		var name = type+'.'+options.extractor;
		delete options.extractor;
    return getExtractor(name,options);
};
module.exports = Extractor