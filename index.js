var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var fileName = 'access.log';

var fileContent = fs.readFileSync(path.join(__dirname, fileName)).toString();
var regexp = /(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/g;

var ipList = fileContent.match(regexp);
ipList = _.uniq(ipList);

var subnetworkList = ipList.map(function(ip) {
	return ip.split('.').slice(0, -1).join('.');
});
subnetworkList = _.uniq(subnetworkList);

subnetworkList.forEach(function(subnetwork) {
	console.log(subnetwork + ' subnetwork:');

	ipList.forEach(function(ip) {
		if (ip.indexOf(subnetwork) !== -1) {
			console.log(ip);
		}
	});

	console.log();
});
