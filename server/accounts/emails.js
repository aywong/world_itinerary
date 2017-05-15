Accounts.emailTemplates.siteName = "World Itinerary";
Accounts.emailTemplates.from = "World Itinerary <admin@worlditinerary.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[World Itinerary] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = this.user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@worlditinerary.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};