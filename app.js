const express = require("express")
const mustache = require("mustache-express")
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
//const methodOverride = require("method-override");
const router = require("./routers")
var cookieParser = require('cookie-parser')

async function startServer(){
  const app = express();
    app.engine('html', mustache(__dirname + '/partials', '.mst'));
    app.set('view engine', 'html');
    app.disable('view cache');
  const connection = await mongoose.connect("mongodb://localhost/cleanerBounty",{  useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true })
  app.use(cookieParser())
  app.use(express.static("public"));
  app.use("/pfp",express.static("pfp"));
  app.use("/uploads",express.static("uploads"));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use("/",router);
 // app.use(methodOverride("_method"));

  app.listen(80,"0.0.0.0",(err)=>{
    if(err){
      console.log("err "+err);
    }
    else{
      console.log("Server is listening");
    }
  })
}
startServer();
