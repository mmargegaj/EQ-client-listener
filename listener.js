const logger = require("node-color-log");
const io = require("socket.io-client");

const socket = io(`ws://62.171.176.99:3000`);

socket.on("eqInfo", (data) => {
  logger.info(data);
});

socket.on("connect", () => {
  logger.info("socket connected");
});

socket.on("disconnect", (reason) => {
  logger.warn(reason);
  if (reason === "io server disconnect") {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  } else if (reason === "transport close") {
    logger.error("Server died");
  }
  // else the socket will automatically try to reconnect
});

socket.on("successful_prediction", (data) => {
  try {
    const a = JSON.parse(data);
    logger.info(`Successful prediction: ${a.message}`);
  } catch (error) {}
});

socket.on("new_predictions", (data) => {
  try {
    const a = JSON.parse(data);
    logger.info(`${a.length} new predictions`);
  } catch (error) {}
});
