'use strict'
var http = require('http')
var EventEmitter = require('events').EventEmitter

var eventStream = require('event-stream')
var emitStream = require('emit-stream')
var send = require('send')

var eventsource = require('../../')

var ev = new EventEmitter
setInterval(function () {
  ev.emit('ping', Date.now())
}, 1000)

var server = http.createServer(function(req, res) {
  console.info(req.url)
  // pipe serverside events to client
  if (req.url === '/data') {
    emitStream(ev)
      .pipe(eventsource.events()) // special handler for events
      .pipe(res)
  }

  // serve clienside html
  if (req.url === '/') {
    send(req, './client.html').from(__dirname).pipe(res)
  }
})

server.listen(3000)
