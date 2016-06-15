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

```javascript
// main.js

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.home.onCreated(function homeOnCreated() {

});

Template.home.helpers({

});

Template.home.events({

});

```


```html
<!-- main.html -->

<head>
  <title>A Simple Meteor Chat App</title>
</head>

<body>
  {{> home}}
</body>

<template name="home">

</template>

```
