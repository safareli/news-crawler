profiles = readDir app/profiles// or get from db
profiles
	.each(get target sites)
	.map(new Site)
		.each(getUrls)
		.filter(is uniq)
		.getData()
		.save()

profiles.each(register http handlers)

handlers
	.onrequest(get Data by profile)