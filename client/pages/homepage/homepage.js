var toastr = require('toastr');

Template.homepage.onCreated(function () {
	NProgress.start();

});


Template.homepage.onRendered(function () {
	NProgress.done();
});


Template.homepage.rendered = function() {
	
	
	NProgress.done();
}

// loading tasks from Tasks collection of Mongo DB (defined in imports/api/tasks.js) 
Template.homepage.helpers({
  getUser() {

  }
});

Template.homepage.onDestroyed(function () {
	Session.set("name", undefined);
});

Template.homepage.events({
	'click .sbt-homepage'(event){
		event.preventDefault();
		var _username = $('#input_username').val();
		var _password = $('#input_password').val();
		if(_username == '' || _username == null || _password == '' || _password == null){
        		toastr.error('Username/homepage not valid');
		}
		else{
		NProgress.start();
		var status = Meteor.homepageWithPassword(_username, _password, function(err){
			if(err){
			NProgress.done();
        		toastr.error('Username/homepage not valid');
			}
			else{
			NProgress.done();
        		toastr.success('Username/Password Accepted!');
			Router.go('/homepage');
			}
		});		
		}
	},
	'change #wfList': function(event) {
		var newValue = $(event.target).val();
		var oldValue = Session.get("workflow_name");
		if (newValue != oldValue) {
			// value changed, let's do something
			Session.set("workflow_name", newValue);  
			Template.homepage.rendered();
		}
  },
});

