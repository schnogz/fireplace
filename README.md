# Fireplace
***

About
========

This is a web based application that manages a users book library.  The book searching within the application is powered by the Google's [Book API](https://developers.google.com/books/docs/v1/using).  Users libraries and wishlists are currently stored using HTML5's localStorage feature.  Eventually, I would like to implement Google's OAuth within the application.  This would allow to read and write to a user's Google Play Book Library.

The main user facing technologies used in this project are AngularJs, Twitter Bootstrap, and jQuery. Application development, and it's processes, are supported by Node.js (Grunt, Karma, ngTemplates) and the Lo-Dash JavaScript utility library.


Demo
=======

View the applications demo at http://www.schnogz.com/projects/fireplace/index.html


Screenshot
=======

![app screenshot](https://cloud.githubusercontent.com/assets/6364918/25072379/3b38c9fc-2292-11e7-8be9-f81b96aa302a.png)


Preparing The Dev Environment
========

* Install [Node.js](http://nodejs.org/).
* Install global dev dependencies: `npm install -g grunt-cli`.
* Install local dev dependencies: `npm install` while current directory is (root)/js.


Developing
========

* Run grunt -watch from a command prompt within (root)/js.  This will automatically `lint` your javascript, run `ngTemplates` to build an Angular's template cache file (templates.js), and then `concat` all necessary files into one. This will happen automatically after any file change within the (root)/js directory.  
* Refreshing the browser after the watch task is complete will allow you to see your changes.


Preparing Code For Checkin
========

* Once you have changes that you would like to commit, run grunt from a command prompt within (root)/js. This will `clean` old files, `lint` the JavaScript, build `ngTemplate` cache, `concat`, and then run `unit tests`.  If this completes without errors, you're code is ready for checkin.


License
========

Copyright 2014 Andrew Schneider.

Licensed under the MIT License.
