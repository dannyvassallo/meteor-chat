import { Meteor } from 'meteor/meteor';

import './navbar.html';

Template.navbar.onRendered(function() {
  console.log('created');
  $(".button-collapse").sideNav();
});

Template.navbar.helpers({
  'userLoggedIn': function(){
    return Meteor.user();
  }
});
