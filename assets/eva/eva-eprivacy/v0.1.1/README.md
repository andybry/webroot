# ePrivacy
EPrivacy module

# Usage
Copy the html snippet from `index.html`
Require the module as an AMD module and call the init function with

    define(['eva-eprivacy/main'], function(eprivacy){
      ...
      eprivacy.init()
    })

the module will automagically handle the cookie.
Don't forget to require the module's CSS.

# Changelog

- 0.1.0 First release
