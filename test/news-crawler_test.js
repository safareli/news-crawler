/*
 * news-crawler
 * https://github.com/safareli/news-crawler
 *
 * Copyright (c) 2014 irakli safareli
 * Licensed under the MIT license.
 */

'use strict';
/*
var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    crawler = require('../lib/news-crawler.js'),
    data = require('./assets/data.js'),
    Q = require('q');


chai.use(chaiAsPromised);
chai.should();
describe('news-crawler module', function(){
    describe('#getUrlsById()', function(){
        it('should return array of urls', function(){
            [].should.satisfy(function(result) {
                console.log('[]',result.length);
                return true;
            });
            return Q.all(data.getUrlsById.map(function(args,i){
                console.log('starting request #',i,' args:',args);
                return crawler.getUrlsById.apply(crawler,args);
            }).reduce(function(promises,promise){
                return promises.concat([
                    promise.should.be.fulfilled,
                    promise.should.eventually.be.instanceof(Array),
                    promise.should.eventually.satisfy(function(result) {
                        return result.forEach(function(item){
                            //sample regex for http or https url
                            item.should.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})/i);
                        }), true;
                    })
                ]);
            },[]));
        });
    });
    describe('#getDataByUrl()', function(){
        it('should return data object of news by url', function(){
            var keys = ['image', 'title', 'description', 'url', 'site_name', 'type'];
            return Q.all(data.getDataByUrl.map(function(args){
                return crawler.getDataByUrl.apply(crawler,args);
            }).reduce(function(promises,promise){
                return promises.concat([
                    promise.should.be.fulfilled,
                    promise.should.eventually.have.keys(keys)
                ]);
            },[]));

        });
    });
});
*/