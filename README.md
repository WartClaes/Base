HTML & CSS template
===================

Introduction
------------

This is a standard HTML and CSS based on HTML5 Boilerplate, Nathan Smith's 960 grid and pieces from Bootstrap 3.
Also provided: coding guidelines to make everyting consistent.

Standards
---------

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


### Links an buttons

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


// BROWSER SUPPORT should be included
