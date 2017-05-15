//configure router
Router.configure({
  layoutTemplate: 'entry',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

//home
Router.route('/', {
	name: 'home',
  	onBeforeAction: function () {
		if(!Meteor.userId()){
			Router.go('login');
			this.next();
		}else{
			Router.go('homepage');
			this.next();
		}
	}
});

//login
Router.route('/login', {
 	name: 'login',
	layoutTemplate: 'entry',
	template: 'login',
  	onBeforeAction: function () {
		if(Meteor.userId())
		{
			Router.go('homepage');
		}else{
			this.next();
		}
	}
});

//register
Router.route('/register', {
 	name: 'register',
	layoutTemplate: 'entry',
	template: 'register',
  	onBeforeAction: function () {
		if(Meteor.userId())
		{
			Router.go('homepage');
		}else{
			this.next();
		}
	}
});

//homepage
Router.route('/home', {
	name: 'homepage',
	layoutTemplate: 'main',
	template: 'homepage',
  	onBeforeAction: function () {
		if(!Meteor.userId()){
			Router.go('login'); 
			this.next();
		}
		else {
			this.next();
		}
	},
	waitOn: function () {
		return [Meteor.subscribe('pubpublicevents'),Meteor.subscribe('pubmyevents')];		
	}
});

/* 
//USING GET PROFILE AS PARAMETER QUERY
Router.route("/profile",{
    name:'profile',
	layoutTemplate: 'main',
	template: 'profile',
    //controller:'profileController',
  	onBeforeAction: function () {
		if(!Meteor.userId()){
			Router.go('login'); 
			this.next();
		}
		else {
			this.next();
		}
	},
	waitOn: function () {
		//profile?username=asdf
		var _username = this.params.query.username;

        return Meteor.subscribe('pubprofile', _username);	
	},
	data: function(){
		var _username = this.params.query.username;
		
		return Meteor.users.findOne({
			username: _username
		});
	}
});
*/

// this is inefficient. FIX
Router.route("/profile/:username",{
    name:'profile',
	layoutTemplate: 'main',
	template: 'profile',
    //controller:'profileController',
  	onBeforeAction: function () {
		if(!Meteor.userId()){
			Router.go('login'); 
			this.next();
		}
		else {
			this.next();
		}
	},
	waitOn: function () {
		var _username = this.params.username;

        return [Meteor.subscribe('pubprofile', _username),Meteor.subscribe('pubuserevents', _username)];
	},
	data: function(){
		var _username = this.params.username;

		var resultDoc = Meteor.users.findOne({
			username: _username
		});
	}
}).get( function(){
	var _username = this.params.username;
	var resultDoc = Meteor.users.findOne({
			username: _username
	});
	
	Session.set('profile', _username);
	
	if(!resultDoc){
		Router.go('notfound'); 
		this.next();
	} else {
		this.next();
		this.render('profile');
	}
	
});

//not found -- SHOULD NOT BE USING THIS. USING FOR PROFILE NOT FOUND. NEED TO FIX
Router.route('/notfound', {
 	name: 'notfound',
	layoutTemplate: 'entry',
	template: 'notFound'
});


//homepage
Router.route('/events', {
	name: 'events',
	layoutTemplate: 'main',
	template: 'eventslist',
  	onBeforeAction: function () {
		if(!Meteor.userId()){
			Router.go('login'); 
			this.next();
		}
		else {
			this.next();
		}
	},
	waitOn: function () {
		return [Meteor.subscribe('pubpublicevents'),Meteor.subscribe('pubmyevents')];		
	}
});
