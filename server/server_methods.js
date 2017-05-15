import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
var moment = require('moment');

Meteor.methods({
   'sendVerificationLink': function(obj) {
		let userId = Meteor.userId();
		
		if ( userId ) {
			return Accounts.sendVerificationEmail( userId );
		}
  },
  'updateUser': function (obj) {
		if (Meteor.userId()) {
			try {              
				// Update account
				var result = Meteor.users.update(obj.id, {
						$set: {
							username: obj.username,
							profile: obj.profile
						}
					});

				// Update password
				if (obj.password != 'the same') {
					Accounts.setPassword(id, obj.password);
				}
				return result;
			} catch (err) {
				throw new Meteor.Error(500, "Invalid result: " + err);
			}

		} else {
			throw new Meteor.Error(403, "You are not authorized to perform this function");
		}
    },
	'validateUser': function(obj) {
		if (Meteor.userId()) {
			try {      
				/*			
				new SimpleSchema({
					_id: { type: String },
				}).validate(obj);
				*/
				if (user.username && user.username.length >= 3) {
					return true;
				} else {
					throw new Meteor.Error(403, 'Username must have at least 3 characters');
				}
			} catch (err) {
				throw new Meteor.Error(500, "Invalid result: " + err);
			}
		} else {
			throw new Meteor.Error(403, "You are not authorized to perform this function");
		}
	},
	'checkPassword': function(obj) {
		check(obj, String);
		
		if (Meteor.userId()) {
			var user = Meteor.user();
			var password = {digest: obj, algorithm: 'sha-256'};
			var result = Accounts._checkPassword(user, password);
		  
			return result.error == null;
		} else {
		  return false;
		}
	},
	//validate password method
	'updateEvent': function(obj) {

		if (Meteor.userId()) {
            try {
				var _username = Meteor.user().username;	
				
				var resultDocument = WI_APP_EVENTS.update({_id: obj.id}, {
					$set: {
						'metadata.last_modified_dt': new Date().toISOString(),
						'metadata.modified_by': Meteor.userId(),
						'metadata.modified_by_username': _username,
						event_name: obj.event_name,
						event_desc: obj.event_desc,
						event_location: obj.event_location,		
						event_is_private: obj.event_is_private,
						root_event: obj.root_event
					}
				});
				
				return resultDocument;
            } catch (err) {
                	throw new Meteor.Error(500, "Invalid result: " + err);
            }
        } else {
            	throw new Meteor.Error(403, "You are not authorized to perform this function");
        }
    },
	'createEvent': function(obj) {
	if (Meteor.userId()) {
            try {
				var _username = Meteor.user().username;
				
				//console.log(obj);
				var resultDocument = WI_APP_EVENTS.insert({ 
					metadata: {
						created_at: new Date().toISOString(),
						created_by: Meteor.userId(),
						created_by_username: _username,
						last_modified_dt: new Date().toISOString(),
						modified_by: Meteor.userId(),
						modified_by_username: _username 
					}, 
					event_name: obj.event_name,
					event_desc: obj.event_desc,
					event_location: obj.event_location,
					event_is_private: obj.event_is_private,
					root_event: obj.root_event
				});
				
				return resultDocument;

            } catch (err) {
                	throw new Meteor.Error(500, "Invalid result: " + err);
            }
        } else {
            	throw new Meteor.Error(403, "You are not authorized to perform this function");
        }
    },
	'deleteEvent': function(obj) {
	 if (Meteor.userId()) {
            try {
                var _result = WI_APP_EVENTS.remove({
                    _id: obj.id
                });
                
				return _result;
            } catch (err) {
                throw new Meteor.Error(500, "Invalid result: " + err);
            }

        } else {
            throw new Meteor.Error(403, "You are not authorized to perform this function");
        }

    },
});