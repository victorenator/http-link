# http-link

Library for parsing HTTP Link header
http://www.w3.org/wiki/LinkHeader

## Synopsis

### NodeJS

``` js
var httpLink = require('http-link');
var links = httpLink.parse('<http://example.com/acb>; rel=alternate; type=text/html');
```

### RequireJS

``` js
define(['http-link'], function(httpLink) {
var links = httpLink.parse('<http://example.com/acb>; rel=alternate; type=text/html');
});
```

### HTML

``` html
<script src="http-link.js"></script>
<script>
httpLink.parse('<http://example.com/acb>; rel=alternate; type=text/html');
</script>
```

## Install

```
npm install http-link
```
