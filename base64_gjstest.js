// Copyright 2011 Arunjit Singh. All Rights Reserved.
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

  this.rawBytes_ = this.decodedBytes_ = [10, 30, 50, 70, 0, 20, 40, 60];
  this.encodedBytes_ = [67, 104, 52, 121, 82, 103, 65, 85, 75, 68, 119, 61];
}
registerTestSuite(Base64Test);

Base64Test.prototype.encodeAString = function() {
  var actual = base64.encode(this.rawString_, true);
  assertEq(actual.length % 4, 0);
  expectEq(actual, this.encodedString_);
};

Base64Test.prototype.encodeAByteArray = function() {
  var actual = base64.encode(this.rawBytes_);
  assertEq(0, actual.length % 4);
  expectThat(actual, elementsAre(this.encodedBytes_));
};

Base64Test.prototype.decodeAString = function() {
  var actual = base64.decode(this.encodedString_, true);
  expectEq(actual, this.decodedString_);
};

Base64Test.prototype.decodeAByteArray = function() {
  var actual = base64.decode(this.encodedBytes_);
  expectThat(actual, elementsAre(this.decodedBytes_));
};
