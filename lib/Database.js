'use strict';
var dejavu = require('dejavu');
var assert = require('chai').assert;
var fs = require('fs');
var CredentialStore = require('./Utility/CredentialStore');
var KeePassDatabase = require('./KeePass/KeePassDatabase');

var crypto = require('crypto');

var Database = dejavu.Class.declare({
	$name: 'Database',

	_credentialStore: null,
	_kpDatabase: null,

	initialize: function() {
		this._credentialStore = new CredentialStore();
		this._kpDatabase = new KeePassDatabase();
	},

	loadFile: function(filePath, callback) {
		assert.isString(filePath, 'Expected `filePath` to be a string');
		assert.isTrue(fs.existsSync(filePath), 'Expected `filePath` to be a valid path to an existing file');

		fs.readFile(filePath, function(err, content) {
			if(err) {
				return callback(new Error('Could not open database file: ' + err.toString()));
			}
			this._kpDatabase.load(content, this._credentialStore, function(err) {
				return callback(err, this._kpDatabase.getApi());
			}.$bind(this));
		}.$bind(this));
	},

	saveFile: function(filePath, callback) {
		assert.isString(filePath, 'Expected `filePath` to be a string');

		this._kpDatabase.save(this._credentialStore, function(err, content) {
			fs.writeFile(filePath, content, function(err) {
				return callback(err);
			})
		});
	},

	addCredential: function(credentialObject) {
		this._credentialStore.add(credentialObject);
	},

	resetCredentials: function() {
		this._credentialStore.reset();
	}
});

module.exports = Database;