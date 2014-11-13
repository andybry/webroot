# Frameless Grid module

##The HTML
Consider two HTML elements:

    <body>
      <div class="container">
        <div class="main">Main</div>
        <div class="sidebar">Sidebar</div>
      </div>
    </body>

All the columns must be contained in the `.container` element, as this element
sets the width of the document and bootstraps the grid.

##The `.container` class
As the `.container` class may be used within multiple modules on one page it should not be used as a hook for styling or within JavaScript. If you need to style, or reference the element within JavaScript, you should add a classname to the element that is specific to your module or application. You can then use this additional classname as a selector whilst avoiding clashes with other modules.

##The stylesheet
To position these elements side by side side, provide the desired number of grid units to the `column()` mixin:

    @import 'grid';

    $column: 55px;
    $gutter: 15px;

    .main {
       @include column(9);
    }
    .sidebar {
       @include column(3);
    }

The `column()` mixin expands to:

    @mixin column( $cols ) {
      margin-left: ceil($gutter / 2);
      margin-right: floor($gutter / 2);
      float: left;
      display: inline;
      width: column_size( $cols );
    }

You can use the `column()` function to get only the width for a particular
column. Eg:

    .my-column {
      width: column(3);
      /* there is no float, or margin declared on this element */
    }

## More complex layouts.
Let's assume you want to code the following layout:

    +-------------------------------------------+
    |+-----------++------------+        +------+|
    ||           ||            |        |      ||
    ||           ||            |        |      ||
    ||           ||            |        |      ||
    ||           ||            |        |      ||
    ||           ||            |        |      ||
    ||           ||            |        |      ||
    |+-----------++------------+        +------+|
    +-------------------------------------------+

Where the first 2 blocks are 4 columns wide and the space and the last column
are just 2 columns wide. The HTML would be:

    <body>
      <div class="container">
        <div class="col4">4 columns wide</div>
        <div class="col4">4 columns wide</div>
        <div class="col2">2 columns wide</div>
      </div>
    </body>

And the CSS:

    @import 'grid';

    $column: 55px;
    $gutter: 15px;

    .col4 {
       @include column(4);
    }
    .col2 {
       @include column(2);
       @include offset-by(2);
    }

Where `@include offset-by( n )` pushes the last block off 2 columns from the
4 columns blocks. You can use that mixin to space your layout.

### Going responsive
This grid can easily adapt the number of columns when the viewport changes using
breakpoints. Those, can be define using the `$breakpoints` variable:

    $breakpoints : 4, 9, 12, 18;
    $column: 55px;
    $gutter: 15px;

The grid automatically creates the following media queries:

     4 columns ->  280px        given by  4 * (55px + 15px)
     9 columns ->  630px        given by  9 * (55px + 15px)
    12 columns ->  840px        given by 12 * (55px + 15px)
    18 columns -> 1260px        given by 18 * (55px + 15px)

The size of the `.container` is adjusted accordingly to the current media query.
For every other element you want to adapt, you have to write your own media
query. Fortunately, we have an helper for that. But before we dig into it, let's
start with a small example: we want to code the following website that scales
with 3 breakpoints 4, 9 and 12:


    12 columns
    Main    -> 6 columns
    Sidebar -> 4 columns
    Nav     -> 2 columns
    +------------------------------------------------------------+
    |+------------------------------++----------------++--------+|
    ||                              ||                ||        ||
    ||                              ||                ||        ||
    ||                              ||                ||        ||
    ||                              ||                ||        ||
    ||                              ||                ||        ||
    ||             Main             ||    Sidebar     ||  Nav   ||
    ||                              ||                ||        ||
    ||                              ||                ||        ||
    ||                              ||                ||        ||
    ||                              ||                ||        ||
    ||                              ||                ||        ||
    ||                              ||                ||        ||
    ||                              ||                ||        ||
    |+------------------------------++----------------++--------+|
    +------------------------------------------------------------+

    9 columns
    Main    -> 6 columns
    Sidebar -> 3 columns
    Nav     -> 9 columns
    +--------------------------------------------------+
    |+------------------------------++----------------+|
    ||                              ||                ||
    ||                              ||                ||
    ||                              ||                ||
    ||                              ||                ||
    ||                              ||                ||
    ||             Main             ||    Sidebar     ||
    ||                              ||                ||
    ||                              ||                ||
    ||                              ||                ||
    ||                              ||                ||
    ||                              ||                ||
    ||                              ||                ||
    ||                              ||                ||
    |+------------------------------++----------------+|
    |+------------------------------------------------+|
    ||                                                ||
    ||                       Nav                      ||
    ||                                                ||
    |+------------------------------------------------+|
    +--------------------------------------------------+

    4 columns
    Main    -> 4 columns
    Sidebar -> 4 columns
    Nav     -> 4 columns
    +--------------------------------+
    |+------------------------------+|
    ||                              ||
    ||                              ||
    ||                              ||
    ||                              ||
    ||                              ||
    ||             Main             ||
    ||                              ||
    ||                              ||
    ||                              ||
    ||                              ||
    ||                              ||
    ||                              ||
    ||                              ||
    |+------------------------------+|
    |+------------------------------+|
    ||                              ||
    ||            Sidebar           ||
    ||                              ||
    |+------------------------------+|
    |+------------------------------+|
    ||                              ||
    ||              Nav             ||
    ||                              ||
    |+------------------------------+|
    +--------------------------------+

The HTML would be:

    <body>
      <div class="container">
        <div class="main">Main</div>
        <div class="sidebar">Sidebar</div>
        <div class="nav">Nav</div>
      </div>
    </body>

In the CSS, we can start by declaring the gutter, the width and the breakpoints:

    @import 'grid';

    $column: 55px;
    $gutter: 15px;
    $breakpoints: 4, 9, 12;

Then we can code the first 12 columns layout:

    .main {
       @include column(6);
    }
    .sidebar {
       @include column(4);
    }
    .nav {
       @include column(2);
    }

When the viewport is only 9 columns wide, we can reshuffle the layout. We can
trigger the reshuffle with a media query:

    @media only screen and (min-width: container(9) ) and ( max-width: container(12) ) {
      // Only 9 columns available
      .sidebar {
        @include column(3);
      }

      .nav {
        @include column(9);
      }

    }

Please note that there is no need to specify the two extremes of the media
query. The `container` function compute the right values for us. Lastly, we can
right the CSS when the view port is only 4 columns wide:


    @media only screen and ( max-width: container(9) ) {
      // Only 4 columns available
      .main,
      .sidebar,
      .nav {
        @include column(4);
      }

    }

If you want a full width container but without the left and right margins, the .widthOfAllColumns class is available.

Congratulations, you've just completed your first website with the frameless
grid.

### Nesting
A nested div that's touching the left edge of its parent `<div>` would use the `column-alpha` mixin. Similarly, the `column-omega` mixin is assigned to the nested div that's placed on the parent div's right edge. But what if we have a nested div that touches both edges of its parent div? That's right, we include the mixin `column-alpha-omega` to it.

### Clearfix
This grid uses the `.group` clearfix ([more info about this](http://css-tricks.com/snippets/css/clear-fix/)).
Also, the same clearfix is available as a mixin.

# Changelog
- 0.2.0 Alpha and omega mixins for nested columns.
- 0.1.0 *BREAKING CHANGES* Rewritten in SASS. Automatic generation of breakpoints, mixins for
  columns, offsets, clearfix and container size. Improved documentation.
- 0.0.1 First release
