var pubsub = require("./main");

// define a topic
var topic = "tweet";

// optionally keep track of new subscribers
// by subscribing to a topic using the
// internal "subscribe!" prefix
pubsub.subscribe("subscribe!" + topic, function (topic, data) {
	console.log("I now have", data.subscribers, "subscriber(s)! :)");
});

// unsubscriptions can be tracked in the same
// manner via the "unsubscribe!" prefix
pubsub.subscribe("unsubscribe!" + topic, function (topic, data) {
	console.log("I now have", data.subscribers, "subscriber(s)... :(");
});

// subscribe in regular pubsub fashion
// with a topic and a callback
// a unique subscription key is returned
// for unsubscription later
var key = pubsub.subscribe(topic, function (topic, data) {
    console.log("I just tweeted:", data);
});

// logged: I now have 1 subscriber(s)! :)

// publish data to all subscribers
pubsub.publish(topic, "Woah! That's an unsanitary module name if I ever saw one... #yuck");

// logged: I just tweeted: Woah! That's an unsanitary module name if I ever saw one... #yuck

// unsubscribe using the key 
// generated previously
pubsub.unsubscribe(topic, key);

// logged: I now have 0 subscriber(s)... :(