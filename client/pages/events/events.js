var toastr = require('toastr');

Template.eventslist.onCreated(function () {
	NProgress.start();
	
});


Template.eventslist.onRendered(function () {
	NProgress.set(0.2);
	Session.set("eventEdit", false);
	
	NProgress.done();
});


Template.eventslist.rendered = function() {
	
	
	NProgress.done();
}

// loading tasks from Tasks collection of Mongo DB (defined in imports/api/tasks.js) 
Template.eventslist.helpers({
	getMyEventList: function () {
		return WI_APP_EVENTS.find({
			'metadata.created_by': Meteor.userId()
		});
	},
	selectedEvent: function () {
		if(Session.get("eventName")){
			return Session.get("eventName");
		}else{
			return "";
		}
	},
	isEdit: function () {
		if(Session.get("eventEdit")){
			return Session.get("eventEdit");
		}
	},
	isDisabled: function () {
		return Session.get("eventEdit") ? '' : 'disabled';
	},
	isMine: function () {
		var createdby = WI_APP_EVENTS.findOne({
				event_name: Session.get("eventName")
			}, {
				fields:{
					'metadata.created_by':1
				}
		});
		
		if(createdby){
			if(createdby.metadata.created_by == Meteor.userId()){
				return true;
			} else {
				return false;
			}	
		} else {
			return false;
		}

	},
});

Template.eventslist.onDestroyed(function () {
	Session.set("eventEdit", undefined);
	Session.set("eventName", undefined);
});

Template.eventslist.events({
	'click .tree': function(event){
	// Prevent default browser form submit
	event.preventDefault();

	// Get value from form element
	const event_name = event.target.id.replace("_anchor","");
		if(event_name){
			Session.set("eventName", event_name);
			Session.set("eventEdit", false);
			Template.eventslist.documentLoad(event_name);
		}
	},
	'click .search-btn': function(event){
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		$("#tree").jstree(true).search($("#query").val());
	},
	'click .mysearch-btn': function(event){
		// Prevent default browser form submit
		event.preventDefault();

		// Get value from form element
		$("#mytree").jstree(true).search($("#myquery").val());
	},
	'click #edit-link': function(event){
		// Prevent default browser form submit
		event.preventDefault();

		Session.set("eventEdit", true);
	},
	'click .save-event-btn': function(event){
		// Prevent default browser form submit
		event.preventDefault();
		
		//Session.set("eventEdit", false);
		$('#saveEventInfo').modal('show');
	},
});

Template.eventslist.clearDocument = function () {
	$('#eid_event_name').val("");
	$('#eid_event_desc').val("");
	$('#eid_event_location').val("");
	$('#eid_event_is_private').val("");
	$('#eid_root_event').val("");

	$('#eid_created_at').val("");
	$('#eid_created_by_username').val("");
	$('#eid_last_modified_dt').val("");
	$('#eid_modified_by_username').val("");
	$('#eid_id').val("");
};

Template.eventslist.getEventIdFromForm = function () {
	var info = {};	
	info.id = $("#eid_id").val();
	return info;
};

Template.eventslist.getEventInfoFromForm = function () {
	var info = {};
	info.id = $("#eid_id").val();
	info.event_name = $('#eid_event_name').val();
	info.event_desc = $('#eid_event_desc').val();
	info.event_location = $('#eid_event_location').val();
	info.event_is_private = $('#eid_event_is_private').is(':checked')? true : false;
	info.root_event = $('#eid_root_event').val();
	return info;
};

Template.eventslist.documentLoad = function (event_name) {
    var eventDoc = WI_APP_EVENTS.findOne({event_name: event_name});
	
	if(eventDoc){
		if(eventDoc.event_name){
			$('#eid_event_name').val(eventDoc.event_name);
		} else {
			$('#eid_event_name').val("");
		}
		if(eventDoc.event_desc){
			$('#eid_event_desc').val(eventDoc.event_desc);
		} else {
			$('#eid_event_desc').val("");
		}
		if(eventDoc.event_location){
			$('#eid_event_location').val(eventDoc.event_location);
		} else {
			$('#eid_event_location').val("");
		}
		if(eventDoc.event_is_private){
			$('#eid_event_is_private').prop('checked', true);
		} else {
			$('#eid_event_is_private').prop('checked', false);
		}
		if(eventDoc.root_event){
			$('#eid_root_event').val(eventDoc.root_event);
		} else {
			$('#eid_root_event').val("");
		}
	}
	
	if(eventDoc.metadata){
		if(eventDoc.metadata.created_at){
			$('#eid_created_at').val(eventDoc.metadata.created_at);
		} else {
			$('#eid_created_at').val("");
		}
		if(eventDoc.metadata.created_by_username){
			$('#eid_created_by_username').val(eventDoc.metadata.created_by_username);
		} else {
			$('#eid_created_by_username').val("");
		}
		if(eventDoc.metadata.last_modified_dt){
			$('#eid_last_modified_dt').val(eventDoc.metadata.last_modified_dt);
		} else {
			$('#eid_last_modified_dt').val("");
		}
		if(eventDoc.metadata.modified_by_username){
			$('#eid_modified_by_username').val(eventDoc.metadata.modified_by_username);
		} else {
			$('#eid_modified_by_username').val("");
		}
		if(eventDoc._id){
			$('#eid_id').val(eventDoc._id);
		} else {
			$('#eid_id').val("");
		}
	}
};

Template.eventslist.eventsLoad = function (ismine) {
    
	var eventsdata;
	
	if(ismine){
		eventsdata = WI_APP_EVENTS.find({
			'metadata.created_by': Meteor.userId()
		}).fetch();
	} else {
		eventsdata = WI_APP_EVENTS.find({
			event_is_private: false
		}).fetch();
	}

	var treenodes = [];
	
	for (var i = 0; i < eventsdata.length; i++) {
		var parentval = "#";
		if(eventsdata[i].root_event){
			parentval = eventsdata[i].root_event;
		}
		
		var _icon = "fa fa-check";
		if(!eventsdata[i].event_is_private){
			_icon = "fa fa-pencil";
		}
		
		//var _date = eventsdata[i].event_start_dt;

		var _name = eventsdata[i].event_name;
		
		var node = {
			id : eventsdata[i].event_name,
			parent : parentval,
			text : "Name: " + _name,
			icon : _icon
		};
		treenodes.push(node);
	}
	
	
	
	if(ismine){
		$('#mytree').jstree({ 
			core: { 
				check_callback : true, // enable all modifications
				data : treenodes
			},
			plugins : ["search"]
	   }); 
	} else {
		$('#tree').jstree({ 
			core: { 
				check_callback : true, // enable all modifications
				data : treenodes
			},
			plugins : ["search"]
	   }); 
	}
	
	


};


//EVENTTREE TEMPLATE START


Template.eventtree.addNode = function (root, obj, is_private) {
	
	if(!is_private){
		$.jstree.reference('#tree').create_node(root, obj, 'first',  function(){
			//toastr.success("Jstree Updated!");
		});
	}
	
	$.jstree.reference('#mytree').create_node(root, obj, 'first',  function(){
		//toastr.success("Jstree Updated!");
	});
};

Template.eventtree.deleteNode = function (node_name) {
	$('#tree').jstree("deselect_all");
	$.jstree.reference('#tree').select_node(node_name);
	var node = $.jstree.reference('#tree').get_selected();
	$.jstree.reference('#tree').delete_node(node);	
	
	
	$('#mytree').jstree("deselect_all");
	$.jstree.reference('#mytree').select_node(node_name);
	var node = $.jstree.reference('#mytree').get_selected();
	$.jstree.reference('#mytree').delete_node(node);	
};

Template.eventtree.changeIcon = function (node_name, icon) {
	$.jstree.reference('#tree').set_icon(node_name, icon,  function(){
		//toastr.success("Jstree Updated!");
	});
};

Template.eventtree.changeText = function (node_name, text) {
	$.jstree.reference('#tree').set_text(node_name, text,  function(){
		//toastr.success("Jstree Updated!");
	});
};

Template.eventtree.moveNode = function (root, obj) {
	
	// move_node doesnt work if moving to root # (works otherwise)
	if(root === "#"){
		Template.eventtree.deleteNode(obj.id);
		Template.eventtree.addNode(root, obj);
	} else {
		$.jstree.reference('#tree').move_node(obj, root, 'first', function(){
		//toastr.success("Jstree node moved!");
		});
	}	
};

Template.eventtree.getNodeInfo = function (node_name) {
	$('#tree').jstree("deselect_all");
	$.jstree.reference('#tree').select_node(node_name);
	var node = $.jstree.reference('#tree').get_selected();
	var info = {};
	info.parent = $.jstree.reference('#tree').get_parent(node);
	info.icon = $.jstree.reference('#tree').get_icon(node);
	
	return info;
};

Template.eventtree.getNodeText = function (node_name) {
	$('#tree').jstree("deselect_all");
	$.jstree.reference('#tree').select_node(node_name);
	var node = $.jstree.reference('#tree').get_selected();
	return $.jstree.reference('#tree').get_text(node);	
};

Template.eventtree.onRendered(function () {
	Template.eventslist.eventsLoad(false);
});

Template.myeventtree.onRendered(function () {
	Template.eventslist.eventsLoad(true);
});