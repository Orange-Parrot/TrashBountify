const express = require("express")
const userRoute = require("./userRoute")

const authService = require("../services/authentication");
const userSchema = require("../models/user.js");
const bountySchema = require("../models/bountySchema.js");
const jwtAuthMiddleware = require('../middlewares/jwtAuth');
const userFromJwtMiddleware = require('../middlewares/userFromJwt');
const user = require("../models/user");
// guaranteed to get dependencies
module.exports=( () => {
	const app = express.Router();
	app.use(jwtAuthMiddleware);
	app.use(userFromJwtMiddleware);
	app.get("/bounty",async function(req,res){
        var obj = await bountySchema.find({}).lean();

        res.json(obj);
    })
	app.get("/userData",async function(req,res){
        var obj = await req.foundUser.populate("takenBounty").populate("postedBounty").execPopulate();
        console.log(obj)
        res.json(obj)
    })
    
	app.get("/takeBounty/:id", async function(req,res){
        console.log(req.params.id);
        var obj = await bountySchema.findById(req.params.id);
        req.foundUser.takenBounty.push(obj._id);
        req.foundUser.save();
        res.end();
    })
	app.post("/bounty", async function(req,res){
		console.log(req.body);
		var obj = await bountySchema.create({
            bounty:req.body.bounty,
            description:req.body.description,
            location:{
                type:"point",
                coordinates: [req.body.coord[0],req.body.coord[1]]
            },
            
            date:Date.now()
        })
        req.foundUser.postedBounty.push(obj._id);
        req.foundUser.save();
        res.send(obj);
	})
	
	return app;
})();