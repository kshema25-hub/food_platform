// start the server

const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
// load env variable
dotenv.config({ path: "./config/config.env" });
// connect to database
connectDatabase();
// start server
PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
