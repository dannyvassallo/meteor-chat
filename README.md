#Meteor Chat Project

### Step 1: Install Meteor
For OSX:
```
curl https://install.meteor.com/ | sh
```

For Windows:
```
Visit: https://www.meteor.com/install
```

### Step 2: Create and start your project
```
meteor create meteor-chat
cd meteor-chat
meteor
```

```
Visit: http://localhost:3000/
```

### Step 3: Strip Out Boilerplate

Replace existing content with the following:


```html
<!-- client/main.html -->
<head>
  <title>A Simple Meteor Chat App</title>
</head>

```

```javascript
// client/main.js
import '../imports/ui/home.js';
```

Create a new folder called imports. Inside "imports", create a folder called "ui".

```html
<!-- imports/ui/home.html -->
<body>
  {{> home}}
</body>

<template name="home">
  <p>There is content here</p>
</template>
```

```javascript
//imports/ui/home.js

import './home.html';


Template.home.onCreated(function homeOnCreated() {

});

Template.home.helpers({

});

Template.home.events({

});
```



### Step 4: Add Users

Add User Accounts:
```
meteor add accounts-ui accounts-password
```

```html
<!-- imports/ui/home.html -->
<body>
  {{> loginButtons}}
  {{> home}}
</body>

<template name="home">
  <p>There is content here</p>
</template>

```

Configure accounts-ui:


Create a file `imports/startup/accounts-config.js`

```javascript
//imports/startup/accounts-config.js
import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
```

```javascript
//client/main.js
import '../imports/startup/accounts-config.js';
import '../imports/ui/home.js';
```

```javascript
//imports/ui/body.js:line1
import { Meteor } from 'meteor/meteor';
```


Create a user and open the console:
```javascript
Meteor.userId();
//should return => "J8iYQwkZiKxe9pTLt"
```


### Step 5: Make A Collection

Create a folder called `lib`. Put a file inside called `collections.js` with the following contents:

```javascript
Message = new Mongo.Collection('messages');
```

Create a file called `methods` in the server folder

```javascript
//server/methods.js
Meteor.methods({
    'insertMessage': function(text){
        Message.insert({
            text: text,
            user: Meteor.user(),
            created_on: new Date().getTime()
        });
    }
});
```
Add the form to the page:

```html
<!-- imports/ui/home.html -->
<body>
  {{> loginButtons}}
  {{> home}}
</body>

<template name="home">
  <h1>Current Messages</h1>
  <ul id="message-container">
    {{#each message}}
      <li>{{this.user.username}} - {{this.text}}</li>
    {{/each}}
  </ul>
  {{#if userLoggedIn}}
  <h2>Create a message</h2>
    <form id="new-msg">
      <input name="message" type="text">
      <button>Submit</button>
    </form>
  {{/if}}
</template>
```

Setup events and helpers:

```javascript
//imports/ui/home.js
import { Meteor } from 'meteor/meteor';

import './home.html';

Template.home.onRendered(function() {
  console.log('created');
});

Template.home.helpers({
  'message' : function(){
    return Message.find({}, {sort: {created_on: -1}, limit: 10}).fetch().reverse();
  },
  'userLoggedIn': function(){
    return Meteor.user();
  }
});

Template.home.events({
  "submit #new-msg": function(e){
    e.preventDefault();
    var message = $("[name='message']").val();
    Meteor.call('insertMessage', message);
    setTimeout(function(){
      $("[name='message']").val('');
    }, 100);
  }
});
```

### Step 6: Materialize

To get materialize setup add these lines to `.meteor/packages`:

```javascript
fourseven:scss
poetic:materialize-scss
```

Add this line to your `client/main.html`
```
     <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
     ```

Rename `client/main.css` to `client/main.scss`

Add these contents:

```scss
@import "{poetic:materialize-scss}/sass/components/_color.scss";
$primary-color: color("grey", "darken-4");

@import "{poetic:materialize-scss}/sass/materialize.scss";

main{
  padding-top: 50px;
}

.full-w{
  width: 100%;
}
```

Remove accounts-ui

```
meteor remove accounts-ui
```

Add meteor user accounts and ironrouter to your `.meteor/packages` file.
```
iron:router
useraccounts:materialize
useraccounts:core
useraccounts:iron-routing
```

Create your routes:

```javascript
//lib/router.js

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

```

Create a layout folder in `client/layouts`

Create your master layout:

```html
<!-- client/layouts/master_layout -->
<template name="masterLayout">
  {{> yield region='navbar'}}
    <main>
      {{> yield}}
    </main>
  {{> yield region='footer'}}
</template>
```

Create your partials for materialize:

Navbar:

```javascript
//imports/ui/navbar.js
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
```

```html
<!-- imports/ui/navbar.html -->
<template name="navbar">
  <nav>
    <div class="container">
      <div class="row">
        <div class="col s12">
          <div class="nav-wrapper">
            <a href="/" class="brand-logo">Logo</a>
            <a href="#" data-activates="mobile-nav" class="button-collapse"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              {{#if userLoggedIn}}
                <li><a href="/sign-out">Sign Out</a></li>
              {{else}}
                <li><a href="/sign-in">Sign In / Up</a></li>
              {{/if}}
            </ul>
            <ul class="side-nav" id="mobile-nav">
              {{#if userLoggedIn}}
                <li><a href="/sign-out">Sign Out</a></li>
              {{else}}
                <li><a href="/sign-in">Sign In / Up</a></li>
              {{/if}}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

```

Footer:

```javascript
//imports/ui/footer.js
import { Meteor } from 'meteor/meteor';

import './footer.html';

Template.footer.onRendered(function() {
  console.log('created');
});
```

```html
<!-- imports/ui/footer.html -->
<template name="footer">
  <footer class="page-footer">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Footer Content</h5>
          <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
        </div>
        <div class="col l4 offset-l2 s12">
          <h5 class="white-text">Links</h5>
          <ul>
            <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
            <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
            <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
            <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
      <div class="container">
      © 2014 Copyright Text
      <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
      </div>
    </div>
  </footer>
</template>

```


Sign in:

```javascript
//imports/ui/signin.js
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
```

```html
<!-- imports/ui/signin.html -->
<template name="signIn">
  <main class="signinbody">
    <div class="container">
      <div class="row row-pad">
        <div class="col s12 m6 offset-m3 l6 offset-l3 white z-depth-1 login">
          {{> atForm state='signIn'}}
        </div>
      </div>
    </div>
  </main>
</template>
```

Sign up:

```javascript
//imports/ui/signup.js
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
```

```html
<!-- imports/ui/signup.html -->
<template name="signUp">
  <main class="registerbody">
    <div class="container">
      <div class="row">
        <div class="col s12 m6 offset-m3 l6 offset-l3 white z-depth-1 login">
          {{> atForm state='signUp'}}
        </div>
      </div>
    </div>
  </main>
</template>
```

Refactor Home:

```html
<template name="home">
  <div class="container">
    <div class="row">
      <div class="col s12">
        <h1>Current Messages</h1>
        <ul id="message-container">
          {{#each message}}
            <li>{{this.user.username}} - {{this.text}}</li>
          {{/each}}
        </ul>
        {{#if userLoggedIn}}
        <h2>Create a message</h2>
          <form id="new-msg">
            <div class="input-field col s8">
              <input name="message" type="text">
              <label for="message">Message</label>
            </div>
            <div class="input-field col s4">
              <button class="btn-large grey darken-4">Submit</button>
            </div>
          </form>
        {{/if}}
      </div>
    </div>
  </div>
</template>
```

Add Imports to `client/main.js`

```
import '../imports/ui/footer.js';
import '../imports/ui/navbar.js';
import '../imports/ui/home.js';
import '../imports/ui/signup.js';
import '../imports/ui/signin.js';
```

Delete `imports/startup/accounts-config.js`

###Step 7: Deploy!

Deploy To Heroku

1. Set up your app to [deploy to heroku with git](https://devcenter.heroku.com/articles/git).
2. Set this repository as the buildpack URL:
```
heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
```
3. Add the MongoLab addon:
```
heroku addons:create mongolab
```
4. Set the `ROOT_URL` environment variable. This is required for bundling and running the app.  Either define it explicitly, or enable the [Dyno Metadata](https://devcenter.heroku.com/articles/dyno-metadata) labs addon to default to `https://<appname>.herokuapp.com`.
```
heroku config:set ROOT_URL="https://<appname>.herokuapp.com" # or other URL
```

Once that's done, you can deploy your app using this build pack any time by pushing to heroku:
```
git push heroku master
```

For your `settings.json` on heroku run this command:
```
heroku config:add METEOR_SETTINGS="$(cat settings.json)"
