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

### Step 1: Create and start your project
```
meteor create meteor-chat
cd meteor-chat
meteor
```

```
Visit: http://localhost:3000/
```

### Step 2: Strip Out Boilerplate

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



### Step 3: Add Users

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


### Step 4: Make A Collection

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
