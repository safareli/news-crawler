var moment = require('moment');
moment.lang('ka');

module.exports = {
    getUrls:[
        [84516]
    ],
    getData:[
        [{
            url:'http://news.ge/ge/news/story/98883-batono-manana-tqvents-dagatsures',
            keys: ['image', 'title', 'description', 'url', 'site_name', 'category','date'],
            source: [ 'meta[property="og:{key}"]', 'attr', 'content'],
            extras: {
                date: function($,window){
                    return moment($('.info-date').text(), "DD MMMM HH:mm").lang('ka').unix();
                },
                category: function($,window){
                    return $('.cufonGeo').text();
                }
            }
        }]
    ]
};