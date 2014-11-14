#Eva Global Navigation



##Structure

###Overview

The global navigation is built composed of hardcoded HTML and a section of content which is created by the CMS. This content is is not updated dynamically and will only need to be updated at specific times.

The JavaScript loading is handled by RequireJS and the nav's code is provided as an AMD module.

The styling is available as SASS files which can be configured as required.

###Standalone / Testing

To run the module as a standalone for testing etc, you will need to run:

```$ bower install```
	
in the public folder. This will **download all the dependencies** into a components folder within the public folder. You will more than likely want to remove this in production and rely on the dependencies of your application instead.

###Useful links

* http://requirejs.org/
* http://bower.io/

### Legacy version

If you require the legacy version of the global navigation, it is available under the legacy branch.


##Integration

###General integration

####HTML

In the root, you will find:

* `global-nav.html` (nav code to implement, containing the CMS snapshot)
* `demo-navigation.html` (demo implementation with dependencies)
* `cms-content.html` (a snapshot of the CMS content obtained via cURL from links below)

####CMS Content 

Portions of the navigation are managed under CMS. The latest version is published to:

* http://www.which.co.uk/components/global/navigation.html

To integrate simply extract the relevant html, ideally the integration should be structured so that it can easily be updated from the CMS published content.

####JavaScript

`public/js/nav.js` is an AMD module that is included using require.js.

An example implementation is provided in `public/js/main.js`.

The nav must be initialised similarly as follows in your app's main.js file

```javascript
nav.init({
  	// Show logo as red or black
  	logo: true,
  	// Show search open on start = true, closed = false
  	search_open: false,
  	// Make search available on site
  	search: true,
  	// Show signin
  	signin: true
});
```

There are four settings that can be applied here:

* **logo:** Set the logo colour
* **search_open:** Make the search open by default
* **search:** Make the search available at all
* **signin:** Show signin 


####SCSS

In the public/scss folder you will find the following

* `global-navigation.scss` (the main global-navigation file without dependencies for integration)
* `global-navigation-ie.scss` (ie lt 9 specific)
* `global-navigation-comp.scss` (complete implementation for which.co.uk legacy)
* `demo-navigation.scss` (demo implementation)

These can then be configured and compiled into a stylesheet for your specific application. You can configure where the Which? logos and fonts folder are located. An example is provided below:

```sass
// Paths to images
$logo-main-path: '../img/logo.gif';
$logo-dark-path: '../img/logo-dark.gif';

// Path to fonts folder overriding defaults set in eva-typography
$fonts_folder: '../components/eva-typography/';

// Imports
@import '../components/eva-typography/font-face.scss';
@import '../components/eva-typography/icons.css';
@import 'global-navigation';
```

####CSS

Compiled and example versions of the SASS files are also available:

* `global-navigation-ie.css` (ie lt 9 specific)
* `global-navigation-comp.css` (complete implementation for which.co.uk legacy)
* `demo-navigation.css` (demo implementation)

####CDN

The most up to date code is available on Github, however there are versions of the CSS, Javascript, fonts and images are contained within the public directory and are available on the following CDN URLs:

* www.staticwhich.co.uk/assets/nav/globalnav/public/css/global-navigation-comp.css
* www.staticwhich.co.uk/assets/nav/globalfooter/public/css/footer-comp.css
* www.staticwhich.co.uk/assets/nav/globalnav/public/js/main-homepage.js
* www.staticwhich.co.uk/assets/nav/globalnav/public/components/requirejs/require.js

###Advanced Integration

In the module root, there is a folder called compiler. In this folder you will find a folder call src which contains the files used to compose the global-navigation.html and demo-navigation.html files. These are as follows

The following files are for wrapping the CMS content:

* `nav-start.html`
* `nav-end.html`

There are also two additional files for building the demo pages, you are unlikely to need these:

* `header.html`
* `footer.html`

The complete navigation is then constructed by sandwiching the CMS content with `nav-start.html` and `nav-end.html`.

#Changelog

* v3.2.7 Re-added components
* v3.2.6 Re-added main-homepage.js
* v3.2.5 Changed nav top position
* v3.2.4 Set fixed width for smallest size
* v3.2.3 Set no rounded corners on buttons
* v3.2.2 Changed main.js to non jquery version
* v3.2.1 Changed links for login signup for analytics
* v3.2.0 Integration ready version
* v3.1.1 Legacy version
* v3.0.0 First release

 
