(function(window, undefined) {

  var Cookies = {
    read: function(key, win) {
      var regex = new RegExp('(?:; )?' + encodeURIComponent(key) + '=([^;]*)'),
        cookie = win && win.document && typeof win.document.cookie === 'string' ? win.document.cookie : document.cookie,
        match = cookie.match(regex),
        value = null;

      if (match && match.length > 1) {
        value = match[1];
      }

      return value === null ? null : decodeURIComponent(value);
    },

    write: function(key, value, periodUntilExpiry, path, win, expiryPeriodUnit) {
      var newValue,
          expiresDate = null,
          unit = expiryPeriodUnit || 'days';

      if (typeof periodUntilExpiry === 'number') {
        expiresDate = new Date();
        if (unit === 'days') {
          expiresDate.setDate(expiresDate.getDate() + periodUntilExpiry);
        } else if (unit === 'minutes') {
          expiresDate.setMinutes(expiresDate.getMinutes() + periodUntilExpiry);
        }

      }

      newValue = encodeURIComponent(key) + '=' + encodeURIComponent(value) + (expiresDate ? '; expires=' + expiresDate.toUTCString() : '') + (path && path.length ? '; path=' + path : '');

      if (win && win.document && typeof win.document.cookie === 'string') {
        win.document.cookie = newValue;
      } else {
        document.cookie = newValue;
      }
    }
  };

  // If AMD available
  if ( typeof define === "function" && define.amd ) {
    define( "cookies", [], function () { return Cookies; } );
  // If module exports available for Node / Browserify
  } else if( typeof module === "object" && module && typeof module.exports === "object" ) {
    module.exports = Cookies;
  // Export to the window
  }

  window.Cookies = Cookies;

})(window);