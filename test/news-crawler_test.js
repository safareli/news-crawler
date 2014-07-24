/*
 * news-crawler
 * https://github.com/safareli/news-crawler
 *
 * Copyright (c) 2014 irakli safareli
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai'),
    crawler = require('../lib/news-crawler.js'),
    data = require('./assets/data.js');
chai.should();
describe('news-crawler module', function(){
    describe('#getUrlsById()', function(){
        it('should return array of urls', data.each('getLinksById',function(args){
            var result = crawler.getLinksById.apply(crawler,args);
            result.should.be.array();
            //TODO: es ori xazi rog adaEBAS GAASWOREBS
            result.forEach(function(item){
                //sample regex for http or https url
                item.should.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})/i);
            });
        }));
    });
    describe('#getDataByUrl()', function(){
        it('should return array of urls', data.each('getLinksById',function(args){
            crawler.getLinksById.apply(crawler,args)
                .should.have.keys(['image', 'title', 'description', 'url', 'site_name', 'type', 'date']);
        }));
    });
});
