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
    crawler = require('../lib/news-crawler'),
    data = require('./assets/data'),
    Q = require('q');


chai.use(chaiAsPromised);
chai.should();
describe('news-crawler module', function(){
    describe('#getUrls()', function(){
        it('should return array of urls', function(){
            return Q.all(data.getUrls.reduce(function(promises,args){
                var promise = crawler.getUrls.apply(crawler,args);
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
    describe('#getData()', function(){
        it('should return data object of news by url', function(){
            return Q.all(data.getData.reduce(function(promises,args){
                var promise = crawler.getData.apply(crawler,args);
                return promises.concat([
                    promise.should.be.fulfilled,
                    promise.should.eventually.have.keys(args[0].keys)
                ]);
            }, []));
        });
    });
});
