const express=require("express")
var app=express()

app.get("/",(req,res)=>{
    res.status(200).send("Home page");

})


app.listen(3128,()=>{
    console.log("Listenig to port 3128")
})
