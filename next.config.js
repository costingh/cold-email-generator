const path = require('path');

module.exports = {
	reactStrictMode: true,
	experimental: {
		serverAction: true,
	},
	webpack(config) {
		config.resolve.alias['@components'] = path.join(__dirname, '/src/components');
		config.resolve.alias['@interfaces'] = path.join(__dirname, '/src/interfaces');
		config.resolve.alias['@services'] = path.join(__dirname, '/src/service');
		config.resolve.alias['@lib'] = path.join(__dirname, '/src/lib');
		config.resolve.alias['@hook'] = path.join(__dirname, '/src/hook');
		config.resolve.alias['@store'] = path.join(__dirname, '/store');

		return config;
	}
};
