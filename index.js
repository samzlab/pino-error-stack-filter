const pino = require('pino');

const defaultOptions = {
	keywords: [ 'node_modules', '(<anonymous>)' ],
	keepMessage: false
};

module.exports = ({ keywords, keepMessage } = defaultOptions) => (err) => {
	const lines = err.stack.split('\n');

	err.stack = lines
		.filter((line) => (keepMessage || !line.startsWith(err.name)) && !keywords.find((keyword) => line.includes(keyword)))
		.join('\n');

	return pino.stdSerializers.err(err);
};