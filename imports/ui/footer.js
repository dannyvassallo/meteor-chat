import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor';

import './footer.html';

Template.footer.onRendered(function() {
  console.log('created');
});

