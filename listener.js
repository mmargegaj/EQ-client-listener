const { io } = require("socket.io-client");

const socket = io(`ws://62.171.176.99:3000`);

socket.on("connect", () => {
  console.log("Socket connected. Listening...");
});

socket.on("disconnect", (reason) => {
  console.log(`Disconnected: ${reason}`);
});

socket.on("successful_prediction", ({ earthquake, prediction }) => {
  try {
    console.log(prediction);
    console.log(earthquake.text);
  } catch (error) {
    console.log(error);
  }
});

socket.on("new_predictions", ({ predictions }) => {
  try {
    console.log(`${predictions.length} new predictions`);
    // do something with predictions
  } catch (error) {
    console.log(error);
  }
});

// You can also make get requests to get daily reports
// Try a get request to http://62.171.176.99:3000/reports?page=1&limit=20
