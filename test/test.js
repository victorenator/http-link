(function() {

var assert = require('assert');
var vows = require('vows');

var parser = require('../main.js');

function parse(str) {
    return function() {
        return parser.parse(str);
    };
}

vows.describe('HTTP Links Parser')
.addBatch({
    'when parse a link': {
        topic: parse('<http://example.com/TheBook/chapter2>'),
        'is correct': function(links) {
            assert.isArray(links);
            assert.deepEqual(links, [
                {
                    href: 'http://example.com/TheBook/chapter2'
                }
            ]);
        }
    },
    'when parse a link with params': {
        topic: parse('<http://example.com/TheBook/chapter2>; rel="previous"; title="previous chapter"'),
        'is correct': function(links) {
            assert.isArray(links);
            assert.deepEqual(links, [
                {
                    href: 'http://example.com/TheBook/chapter2',
                    rel: 'previous',
                    title: 'previous chapter'
                }
            ]);
        }
    },
    'when parse a relative link': {
        topic: parse('</abc>'),
        'is correct': function(links) {
            assert.isArray(links);
            assert.deepEqual(links, [{href: '/abc'}]);
        }
    },
    'when parse a link with unquoted type': {
        topic: parse('</abc>; type=text/html'),
        'is correct': function(links) {
            assert.isArray(links);
            assert.deepEqual(links, [{href: '/abc', type: 'text/html'}]);
        }
    },
    'when parse a link with quoted type': {
        topic: parse('</abc>; type="text/html"'),
        'is correct': function(links) {
            assert.isArray(links);
            assert.deepEqual(links, [{href: '/abc', type: 'text/html'}]);
        }
    },
    'when parse more links': {
        topic: parse('</TheBook/chapter2>; rel="previous"; title*=UTF-8\'de\'letztes%20Kapitel, ' +
                '</TheBook/chapter4>; rel="next"; title*=UTF-8\'de\'n%c3%a4chstes%20Kapitel'),
        'is correct': function(links) {
            assert.isArray(links);
            assert.deepEqual(links, [
                {
                    href: '/TheBook/chapter2',
                    rel: 'previous',
                    'title*': 'UTF-8\'de\'letztes%20Kapitel'
                },
                {
                    href: '/TheBook/chapter4',
                    rel: 'next',
                    'title*': 'UTF-8\'de\'n%c3%a4chstes%20Kapitel'
                }
            ]);
        }
    },
    
    'when parse a link terminated by semicolon': {
        topic: parse('<http://example.com/TheBook/chapter2>; rel="previous";'),
        'throw error': function(error) {
            assert.instanceOf(error, Error);
        }
    },
    
    'when parse an incorrect link': {
        topic: parse('<http://example.com/TheBook/chapter2'),
        'throw error': function(error) {
            assert.instanceOf(error, Error);
        }
    }
    
})['export'](module);

})();
