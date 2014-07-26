/*
 * news-crawler
 * https://github.com/safareli/news-crawler
 *
 * Copyright (c) 2014 irakli safareli
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    crawler = require('../lib/news-crawler.js'),
    data = require('./assets/data.js'),
    Q = require('q');


chai.use(chaiAsPromised);
chai.should();
describe('news-crawler module', function(){
    /*describe('#getUrlsById()', function(){
        it('should return array of urls', data.each('getUrlsById',function(args){
            var result = crawler.getUrlsById.apply(crawler,args);
            result.should.be.array();
            //TODO: es ori xazi rog adaEBAS GAASWOREBS
            result.forEach(function(item){
                //sample regex for http or https url
                item.should.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})/i);
            });
        }));
    });*/
    describe('#getDataByUrl()', function(){
        it('should return data object of news by url', function(){
            //todo date ar modis da davaimplementiro
            var keys = ['image', 'title', 'description', 'url', 'site_name', 'type', 'date'];
            return Q.all(data.getDataByUrl.map(function(){
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
