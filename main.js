(function (name, root, factory) {
	if (typeof exports === "object") {
		module.exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		define(name, factory);
	}
	else {
		root[name] = factory();
	}
}("poopsoup", this, function () {

	var topics = {};
	var delimiter = "!";

	function publish (topic, data) {
		var key;
		if (topics[topic]) {
			for (key in topics[topic]) {
				topics[topic][key](topic, data);
			}
		}
	}

	function subscribe (topic, callback) {
		var key;
		if (!topics[topic]) {
			topics[topic] = {};
		}
		key = makeKey(topic);
		topics[topic][key] = callback;
		if (topic.indexOf(delimiter) < 0) {
			publish("subscribe" + delimiter + topic, {subscribers: getCount(topics[topic])});
		}
		return key;
	}

	function unsubscribe (topic, key) {
		if (topics[topic] && key in topics[topic]) {
			delete topics[topic][key];
		}
		if (topic.indexOf(delimiter) < 0) {
			publish("unsubscribe" + delimiter + topic, {subscribers: getCount(topics[topic])});
		}
	}

	function makeKey (topic) {
		var key = Math.round(Math.random() * 10e12).toString(36);
		return (key in topics[topic]) ? makeKey(topic) : key;
	}
	
	function getCount (object) {
		var count = 0;
		var key;
		for (key in object) {
			count++;
		}
		return count;
	}

	return {
		publish: publish,
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};

}));