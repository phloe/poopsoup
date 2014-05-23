poopsoup
========

Minimal pubsub module.

## Usage

#### Node

```js
var pubsub = require("poopsoup");
// do stuff with pubsub
```

#### AMD

```js
require(["poopsoup"], function (pubsub) {
	// do stuff with pubsub
});
```

#### Global in browser

```js
// do stuff with pubsub
```

#### Universal

```js
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

```

## Methods

### publish

##### Arguments
- `topic` - Topic to publish.
- `data` - Data to publish for topic.

##### Returns
`null`

### subscribe

##### Arguments
- `topic` - Topic to subscribe to.
- `callback` - Callback to call when data is published for the given topic. The callback function receives the following arguments:
  - `topic` - The topic of the subscription.
  - `data` - The published data.

##### Returns
`string`

### unsubscribe

##### Arguments
- `topic` - Topic to unsubscribe.
- `key` - A subscription key from a subscribe call.

##### Returns
`null`

## Custom topics
Using a topic prefix some internals can be exposed: 

### subscribe
Prefix: `subscribe!`

Can be used to be messaged whenever a topic gets subscribed to.
`data` payload for the callback is an object with a `subscribers` property with a value equal to the number of current active subscribers.

### unsubscribe
Prefix: `unsubscribe!`

Can be used to be messaged whenever a topic gets unsubscribed.
`data` payload for the callback is an object with a `subscribers` property with a value equal to the number of current active subscribers.