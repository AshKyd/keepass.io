var should = require('should');
var fs = require('fs');
var kpio = require('../../lib');



var dbBuff = fs.readFileSync('../test/resources/000_example.kdbx');
var kfBuff = fs.readFileSync('../test/resources/000_example.key');
var db = new kpio.Database();
db.addCredential(new kpio.Credentials.Password('morpheus'));
db.setFile(dbBuff, function(err) {
	(function() {
		if(err) throw err;
	}).should.throw(kpio.Errors.Database);
	return done();
});

describe('Opening the example database', function() {
	this.timeout(5000);
	var dbBuff = fs.readFileSync('../test/resources/000_example.kdbx');
	var kfBuff = fs.readFileSync('../test/resources/000_example.key');

	it('with invalid credentials should throw a KpioDatabaseError', function(done) {
		var db = new kpio.Database();
		db.addCredential(new kpio.Credentials.Password('morpheus'));
		db.setFile(dbBuff, function(err) {
			(function() {
				if(err) throw err;
			}).should.throw(kpio.Errors.Database);
			return done();
		});
	});

	describe('with valid credentials', function() {
		var db = null;

		before(function() {
			db = new kpio.Database();
			db.addCredential(new kpio.Credentials.Password('nebuchadnezzar'));
			db.addCredential(new kpio.Credentials.Keyfile(kfBuff));
		});

		it('should not throw any errors', function(done) {
			db.setFile(dbBuff, function(err) {
				if(err) return done(err);
				return done();
			});
		});

		describe('and calling #saveFile()', function() {
			it('with the same credentials should not throw any error', function(done) {
				db.getFile(function(err) {
					return done(err);
				});
			});

			it('with different credentials should not throw any error', function(done) {
				db.resetCredentials();
				db.addCredential(new kpio.Credentials.Password('morpheus'));

				db.getFile(function(err) {
					return done(err);
				});
			});
		});
	});
});
