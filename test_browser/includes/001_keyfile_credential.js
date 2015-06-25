var should = require('should');
var crypto = require('crypto');
var kpio = require('../../lib');
var fs = require('fs');

describe('Instantiating a KeyfileCredential', function()  {
	it('should throw a KpioArgumentError when providing no keyfile', function() {
		(function() {
			new kpio.Credentials.Keyfile();
		}).should.throw(kpio.Errors.Argument);
	});

	describe('by providing a XML keyfile', function() {
		var credential = null;

		it('should not throw any errors', function() {
			(function() {
				credential = new kpio.Credentials.Keyfile(fs.readFileSync('../test/resources/001_xml.key'));
			}).should.not.throw();
		});

		it('#getType() should return `xml`', function() {
			credential.getType().should.equal('xml');
		});

		it('#getHash() should match MD5 hash `aa45ce202c6de59362033260810bbd2d`', function() {
			var hash = credential.getHash();
			hash = crypto.createHash('md5').update(hash).digest('hex');
			hash.should.equal('aa45ce202c6de59362033260810bbd2d');
		});
	});

	describe('by providing a binary keyfile', function() {
		var credential = null;

		it('should not throw any errors', function() {
			(function() {
				var keyFile = fs.readFileSync('../test/resources/001_binary.key');
				credential = new kpio.Credentials.Keyfile(keyFile);
			}).should.not.throw();
		});

		it('#getType() should return `binary`', function() {
			credential.getType().should.equal('binary');
		});

		it('#getHash() should match MD5 hash `b4f805336b96b064385a5c71dfd12ed1`', function() {
			var hash = credential.getHash();
			hash = crypto.createHash('md5').update(hash).digest('hex');
			hash.should.equal('b4f805336b96b064385a5c71dfd12ed1');
		});
	});
});
