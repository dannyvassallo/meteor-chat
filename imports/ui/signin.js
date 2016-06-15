import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor';

import './signin.html';

Template.signIn.onRendered(function() {
  console.log('created');
});

Template.signIn.events({
  'click #at-signUp': function(){
    Router.go('sign-up');
  }
});
