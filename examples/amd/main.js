'use strict';
require.config({
    paths: {
        'http-link': '../../main'
    }
});

define(['http-link'], function(httpLink) {
    console.log(httpLink.parse('<http://example.com/acb>; rel=alternate; type=text/html'));
});
