var toastr = require('toastr');

Template.login.onCreated(function () {
	NProgress.start();

});

Template.login.onRendered(function () {
	NProgress.done();
});

Template.login.onDestroyed(function () {
	Session.set("name", undefined);
});

Template.login.events({
  'submit form'(event){
		event.preventDefault();
		NProgress.start();
		var _em = $('#in_email').val();
		var _pw = $('#in_password').val();
		
		if (_em == '' || _pw == '' || _em == null || _pw == null) {
        	toastr.error('Fill in all fields');
			NProgress.done();
		} else {
			Meteor.loginWithPassword(_em, _pw, function (error) {
					if(error){
						toastr.error(error.reason);
						NProgress.done();
					}
					else{
						toastr.success('Success');
						NProgress.done();
						Router.go('/homepage');
					}
			});		
			
		}
	}
});

