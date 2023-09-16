var WebSocket = require('ws');
var https = require('https');
var http = require('http');
var fs = require('fs');


export default function setupWS() {
  const server = http.createServer();

  const wss = new WebSocket.Server({ server });
  
  const id_to_socket = {};
  const pending_handshake = {};
  wss.on('connection', client => {
    console.log('WS connected client');
    client.on('close', () => {
      console.log("closing", client.room, client.id);
      if (client.room in id_to_socket && client.id in id_to_socket[client.room]) {
        delete id_to_socket[client.room][client.id];
      }
      if (client.room in pending_handshake && client.id in pending_handshake[client.room]) {
        delete pending_handshake[client.room][client.id];
      }
    });
    client.on('message', payload => {
      let dec = JSON.parse(payload);
      let evt = dec.event;
      let data = dec.data;
      let room = dec.room;
  
      if (!(room in id_to_socket)) {
        id_to_socket[room] = {};
        pending_handshake[room] = {};
      }
  
      if (evt === 'identify') {
        console.log('identify room: ', room, ' id: ', data);
        client.room = room;
        client.id = data;
        id_to_socket[room][data] = client;
        for (var userId in id_to_socket[room]) {
          if (userId !== data) {
            let payload = JSON.stringify({
              event: 'connect',
              id: userId,
              room: room
            });
            id_to_socket[room][data].send(payload);
          }
        }
        if (data in pending_handshake[room]) {
          pending_handshake[room][data].forEach(payload => {
            console.log('sending pending handshake');
            id_to_socket[room][data].send(payload);
          })
        }
      } else if (evt === 'handshake') {
        console.log('handshake message room: ', room);
        let to = dec.to;
        let from = dec.from;
        let payload = JSON.stringify({
          event: evt,
          data: data,
          from: from,
          room: room
        })
        if (to in id_to_socket[room]) {
          console.log('sending to: ', to);
          id_to_socket[room][to].send(payload);
        } else {
          console.log('couldnt find ', to, 'putting in pending handshake');
          if (to in pending_handshake[room]) {
            pending_handshake[room][to].push(payload);
          } else {
            pending_handshake[room][to] = [payload];
          }
        }
      }
    })
  })
  console.log("DEV, running on port 9009");
  server.listen(9009, () => {
    console.log("WS server on port 9009")
  } );
}
