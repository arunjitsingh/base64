/**
 * @fileoverview Base64 encoder and decoder for JavaScript.
 * @author Arunjit Singh <arunjit@me.com>
 * @copyright Copyright 2011 Arunjit Singh. All Rights Reserved.
 * @license MIT license. This notice must be included in all distributions.
 *     @see //LICENSE for details.
 *     @see http://www.opensource.org/licenses/mit-license.php for details.
 */
(function(ns) {
  ns.base64 = ns.base64 || {};

  function stringToBytes(string) {
    var len = string.length;
    var bytes = [], i;
    for (i = 0; i < len; ++i) {
      bytes.push(string.charCodeAt(i));
    }
    return bytes;
  }

  function bytesToString(bytes) {
    var len = bytes.length;
    var string = [], i;
    for (i = 0; i < len; ++i) {
      string.push(String.fromCharCode(bytes[i]));
    }
    return string.join('');
  }

  /**
   * The lookup key for Base64.
   * @type {String}
   */
  var KEY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  /**
   * Encode an Array, ArrayBuffer or String to Base64.
   * @param {Array|ArrayBuffer|String} bytes The value to encode.
   * @param {boolean} asString Whether to return as a string.
   * @return {ArrayBuffer|String} A Base64 encoded array buffer or string.
   */
  ns.base64.encode = function encode(bytes, asString) {
    if ('string' === typeof bytes) {
      bytes = stringToBytes(bytes);
    } else if (bytes instanceof ArrayBuffer) {
      bytes = new Uint8Array(bytes);
    }
    var len = bytes.length, i = 0;
    var outlen = Math.ceil(len * 4 / 3);
    outlen += (outlen % 4) ? (4 - outlen % 4) : 0;
    var buffer = new ArrayBuffer(outlen);
    var base64 = new Uint8Array(buffer), j = 0;
    while (i < len) {
      var curr = [];
      var outs = [];

      curr[0] = bytes[i++];
      curr[1] = bytes[i++];
      curr[2] = bytes[i++];

      outs[0] = curr[0] >>> 2;
      outs[1] = ((curr[0] & 0x03) << 4) | (curr[1] >>> 4);
      outs[2] = ((curr[1] & 0x0f) << 2) | (curr[2] >>> 6);
      outs[3] = curr[2] & 0x3f;

      if (typeof curr[1] === 'undefined') {
        outs[3] = outs[2] = 64;
      } else if (typeof curr[2] === 'undefined') {
        outs[3] = 64;
      }

      base64[j++] = KEY.charCodeAt(outs[0]);
      base64[j++] = KEY.charCodeAt(outs[1]);
      base64[j++] = KEY.charCodeAt(outs[2]);
      base64[j++] = KEY.charCodeAt(outs[3]);
    }
    return asString ? bytesToString(base64) : base64.buffer;
  };

  /**
   * Decode a base64 encoded string.
   * @param {Array|ArrayBuffer|String} base64 The base64 encoded string.
   * @param {boolean} asString Whether to return as string.
   * @return {ArrayBuffer|String} An array of decoded bytes.
   */
  ns.base64.decode = function decode(base64, asString) {
    if (((base64.byteLength || base64.length) & 0x03) !== 0) {
      throw new TypeError('Invalid base64 string (input:argument[0])');
    }
    if ('string' === typeof base64) {
      base64 = stringToBytes(base64);
    } else if (base64 instanceof ArrayBuffer) {
      base64 = new Uint8Array(base64);
    }
    var len = base64.length, i = 0;
    var outlen = Math.ceil(len * 3 / 4);  // Math.ceil isn't really required.
    var buffer = new ArrayBuffer(outlen);
    var bytes = new Uint8Array(buffer), j = 0;
    while (i < len) {
      var curr = [];
      var outs = [];

      curr[0] = KEY.indexOf(String.fromCharCode(base64[i++]));
      curr[1] = KEY.indexOf(String.fromCharCode(base64[i++]));
      curr[2] = KEY.indexOf(String.fromCharCode(base64[i++]));
      curr[3] = KEY.indexOf(String.fromCharCode(base64[i++]));

      outs[0] = (curr[0] << 2) | (curr[1] >>> 4);
      outs[1] = ((curr[1] & 0x0f) << 4) | (curr[2] >>> 2);
      outs[2] = ((curr[2] & 0x03) << 6) | curr[3];

      bytes[j++] = outs[0];
      if (curr[2] !== 64) {
        bytes[j++] = outs[1];
        if (curr[3] !== 64) {
          bytes[j++] = outs[2];
        }
      }
    }
    return asString ? bytesToString(bytes) : bytes.buffer;
  };
})(this);
