module.exports = {
	urlExtractors: [{
		extractor:'topGe',
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
			extractor:'jSimple',
			selector:'.cufonGeo',
			func:'text'
		},
		category:{
			extractor:'jSimple',
			selector:'.cufonGeo',
			func:'text'
		},
		image:{
			extractor:'ogTag',
			name:'image'
		},
		title:{
			extractor:'ogTag',
			name:'title'
		},
		description:{
			extractor:'ogTag',
			name:'description'
		},
		url:{
			extractor:'ogTag',
			name:'url'
		}
	}
};