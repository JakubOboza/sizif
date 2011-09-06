var vows = require('vows'),
    assert = require('assert');
var Sizif = require("../lib/sizif");

// Create a Test Suite
vows.describe('Sizif').addBatch({
        'should have version': {
            topic: function () { return new Sizif({
                                   database: "panda_test" }) },

                ' === 0.0.1': function (topic) {
                    assert.equal (topic.version(), "0.0.1");
                }
        }
    }).run(); // Run it
