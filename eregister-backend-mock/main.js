const express = require("express")
const dotenv = require("dotenv")
const sockjs = require('sockjs');

dotenv.config()

const app = express()
app.use(express.json())

const routes = require("./controllers")
app.use("/", routes)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log("server is listening at ", PORT)
})

const echo = sockjs.createServer({ prefix:'/eregister-service/websocket' });
echo.on('connection', function(conn) {
  conn.on('remainingSlots', function(message) {
    conn.write(message);
  });
  conn.on('close', function() {});
});

echo.installHandlers(server)

