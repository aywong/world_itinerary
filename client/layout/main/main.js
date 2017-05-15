var toastr = require('toastr');
Template.main.rendered = function () {

};

// loading tasks from Tasks collection of Mongo DB (defined in imports/api/tasks.js) 
Template.main.helpers({
  getUser: function () {
	var user = {};
	user.email = Meteor.user().emails[0].address;
	user.username = Meteor.user().username;
	return user;
  }
});
	
	
Template.main.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
		Router.go('login');
    },
	'click .resend-verification' ( event, template ) {
    Meteor.call( 'sendVerificationLink', ( error, response ) => {
		if ( error ) {
			toastr.error(error.reason);
		} else {
			let email = Meteor.user().emails[ 0 ].address;
			toastr.error('Verification sent to ${ email }!');
		}
    });
  },
  'click .help': function(event){
	// Prevent default browser form submit
    event.preventDefault();
	
	//Session.set("eventEdit", false);
	$('#helpinfo').modal('show');
  },
  'click .settings': function(event){
	// Prevent default browser form submit
    event.preventDefault();
	
	//Session.set("eventEdit", false);
	$('#editsettings').modal('show');
  },
});