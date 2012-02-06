// Copyright 2012 Arunjit Singh. All Rights Reserved.
/**
 * @fileoverview Google JS test for base64 encoder and decoder.
 * @author Arunjit Singh <arunjit@me.com>
 * @license MIT license. This notice must be included in all distributions.
 *     @see //LICENSE for details.
 *     @see http://www.opensource.org/licenses/mit-license.php for details.
 */

/** @constructor */
function Base64Test() {
  this.rawString_ = this.decodedString_ = 'Hello!!!';
  this.encodedString_ = 'SGVsbG8hISE=';
}
registerTestSuite(Base64Test);

Base64Test.prototype.encodeAString = function() {
  var actual = base64.encode(this.rawString_, true);
  expectThat(actual.length % 4, equals(0));
  expectThat(actual, equals(this.encodedString_));
};

Base64Test.prototype.decodeAString = function() {
  var actual = base64.decode(this.encodedString_, true);
  expectThat(actual, equals(this.decodedString_));
};
