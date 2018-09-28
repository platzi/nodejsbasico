const fs = require('fs');
const assert = require('assert');

module.exports = {
    standardErr: {
        syntax: function() {
            return eval("var var a;");
        },
        range: function() {
            var arr = new Array(-4);
        },
        reference: function() {
            return w;
        },
        type: function() {
            var o = new 10;
        },
        uri: function() {
            decodeURI('%');
        }
    },
    userErr: function() {
        throw new Error("My Custom Error");
    },
    systemErr: function(){
        fs.readFileSync('foo.bar');
    },
    assertErr: function(){
        assert.ok(false);
    }
}