var toastr = require('toastr');

Template.modalSaveEventInfo.events({
    'click .btn-save': function(event){
	// Prevent default browser form submit
    event.preventDefault();
	var info = Template.eventslist.getEventInfoFromForm();
	Meteor.call('updateEvent', info, function( error, response ) { 
  		if ( error ) {
    		toastr.error('Update unsuccessful: ' + error);
  		} else {
			toastr.success('Update successful');
			Session.set("eventEdit", false);
			Template.eventslist.documentLoad(info.event_name);
			
			var parentval = '#';
			if (info.root_event){
				parentval = info.root_event;
			}
			
			var _icon = "fa fa-check";
			if(!info.event_is_private){
				_icon = "fa fa-pencil";
			}
			
			var nodeinfo = Template.eventtree.getNodeInfo(info.event_name);
			
			if(!(nodeinfo.parent === parentval)){
				var node = {
					id : info.event_name,
					text : Template.eventtree.getNodeText(info.event_name),
					icon : _icon
				};
				
				Template.eventtree.moveNode(parentval, node);
			}
			
			if(!(nodeinfo.icon === _icon)){
				Template.eventtree.changeIcon(info.event_name, _icon);
			}
		}
	});
  },
});