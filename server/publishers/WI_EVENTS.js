Meteor.publish('pubpublicevents', function () {
	return WI_APP_EVENTS.find({
		event_is_private: false
	});
});

Meteor.publish('pubmyevents', function () {

	return WI_APP_EVENTS.find({
		'metadata.created_by': this.userId
	});
});

Meteor.publish('pubuserevents', function (username) {

	return WI_APP_EVENTS.find({
		'metadata.created_by_username': username,
		event_is_private: false
	});
});