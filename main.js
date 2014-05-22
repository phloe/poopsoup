var key = 0;
var topics = {};

function publish (topic, data) {
	var key;
	if (topics[topic]) {
		for (key in topics[topic]) {
			topics[topic][key](topic, data);
		}
	}
}

function subscribe (topic, callback) {
	var _key = key;
	if (!topics[topic]) {
		topics[topic] = {};
	}
	if (!(_key in topics[topic])) {
		topics[topic][_key] = callback;
		key++;
	}
	return _key;
}

function unsubscribe (topic, key) {
	if (topics[topic] && key in topics[topic]) {
		delete topics[topic][key];
	}
}

module.exports.publish = publish;
module.exports.subscribe = subscribe;
module.exports.unsubscribe = unsubscribe;
