const express = require("express");
const { success, error } = require("../../network/response");

const user = express.Router();

user.get("/", (req, res)=>{
    success(req, res, "todos correcto", 200);
});

module.exports={user}