const logger = require("node-color-log");
const io = require("socket.io-client");

(() => {
  const socket = io(`http://${process.argv[2]}:3000`);
  setInterval(() => null, 30000);
  socket.on("eqInfo", (data) => {
    logger.info(data);
  });

  socket.on("connection", () => {
    logger.info("connected");
  });

  socket.on("disconnect", (reason) => {
    logger.warn(reason);
    if (reason === "io server disconnect") {
      // the disconnection was initiated by the server, you need to reconnect manually
      socket.connect();
    } else if (reason === "transport close"){
      logger.error("Server stopped");
    }
    // else the socket will automatically try to reconnect
  });

  socket.on("predictionInfo", (data) => {
    logger.info(data);
  });

  socket.on("new_earthquakes", (data) => {
    logger.info(data);
  });
})();
