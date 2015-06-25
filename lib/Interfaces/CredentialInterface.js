'use strict';
var CredentialInterface = dejavu.Interface.declare({
	$name: 'CredentialInterface',

	getHash: function() {},
	getPriority: function() {}
});

module.exports = CredentialInterface;
