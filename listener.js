const { io } = require("socket.io-client");

const socket = io(`ws://62.171.176.99:3000`);

socket.on("connect", () => {
  console.log("Socket connected. Listening...");
});

socket.on("disconnect", (reason) => {
  console.log(`Disconnected: ${reason}`);
});

socket.on("message", (data) => {
  console.log(data);
});

socket.on("successful_prediction", (data) => {
  try {
    const successfulPrediction = JSON.parse(data);
    console.log(`Successful prediction: ${successfulPrediction}`);
  } catch (error) {
    console.log(error);
  }
});

socket.on("new_predictions", (data) => {
  try {
    const predictions = JSON.parse(data);
    console.log(`${predictions.length} new predictions`);
    // do something with predictions
  } catch (error) {
    console.log(error);
  }
});
