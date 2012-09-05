# Streaming Server-Sent Events

Takes a [stream of javascript
events](https://github.com/substack/emit-stream) and pushes them to the
browser as server-sent events.

### Server

```js

var ev = new EventEmitter;
setInterval(function () {
  ev.emit('ping', Date.now())
}, 1000)

var server = http.createServer(function(req, res) {
  if (req.url === '/data') {
    emitStream(ev)
      .pipe(ess.events())
      .pipe(res)
  }
})

server.listen(3000)

```

### Client

```js
var source = new EventSource('/data')
source.addEventListener('ping', function(time) {
  console.log(time)
})
```
