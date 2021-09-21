var express = require('express');
// var socket = require('socket.io');
const port = process.env.PORT || 30000;
var app = express();
var server = app.listen(port, () => console.log(`Server started on port ${port}`));
var io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"]
  }
});
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

// Set static path
app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json());

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribeA", (req, res) => {
  // Get pushSubscription object
  // console.log(req.body.dataSubscribe);
  const subscription = req.body.dataSubscribe;
  const dataNotif = req.body.dataNotif;
  // var dataA = JSON.stringify(req);
  // console.log("muncul gak ya :" + JSON.stringify(subscription));

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ head: dataNotif.head, content: dataNotif.content });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

io.on('connection', function (socket) {

  socket.on('notifikasi', function (data) {
    io.sockets.emit('notifikasi', {
      isi_notif: data.isi_notif
    });
  });
});
