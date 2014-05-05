HTML & CSS template
===================

## Introduction


This is a standard HTML and CSS based on HTML5 Boilerplate, Nathan Smith's 960 grid and pieces from Bootstrap 3.
Also provided: coding guidelines to make everyting consistent.

## Table of contents


1. [What do I get?](#what-do-i-get)
2. [Coding standards](#coding-standards)
3. [SCSS](#scss)
4. [Javascript helpers](#javascript-helpers)
5. [Grunt](#grunt)
6. [Browser Support](#browser-support)

## What do I get?


- A SCSS framework, combined with usefull HTML en Javascript snippets
- A dynamic, fully responsive grid system, rendered with SCSS to fulfill your wishes (dynamic grid size, maximum width and gutter width)


## Coding standards


### Coding Style

Use soft-tabs with a four space indent.

Put spaces after : in property declarations.

    background: #000000;

Put spaces before { in rule declarations.

    #foo {
        ...
    }

Use hex color codes #000000 unless using rgba, six digits.


### Pixels vs. Ems

Use px for font-size, because it offers absolute control over text. 
Additionally, unit-less line-height is preferred because it does not inherit a percentage value of its parent element, but instead is based on a multiplier of the font-size.


### ID & Class naming

It is always preferable to name something, be it an ID or a class, by the nature of what it is rather than by what it looks like.

    NOT .bigBlueText
    YES .noteText

Use dashes in classnames and id's.
    
    .foo-bar {
        ...
    }

If you must use an id selector (#selector) make sure that you have no more than one in your rule declaration. 
A rule like #header .search #quicksearch { ... } is considered harmful.

When declaring multiple classes in one rule, seperate them in multiple lines

    .foo,
    .bar {
        ...
    }


### Links & buttons

Default styles for links should be declared and different from the main text styling (eg. underlined), and with differing styles for hover state.


### Fonts

include fonts with @import / @font-face

    @import url(http://fonts.googleapis.com/css?family=Share+Tech);


### Javascript Coding Principles

(Almost) All code should be in an external file

All Boolean variables should start with "is"
    
    var isValid = true;

All jQuery Objects shuild start with "$"

    var $foo = $('#foo');

When declaring multiple vars, only use var once (Avoid unnecessary DOM references)

    var foo = "",
        bar = "";

Avoid using global variables 

Never leave console.log in the js when going live


## SCSS

This project contains a SCSS structure, rendered by Compass:

	├── fs
	|	└── animations
	|	└── mixins
	└── globals
    |	└── forms
	|   └── grid
    |  	└── helpers
    |  	└── normalize
    |  	└── overrides
    |  	└── bprint
	└── project
	|	└── page
	|	└── typography
	|	└── media
	|		└── ...
	└── vendor
		└── ...

The **globals** folder is the folder with all the default styling/components. Normally those files are there just to make life easier.

**FS** is the Funky Sh*t folder. In here you have some files for e.g. animations and mixins.

The **project** folder is where the magic happens. Everything you have to build for your project is written in these files.

**Vendor** is vendor. Easy.


## Javascript helpers

The project also includes some JavaScript helpers functions. These functions are still under development so there will be a constant movement in the file.

If there is any need for some extra functionality, feel free to ask, or just add it yourself.


## Grunt

The project includes a [Grunt file](https://github.com/WartClaes/Base/blob/master/gruntfile.js) with some predefined tasks.


###Dev (default)

this runs:


#####1. jshint

Runs a jshint at the beginning. Just to be shure. For all settings check the [.jshintrc file](https://github.com/WartClaes/Base/blob/master/.jshintrc)

#####2. connect:livereload

The grunt file starts a localhost at port 9000.
This also enables the livereload function every time you save some **.html** or files in the **css** and js folders.

#####3. open

This opens the localhost:9000 in your default browser

#####4. watch

Listens to changes in **.html** or files in the **css** and js folders.
Compiles what is needed. SCSS for .css files and JSHint for .js files


###Build

The build command creates a **/build** folder. That's the folder you need online. No more SCSS files on a production server.

#####1. clean

Clean the **/build** directory so we can start from scratch

#####2. copy

Copy all the **.html** files, exept those in **/build** and **/node_modules**. After that copy all **/js/vendor** files.

#####3. compass:build

This compiles the SCSS, but minifies it in the same action.

#####4. jshint

The same as before.

#####5. uglify

Uglify the JS. And minify it as well. Tiny is the key.

#####6. concat

Glue the JS files together. We create on **app.js** to lower the requests.

#####7. imagemin

Again minify. The images can be smaller, sites can be faster.

#####8. processhtml

We process the HTML files to include the **app.js** in stead of all the different files. This also removes the livereload js.

By default we only minify the **index.html**. Other pages should be added manually at this time?

## Browser support


We support the last two versions of each common desktop browser :

- Chrome
- Firefox
- IE
- Safari 

... and the default mobile browsers:

- iOS: Safari
- Andriod: Android Browser
- Windows Phone: IE