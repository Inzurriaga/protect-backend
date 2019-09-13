const express = require("express");
const app = express();
var socket = require('socket.io');

app.locals.users = [];
app.locals.title = "hello im the backend"

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
  socket.on("what", function(data){
    updateUser(data)
    io.emit("what", app.locals.users)
  })
});

// this is for user position and update

function updateUser(data) {
  const { users } = app.locals
  const userCheck = users.find( user => user.id === data.id)
  if(!userCheck){
    users.push(data)
  }else{
    app.locals.users = users.map(user => {
      if(user.id == data.id){
        return data
      }
      return user
    })
  }
}
