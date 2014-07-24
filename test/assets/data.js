var data = {
    getUrlsById:[
        //[arguments]
        [84516],//http://www.top.ge/stats.php?ID=84515
    ],
    getDataByUrl:[
        ['http://news.ge/ge/news/story/98560-zrdiloba-itsode-da-istsavle-rogor-unda-ilaparako-deputatebs-shoris-garchevebi-parlamentshi']
    ]
};
module.exports.each = function(functionName,func){
    return data[functionName].forEach.bind(data[functionName],function(element, index, array){
        func.apply(undefined,element.concat(index))
    })
};