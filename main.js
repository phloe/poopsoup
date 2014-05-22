var key = 0;
var cache = {};
var topics = {};

function publish (topic, data) {
	cache[topic] = data;
	if (topics[topic]) {
		for (var key in topics[topic]) {
			topics[topic][key](topic, data);
		}
	}
}

function subscribe (topic, callback) {
	var _key = key;
	if (!topics[topic]) {
		topics[topic] = {};
	}
	if (!topics[topic][_key]) {
		topics[topic][_key] = callback;
		key++;
	}
	if (cache[topic]) {
		callback(topic, cache[topic]);
	}
	return _key;
}

function unsubscribe (topic, key) {
	if (topics[topic] && topics[topic][key]) {
		delete topics[topic][key];
	}
	if (isEmpty(topics[topic])) {
		delete topics[topic];
	}
}

function isEmpty (object) {
	for (var key in object) {
		return false;
	}
	return true;
}

module.exports.publish = publish;
module.exports.subscribe = subscribe;
module.exports.unsubscribe = unsubscribe;