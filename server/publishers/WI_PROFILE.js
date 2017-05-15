Meteor.publish('pubprofile', function (username) {
	// user with username
	var resultDoc = Meteor.users.findOne({
		username: username
	}, {
		fields:{
			_id:1
		}
	});
	
	//console.log(this.userId);
	//console.log(resultDoc);
	
	
	if (resultDoc) {
		if(this.userId == resultDoc._id) {
			//return your entire document (with cursor)
			resultDoc = Meteor.users.find({
				_id: this.userId
			});	
			
			return resultDoc;
		} else {
			//fetch only the profile
			var pubuser = Meteor.users.find({
				username: username
			}, {
				fields:{
					username:1,
					emails:1
					//profile:
				}
			});
			return pubuser;
		}
	} else {
		//can't find user
		this.ready();
		return;
	}
});