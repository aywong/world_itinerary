var toastr = require('toastr');
var moment = require('moment');

Template.modalsettings.onRendered(function () {
	$("#event_end_dt").val(moment(new Date()).format('DD/MM/YYYY'));
});

Template.modalsettings.events({
    'click .btn-save': function(event){
	// Prevent default browser form submit
    event.preventDefault();
	var info = Template.modalsettings.getEndFromForm();
	if(!info.event_end_dt){
		toastr.error('Please select an end date above');
	} else {
		Meteor.call('editsettings', info, function( error, response ) { 
			if ( error ) {
				toastr.error('Update unsuccessful: ' + error);
			} else {
				toastr.success('Update successful');
				Session.set("eventEdit", false);
				Template.eventslist.documentLoad(info.event_name);
			}
		});
		
		$('#editsettings').modal('hide');
	}
  },
});

Template.modalsettings.getEndFromForm = function () {
	var info = Template.eventslist.getEventInfoFromForm();
	info.event_end_dt = $("#event_end_dt").val();
	
	return info;
};
