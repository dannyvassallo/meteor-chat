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
```
Meteor.userId();
//should return => "J8iYQwkZiKxe9pTLt"
``


