var Extractor = require('./extractor'),
	jqdom = require("./jqdom"),
	Q = require('q');

function Site(options){
  //TODO urlextractor isnot extrractor needs to be fixed and use filter in it 
	this.urlExtractors = options.urlExtractors.map(function(extractor){
		return Extractor.build('url',extractor);
	});
  this.urlFilter = function(url){
    if(options.urlFilter && options.urlFilter.startsWith)
      return url.indexOf(options.urlFilter.startsWith) === 0;
    return true
  };
	this.dataExtractors = Object.keys(options.dataExtractors).reduce(function(extractors,key){
		var extractor = options.dataExtractors[key];
		extractors[key] = Extractor.build('data',extractor);
		return extractors;
	}.bind(this),{});
}

Site.prototype.getUrls = function() {
	return Q.all(this.urlExtractors.map(function(urlExtractor){
		return urlExtractor();
	})).then(function(urlsByExtractors){
    return urlsByExtractors.reduce(function(allUrls,ruls){
      return allUrls.concat(ruls);
    },[]).filter(function (value, index, self) { 
		    return self.indexOf(value) === index;
		}).filter(this.urlFilter).filter(function (value, index, self) { 
		    return self.indexOf(value) === index;
		});
	}.bind(this));
};

Site.prototype.getData = function (url) {
	return jqdom(url).then(function($,window){
		return Object.keys(this.dataExtractors).reduce(function(data,key){
			var dataExtractor = this.dataExtractors[key];
			data[key] = dataExtractor.extract($,window);
			return data;
    }.bind(this),{_originalUrl:url});
	}.bind(this));
};


module.exports = Site;