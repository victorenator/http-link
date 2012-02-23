(function() {

var assert = require('assert');
var vows = require('vows');

var parser = require('../main.js');

vows.describe('HTTP Links Parser')
.addBatch({
    'when parse simple link': {
        topic: function() {
            return parser.parse('<http://example.com/TheBook/chapter2>');
        },
        'is correct': function(links) {
            assert.deepEqual(links, [
                {
                    href: 'http://example.com/TheBook/chapter2'
                }
            ]);
        }
    },
    'when parse single link': {
        topic: function() {
            return parser.parse('<http://example.com/TheBook/chapter2>; rel="previous"; title="previous chapter"');
        },
        'is correct': function(links) {
            assert.deepEqual(links, [
                {
                    href: 'http://example.com/TheBook/chapter2',
                    rel: 'previous',
                    title: 'previous chapter'
                }
            ]);
        }
    },
    
    'when parse more links': {
        topic: function() {
            return parser.parse('</TheBook/chapter2>; rel="previous"; title*=UTF-8\'de\'letztes%20Kapitel, ' +
                '</TheBook/chapter4>; rel="next"; title*=UTF-8\'de\'n%c3%a4chstes%20Kapitel');
        },
        'is correct': function(links) {
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
    
    'when parse link terminated by semicolon': {
        topic: function() {
            return parser.parse('<http://example.com/TheBook/chapter2>; rel="previous";');
        },
        'throw error': function(links) {
            assert['throws'](links);
        }
    },
    
    'when parse incorrect link': {
        topic: function() {
            return parser.parse('<http://example.com/TheBook/chapter2');
        },
        'throw error': function(links) {
            assert['throws'](links);
        }
    }
    
})['export'](module);

})();
