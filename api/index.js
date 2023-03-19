const express=require("express");
const { api } = require("../config");
const { user } = require("./components/network");

const app = express();

//Router
app.use("/api/user", user);
app.listen(api.port, ()=>{
    console.log("http://localhost:"+api.port);
});