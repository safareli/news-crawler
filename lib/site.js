var Extractor = require('./extractor'),
	jqdom = require("./jqdom");

function Site(options){
	this.urlExtractors = options.urlExtractors.map(function(extractor){
		return Extractor.build('url',extractor);
	});

	this.dataExtractors = Object.keys(options.dataExtractors).reduce(function(extractors,key){
		var extractor = options.dataExtractors[key];
		extractors[key] = Extractor.build('data'extractor);
		return extractors;
	}.bind(this),{});
}

Site.prototype.getUrls = function() {
	return Q.all(this.urlExtractors.map(function(urlExtractor){
		return urlExtractor.extract();
	}));
};

Site.prototype.getData = function (url) {
	return jqdom(url).then(function($,window){
		return Object.keys(this.dataExtractors).reduce(function(data,key){
			var dataExtractor = this.dataExtractors[key];
			data[key] = dataExtractor.extract($,window);
			return data;
		}.bind(this),{});
	}.bind(this));
};


module.exports = Site;