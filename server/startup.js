import { Meteor } from 'meteor/meteor';

Meteor.startup(function() {
   console.log('Running Startup Script');
  // code to run on server at start

  var home = process.env.HOME || process.env.USERPROFILE;
  var port = process.env.PORT;
  //tells Meteor to route all SMTP requests to this URL.
  var mail = process.env.MAIL_URL = "smtp://postmaster%40email.worlditinerary.com:f35d4f317de6de04c87f7aad2b9e9c0b@smtp.mailgun.org:587";

  console.log('Setting Home Path Variable');

  home = home.replace(/\\/g, "/");

  //Meteor.call('createDefaultUsers');
  console.log('Finished Initialization Settings & Startup Script...');

});


