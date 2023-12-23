const io = require("socket.io-client");

const socket = io(`ws://62.171.176.99:3000`);

socket.on("connect", () => {
  console.log("socket connected");
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
    const successfulPrediction = JSON.parse(data);
    console.log(`Successful prediction: ${successfulPrediction}`);
  } catch (error) {}
});

socket.on("new_predictions", (data) => {
  try {
    const predictions = JSON.parse(data);
    console.log(`${predictions.length} new predictions`);
    // do something with predictions
  } catch (error) {}
});
