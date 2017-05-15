var toastr = require('toastr');

Template.modalDeleteEvent.onRendered(function () {

});


Template.modalDeleteEvent.helpers({
  selectedEvent: function () {
	if(Session.get("eventName")){
		return Session.get("eventName");
	}else{
		return "";
	}
  },
});

Template.modalDeleteEvent.events({
    'click .btn-delete': function(event){
		// Prevent default browser form submit
		event.preventDefault();

		var desc = [];
		var stack = [];
		var info = Template.eventslist.getEventIdFromForm();
		var first = WI_APP_EVENTS.findOne({_id: info.id});
		
		stack.push(first);
		desc.push(info);
		
		while(stack.length > 0){
			var currentnode = stack.pop();
			var cursor = WI_APP_EVENTS.find({root_event: currentnode.event_name});
			
			cursor.forEach(function(child){
				
				var info = {};	
				info.id = child._id;
				
				desc.push(info);
				stack.push(child);
			});
		}
		
		var deletecnt = 0;
		var length = desc.length;
		while(desc.length > 0){
			var currentnode = desc.pop();
			Meteor.call('deleteEvent', currentnode, function( error, response ) { 
				if ( error ) {
					toastr.error('Delete unsuccessful: ' + error);
				} else {
					deletecnt++;
					if (deletecnt === length){
						toastr.success('Delete successful: ' + deletecnt);
						Template.eventtree.deleteNode(Session.get("eventName"));
						Template.eventslist.clearDocument();
						Session.set("eventName", undefined);
					}
				}
			});	
		}
	},
});

