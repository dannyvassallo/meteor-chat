Meteor.methods({
    'insertMessage': function(text){
        Message.insert({
            text: text,
            user: Meteor.user(),
            created_on: new Date().getTime()
        });
    }
});
