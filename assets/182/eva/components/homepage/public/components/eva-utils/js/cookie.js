define(function () {
    
    var Cookie = {};

    Cookie.read = function(key) {

        var regex = new RegExp('(?:; )?' + encodeURIComponent(key) + '=([^;]*)'),
            match = document.cookie.match(regex),
            value = null;

        if (match && match.length > 1) {
            value = match[1];
        }

        return value === null ? null : decodeURIComponent(value);

    }

    Cookie.write = function(key, value, daysUntilExpiry, path) {

        var expiresDate = null;
        if (typeof daysUntilExpiry === 'number') {
            expiresDate = new Date();
            expiresDate.setDate(expiresDate.getDate() + daysUntilExpiry);
        }
        document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + (expiresDate ? '; expires=' + expiresDate.toUTCString() : '') + (path && path.length ? '; path=' + path : '');

    }

    return Cookie;

})