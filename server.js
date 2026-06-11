// start the server

const app=require("./app");
const dotenv=require("dotenv");
// load env variable
dotenv.config({path:"./config.env"});
// start server

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})