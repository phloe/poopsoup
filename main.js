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

	var sub = factory({});
	var unsub = factory({});
	var topics = factory({}, sub, unsub);

	return {
		publish: topics.publish,
		subscribe: topics.subscribe,
		onSubscribe: sub.subscribe,
		onUnsubscribe: unsub.subscribe
	};

	function factory (topics, sub, unsub) {
		
		var id = 0;
		
		function publish (topic, data) {
			var id, subscriber;
			var subscribers = topics[topic];
			if (subscribers) {
				for (id in subscribers) {
					subscriber = subscribers[id];
					subscriber.callback.call(subscriber.context, topic, data);
				}
			}
		}
	
		function subscribe (topic, callback, context) {
			var subscribers;
			if (!topics[topic]) {
				topics[topic] = {};
			}
			subscribers = topics[topic];
			var _id = id++;
			subscribers[_id] = {
				callback: callback,
				context: context || null
			};
			if (sub) {
				sub.publish(topic, {subscribers: count(subscribers)});
			}
			return {
				remove: function () {
					return unsubscribe(_id);
				}
			};
		}
	
		function unsubscribe (id) {
			var topic, subscribers;
			for (topic in topics) {
				subscribers = topics[topic];
				if (id in subscribers) {
					delete subscribers[id];
					if (unsub) {
						unsub.publish(topic, {subscribers: count(subscribers)});
					}
					return true;
				}
			}
			return false;
		}
	
		return {
			publish: publish,
			subscribe: subscribe
		};
	};
	
	function count (object) {
		var count = 0;
		var id;
		for (id in object) {
			count++;
		}
		return count;
	}

}));