'use strict';
var dejavu = require('dejavu');
var crypto = require('crypto');
var Errors = require('../Utility/Errors');
var CredentialInterface = require('../Interfaces/CredentialInterface');

var KeyfileCredential = dejavu.Class.declare({
	$name: 'KeyfileCredential',
	$implements: [CredentialInterface],
	$constants: {
		PRIORITY: 100
	},

	__hashBuffer: null,
	__isBinary: null,

	initialize: function(keyBuff) {
		if(!Buffer.isBuffer(keyBuff)){
			throw new Errors.Argument('Expected `keyBuff` to be a Node buffer');
		}

		var result = keyBuff.toString('utf8').match(/<Data>(.*?)<\/Data>/);
		if(result && result.length === 2) {
			this.__isBinary = false;
			this.__hashBuffer = new Buffer(result[1], 'base64');
		} else {
			this.__isBinary = true;
			this.__hashBuffer = crypto.createHash('sha256').update(keyBuff).digest('hex');
		}
	},

	getType: function() {
		return this.__isBinary ? 'binary' : 'xml';
	},

	getHash: function() {
		return this.__hashBuffer;
	},

	getPriority: function() {
		return this.$static.PRIORITY;
	}
});

module.exports = KeyfileCredential;
