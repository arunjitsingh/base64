var base64 = require('./base64').base64;
var vows = require('vows'),
  assert = require('assert');

var testData = {};
testData.string = testData.decoded = 'Hello!!';
testData.buffer = new Buffer(testData.string);
testData.encoded = testData.buffer.toString('base64');

var encodeSuite = vows.describe('Base64 encoding');
encodeSuite.addBatch({
  'encoding a string': {
    topic: testData.string,
    'should work': function(topic) {
      var encoded = base64.encode(topic, true);
      assert.equal(encoded, testData.encoded);
    }
  },
  'encoding a buffer': {
    topic: testData.buffer,
    'should also work': function(topic) {
      var encoded = base64.encode(topic, true);
      assert.equal(encoded, testData.encoded);
    }
  }
});

encodeSuite.export(module);

var decodeSuite = vows.describe('Base64 decoding');
decodeSuite.addBatch({
  'decoding base64 to a string': {
    topic: testData.encoded,
    'should work': function(topic) {
      var decoded = base64.decode(topic, true);
      assert.equal(decoded, testData.decoded);
    }
  },
  'decoding invalid base64': {
    topic: 'Q==',
    'should error': function(topic) {
      assert.throws(function() {
        base64.decode(topic, true)
      }, TypeError);
    }
  }
});

decodeSuite.export(module);
