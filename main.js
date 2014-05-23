(function (global, define) {
	'use strict';

	define(function() {

		var key = 0;
		var topics = {};
		var publishers = {};

		function publish (topic, data, callback) {
			var key;
			if (typeof data == "function") {
				callback = data;
				data = null;
			}
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

		return {
			publish: publish,
			subscribe: subscribe,
			unsubscribe: unsubscribe
		};

	});

}(this, typeof define == 'function' && define.amd ? define : function(factory) { this.poopsoup = factory() } ));