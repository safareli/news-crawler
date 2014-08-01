module.exports = {
	urlExtractors: [{
		extractor:'topge',
		id: '123456',
		minViews: 50
	}],
	dataExtractors: {
		date:{
			extractor:'date',
			selector: '.info-date',
			func: 'text',
			args: [],
			format: 'DD MMMM HH:mm'
			lang: 'ka'
		},
		category:{
			extractor:'jsimple',
			selector:'.cufonGeo',
			func:'text'
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
		description:{
			extractor:'ogtag',
			name:'description'
		},
		url:{
			extractor:'ogtag',
			name:'url'
		}
	}
};