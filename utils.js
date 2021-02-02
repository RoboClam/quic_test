const fs = require('fs');

var methods = {
    getTLSKeySomehow: function() {
		return fs.readFileSync(".tls/domain.key").toString('utf-8');
	},
	getTLSCertSomehow: function() {
		return fs.readFileSync(".tls/domain.crt").toString('utf-8');
	}
}

module.exports = methods;