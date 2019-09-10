const express = require("express");
const app = express();
var socket = require('socket.io');

app.locals.title = 'Pet Box';

app.use(express.json());

const http = app.listen(3000 ,() => {
  console.log("hello world")
})

const io = socket(http)

app.get('/', (request, response) => {
  console.log("hello")
  response.send(app.locals.title);

});

io.on('connection', function(socket){
  console.log("a user connected");
  socket.on("what", (msg) => {
    console.log(msg)
  })
});
