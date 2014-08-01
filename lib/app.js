var fs = require('fs');
var Q = require('q');
var path = require('path');
var Site = require('./site');


var DIR = {
	profiles: './app/profiles',
	sites: './app/sites'
};
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
function loadFilesByDir(dir){
	if (!fs.lstatSync(dir).isDirectory()) {
		throw new Error(dir + 'is not dir');
	}

	return fs.readdirSync(dir).filter(function (filename) {
		return filename == '.' || filename == '..' ? false: true;
	}).reduce(function(files, filename){
		filename = path.join(process.cwd(),dir, filename);
		fileKey = path.basename(filename,'.js')
		files[fileKey] = require(filename);
		return files;
	},{})
}
var profiles = loadFilesByDir(DIR.profiles);

console.log('profiles => ',profiles);
var sites = Object.keys(profiles).reduce(function(sites,key){
	return sites.concat(profiles[key].sites);
},[]).filter(onlyUnique).reduce(function(sites,siteName,i,arre){
	sites[siteName]= new Site(require(path.join(process.cwd(),DIR.sites,siteName)))
	return sites;
},{});

console.log('sites => ',Object.keys(sites));

Q.all(Object.keys(sites).map(function(siteName){
	return sites[siteName].getUrls().then(function(urls){
		return {
			siteName:siteName,
			urls:urls
		}
	});
})).then(function(groups){
	return Q.all(groups.reduce(function(urls,group){
		return urls.concat(group.urls.map(function(url){
			return sites[group.siteName].getData(url);
		}));
	},[]));
}).then(function(data){
  console.log(data);
});

/*TODO 
	.save()

profiles.each(register http handlers)

handlers
	.onrequest(get Data by profile)*/