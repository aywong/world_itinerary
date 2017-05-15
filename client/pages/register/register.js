var toastr = require('toastr');

Template.register.onCreated(function () {
	NProgress.start();

});

Template.register.onRendered(function () {
	NProgress.done();
});

Template.register.onDestroyed(function () {
	Session.set("name", undefined);
});

Template.register.events({
  'submit form'(event){
		event.preventDefault();
		NProgress.start();
		
		//still  need to validate password 
		var user = {};
		user.email = $('#in_email').val();
		user.username = $('#in_username').val();
		
		var _password = $('#in_password').val();
		var _password2 = $('#in_password2').val();
		
		if (user.email == '' || user.username == '' || _password == '' || _password2 == '' || user.email == null || user.username == null || _password == null || _password2 == null) {
        	toastr.error('Please fill in all fields');
			NProgress.done();
		} else {
			if (_password == _password2){
				var digest = Package.sha.SHA256(_password);

				Accounts.createUser({
					email: user.email,
					username: user.username,
					password: _password
				}, function (error) {
					if (error) {
						toastr.error(error.reason);
						NProgress.done();
					} else {
						toastr.success('Success');
						NProgress.done();
						Router.go('home');
					}
				});
			} else {
				toastr.error('Passwords dont match');
			}
		}
	}
});

