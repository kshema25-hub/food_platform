// start the server

const app = require("./app");
const dotenv = require("dotenv");
// load env variable
dotenv.config({ path: "./config.env" });
// start server
PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
