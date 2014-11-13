define(function () {

    var QueryString = {},
        _queryString;

    QueryString.containsKey = function(key, queryStringOverride) {

        var queryString = typeof queryStringOverride === 'string' ? queryStringOverride : document.location.search,
            regex;

        if (queryString.length && typeof key === 'string' && key.length) {
            
            regex = new RegExp('[\?&]' + key + '(=|&|$)');
        
        }

        return regex && regex.test(queryString);

    }

    QueryString.getValue = function(key, queryStringOverride) {

        var match,
            queryString = typeof queryStringOverride === 'string' ? queryStringOverride : document.location.search,
            regex,
            value = null;

        if (queryString.length && typeof key === 'string' && key.length) {

            regex = new RegExp('[\?&]' + key + '=([^&]*)');
            match = queryString.match(regex);
            if (match && match.length > 1) {
                value = match[1];
            }

        }

        return value === null ? null : decodeURIComponent(value);

    }

    return QueryString;

});