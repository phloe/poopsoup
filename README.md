poopsoup
========

Minimal pubsub module.

## Usage

```js
var pubsub = require("poopsoup");

var key = pubsub.subscribe("tweet", function (topic, data) {
    console.log(topic, data);
});

pubsub.publish("tweet", "Woah! That's an unsanitary module name if I ever saw one... #yuck");

pubsub.unsubscribe("tweet", key);
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
- `callback` - Callback to call when data is published for the given topic.

##### Returns
`string`

### unsubscribe

##### Arguments
- `topic` - Topic to unsubscribe.
- `key` - A subscription key from a subscribe call.

##### Returns
`null`
