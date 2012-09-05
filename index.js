'use strict'

var Stream = require('stream')
var util = require('util')
var responseStream = require('response-stream')

var ess = exports = module.exports = function() {
  var stream = new Stream()
  stream.writable = true
  stream.readable = true
  stream.write = function(data) {
    stream.emit('data', "data: " + data + "\n\n")
  }
  var res = responseStream(stream)
  res.writeHead(200, {
  'Content-Type': 'text/event-stream' });
  return res
}

module.exports.events = function() {
  var stream = new Stream()
  stream.writable = true
  stream.readable = true
  var res = responseStream(stream)
  res.write = function(data) {
    var eventName = data[0]
    var params = data.slice(1)
    res.emit('data', "event: " + eventName + "\n")
    res.emit('data', "data: " + params + "\n\n")
  }
  res.writeHead(200, {
  'Content-Type': 'text/event-stream' });
  return res
}
