Router.configure({
  layoutTemplate: 'masterLayout',
  yieldTemplates: {
      navbar: {to: 'navbar'},
      footer: {to: 'footer'},
  }
});

Router.map(function(){
  this.route('/', {
    path: '/',
    template: 'home',
    layoutTemplate: 'masterLayout',
  });
  // Sign In Route
  AccountsTemplates.configureRoute('signIn', {
      name: 'signIn',
      path: '/sign-in',
      template: 'signIn',
      layoutTemplate: 'masterLayout',
      redirect: '/',
  });
  // Sign Up Route
  AccountsTemplates.configureRoute('signUp', {
      name: 'signUp',
      path: '/sign-up',
      template: 'signUp',
      layoutTemplate: 'masterLayout',
      redirect: '/',
  });
  // Sign Out Route
  this.route('/sign-out', function(){
      Meteor.logout(function(err) {
          if (err) alert('There was a problem logging you out.');
          Router.go("/");
      });
      Router.go("/");
  });
  // adjust user fields
  AccountsTemplates.removeField('email');
  var pwd = AccountsTemplates.removeField('password');
  AccountsTemplates.addFields([
    {
        _id: "username",
        type: "text",
        displayName: "username",
        required: true,
        minLength: 5,
    },
  ]);
  AccountsTemplates.addField(pwd);
});

