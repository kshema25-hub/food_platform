// configure express and middleware

//import packages
// create express app
//               client => app => route =>response
// configure middleware
// middleware is the function that runs betn the req and response
// req => middleware => Route => res
// export the app
const express = require("express");
const app = express();
const auth = require("./routes/auth");
const restaurant = require("./routes/restaurant");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/api/v1/users", auth);
app.use("/api/v1/restaurants", restaurant);
module.exports = app;
