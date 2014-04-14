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
5. ~~[Grunt](#grunt)~~
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

    #foe {
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
    
    .foe-bar {
        ...
    }

If you must use an id selector (#selector) make sure that you have no more than one in your rule declaration. 
A rule like #header .search #quicksearch { ... } is considered harmful.

When declaring multiple classes in one rule, seperate them in multiple lines

    .foe,
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


## Javscript helpers

The project also includes some JavaScript helpers functions. These functions are still under development so there will be a constant movement in the file.

If there is any need for some extra functionality, feel free to ask, or just add it yourself.


## Grunt

The project includes a Grunt file


## Browser support


We support: 

The last two versions of each common desktop browser 
- Chrome
- Firefox
- IE
- Safari 

The default mobile browsers
- iOS: Safari
- Andriod: Android Browser
- Windows Phone: IE