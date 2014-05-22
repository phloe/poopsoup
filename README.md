poopsoup
========

Minimal pubsub module.

## Usage

```js
var ps = require("poopsoup");

var token = ps.subscribe("tweet", function (topic, data) {
    console.log(topic, data);
});

ps.publish("tweet", "Woah! That's an unsanitary module name if I ever saw one... #yuck");

ps.unsubscribe(token);
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
`number`

### unsubscribe

##### Arguments
- `token` - A token from a subscribe call.

##### Returns
`null`
