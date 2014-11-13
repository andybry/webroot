define(function () {

    var QueryString = {},
        _queryString;

    QueryString.containsKey = function(key, queryStringOverride, caseSensitive) {

        var queryString = typeof queryStringOverride === 'string' ? queryStringOverride : document.location.search,
            regex,
            regex_args = caseSensitive === false ? 'i' : '';

        if (queryString.length && typeof key === 'string' && key.length) {

            regex = new RegExp('[\?&]' + key + '(=|&|$)', regex_args);

        }

        return regex && regex.test(queryString);

    }

    QueryString.getValue = function(key, queryStringOverride, caseSensitive) {

        var match,
            queryString = typeof queryStringOverride === 'string' ? queryStringOverride : document.location.search,
            regex,
            regex_args = caseSensitive === false ? 'i' : '',
            value = null;

        if (queryString.length && typeof key === 'string' && key.length) {

            regex = new RegExp('[\?&]' + key + '=([^&]*)', regex_args);
            match = queryString.match(regex);
            if (match && match.length > 1) {
                value = match[1];
            }

        }

        return value === null ? null : decodeURIComponent(value);

    }

    return QueryString;

});