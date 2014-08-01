module.exports = {
  urlFilter: {
    startsWith:'http://news.ge/ge/news/story'
  },
	urlExtractors: [{
		extractor:'topge',
		id: 77811,
		minViews: 20
	}],
	dataExtractors: {
		date:{
			extractor:'date',
			selector: '.info-date',
			func: 'text',
			args: [],
			format: 'DD MMMM HH:mm',
			lang: 'ka'
		},
		category:{
			extractor:'jsimple',
			selector:'.cufonGeo',
			func:'text'
		},
		image:{
			extractor:'ogtag',
			name:'image'
		},
		title:{
			extractor:'ogtag',
			name:'title'
		},
		url:{
			extractor:'ogtag',
			name:'url'
		},
		description:{
			extractor:'ogtag',
			name:'description'
		}
	}
};