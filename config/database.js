const mongoose = require("mongoose");

const connectDatabase = async () => {
  console.log("DB_URI =", process.env.DB_URI);

  try {
    const con = await mongoose.connect(process.env.DB_URI);
    console.log(`mongodb connected with HOST:${con.connection.host}`);
  } catch (error) {
    console.log("MongoDB Connection Error:");
    console.log(error);
  }
};

module.exports = connectDatabase;
