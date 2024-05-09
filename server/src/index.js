const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//All currencies
app.get("/getAllCurrencies" , async (req, res)=>{
    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=0c2443dbd3614194a21be8bbe449c954";

    try{   
    const namesResponce = await axios.get(nameURL);
    const nameData = namesResponce.data;

    return res.json(nameData);

    }catch(err){
        console.error(err);
    }
});

//listen to a port
app.listen( 5000 , ()=>{
    console.log("SERVER STARTED");
});