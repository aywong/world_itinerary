WI_APP_EVENTS = new Mongo.Collection('WI_APP_EVENTS');
const MetaDataSchema = new SimpleSchema({
  'created_at': {
    type: String,
    optional: true
  },
  'last_modified_dt': {
    type: String,
    optional: true
  },
  'modified_by': {
    type: String,
    optional: true
  },
  'modified_by_username': {
    type: String,
    optional: true
  },
  'created_by_username': {
    type: String,
    optional: true
  },
  'created_by': {
    type: String,
    optional: true
  }
});


WI_APP_EVENTS.attachSchema(new SimpleSchema({
 'metadata': {
	 type: MetaDataSchema,
	 optional: true
 },
'event_name': {
	 type: String,
	 optional: false,
	 unique: true
 },
'event_desc': {
	 type: String,
	 optional: true
 },
'event_location': {
	 type: String,
	 optional: true
 },
'event_is_private': {
	 type: Boolean,
	 defaultValue: true,
	 optional: false
 },
 'root_event': {
	 type: String,
	 optional: true
 }
}));