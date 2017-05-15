var toastr = require('toastr');
var moment = require('moment');

Template.modalCreateEvent.onRendered(function () {
	//$("#ce_event_start_dt").val(moment(new Date()).format('DD/MM/YYYY'));
});

Template.modalCreateEvent.helpers({
	getMyEventList: function () {
		return WI_APP_EVENTS.find({
			'metadata.created_by': Meteor.userId()
		});
	},
});

Template.modalCreateEvent.events({
    'click .btn-create': function(event){
	// Prevent default browser form submit
    event.preventDefault();
	
	var info = Template.modalCreateEvent.getEventInfoFromForm();
	Meteor.call('createEvent', info, function( error, response ) { 
  		if ( error ) {
    		toastr.error('Create unsuccessful: ' + error);
  		} else {
			toastr.success('Create successful');
			
			//if successful, then update jstree
			var parentval = '#';
			if (info.root_event){
				parentval = info.root_event;
			}
			
			var _icon = "fa fa-check";
			if(!info.event_is_private){
				_icon = "fa fa-pencil";
			}

			var node = {
				id : info.event_name,
				text : "Name: " + info.event_name,
				icon : _icon
			};
			
			Template.eventtree.addNode(parentval, node, info.event_is_private);
		}
	});
  },
});

Template.modalCreateEvent.getEventInfoFromForm = function () {
	var info = {};
	
	info.event_name = $("#ce_event_name").val();
	info.event_desc = $("#ce_event_desc").val();
	info.event_location = $("#ce_event_location").val();
	info.event_is_private = $("#ce_event_is_private").is(':checked')? true : false;
	info.root_event = $("#ce_root_event").val();

	return info;
};
