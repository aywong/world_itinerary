var toastr = require('toastr');

Template.profile.onCreated(function () {
	NProgress.start();

});


Template.profile.onRendered(function () {
	
	
	NProgress.done();
});


Template.profile.rendered = function() {
	
	
	NProgress.done();
}

// loading tasks from Tasks collection of Mongo DB (defined in imports/api/tasks.js) 
Template.profile.helpers({
  getProfile: function () {
	
	  
	var resultDoc = Meteor.users.findOne({
		username: Session.get('profile')
	});
	
	var user = {};
	user.username = resultDoc.username;
	user.email = resultDoc.emails[0].address;
	
	//console.log(resultDoc);
	return user;
  },
	getMyEventList: function () {
		return WI_APP_EVENTS.find({
			'metadata.created_by_username': Session.get('profile')
		});
	},
});

Template.profile.onDestroyed(function () {
	Session.set('profile', undefined);
});

Template.profile.events({

});

