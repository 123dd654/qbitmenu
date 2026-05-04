const express = require('express');
const next = require('next');
const http = require('http');
const socketIo = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

const PORT = process.env.PORT || 3000;

// HTTP 서버
const httpServer = http.createServer(server);
const io = socketIo(httpServer);

// 상태 저장
const connectedClients = {};
const clientBags = {};

app.prepare().then(() => {
  server.use(express.json());

  // Next.js가 전부 처리
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Socket 연결
  io.on('connection', (socket) => {
    console.log('a user connected');

    connectedClients[socket.id] = socket;

    io.emit('viewers', Object.keys(connectedClients).length);
    io.emit('otherBags', Object.values(clientBags));

    socket.on('updateBag', (updatedBag) => {
      clientBags[socket.id] = updatedBag;
      socket.broadcast.emit('otherBags', Object.values(clientBags));
    });

    socket.on('placeOrder', () => {
      // 각 클라이언트한테 본인 기준으로 따로 보내기
      Object.keys(connectedClients).forEach((id) => {
        const myBag = clientBags[id] || { items: [] };
        const otherBags = Object.entries(clientBags)
          .filter(([otherId]) => otherId !== id)
          .map(([_, bag]) => bag);

        connectedClients[id].emit('orderPlaced', { myBag, otherBags });
      });

      // 장바구니 비우기
      Object.keys(clientBags).forEach((id) => {
        clientBags[id] = { ...clientBags[id], items: [], totalItems: 0, totalPrice: 0 };
      });

      io.emit('otherBags', Object.values(clientBags));
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');

      delete connectedClients[socket.id];
      delete clientBags[socket.id];

      io.emit('viewers', Object.keys(connectedClients).length);
      io.emit('otherBags', Object.values(clientBags));
    });
  });

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at port: ${PORT}`);
  });
});