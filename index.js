const blockChainClass = require("./utils/blockchain").BlockChain;
var sha256 = require("sha256");
const express = require('express');
const bodyParser = require('body-parser');
const arg = require('arg');


const args = arg({
    // Types
    '--port':Number
});
var port = args["--port"];

const app = express();

var myWalletAddress = sha256("sarthak sadh");
var obj = new  blockChainClass(myWalletAddress);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.send("server running")
});

app.get("/my-chain",(req,res)=>{
    res.json(obj.getChain())
})

app.get("/pending-transaction",(req,res)=>{
    res.json(obj.getAllTransactions())
})

app.get("/connected-nodes",(req,res)=>{
    console.log(obj.getAllConnectedNodes())
    res.json(obj.getAllConnectedNodes())

});


app.post("/add-node",(req,res)=>{
    obj.addNodes(req.body.node);
    res.send("Node ==> "+req.body.node+" added");
})

app.post("/new-transaction-notification",(req,res)=>{
    obj.addTransaction(req.body.sender,req.body.receiver,req.body.coins,req.body.fees);
    res.send("added");

});





app.post("/add-transaction",(req,res)=>{
    obj.addTransaction(req.body.sender,req.body.receiver,req.body.coins,req.body.fees);
    res.send("added");
});



app.listen(port,()=>{
    console.log("server running "+port);
});



