import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor';

import './signup.html';

Template.signUp.onRendered(function() {
  console.log('created');
});

Template.signUp.events({
  'click #at-signIn': function(){
    Router.go('signin');
  }
});
