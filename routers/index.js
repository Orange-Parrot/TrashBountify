const express = require("express")
const userRoute = require("./userRoute")

const authService = require("../services/authentication");

const bountySchema = require("../models/bountySchema.js");
const jwtAuthMiddleware = require('../middlewares/jwtAuth');
const userFromJwtMiddleware = require('../middlewares/userFromJwt');
const bountyRoute = require("./bountyRoute");
// guaranteed to get dependencies
module.exports=( () => {
	const app = express.Router();

	app.get("/",function(res,req){
        req.render("index",{});
    })

	app.get("/signup",function(req,res){
		res.render("signup",{});
	})
	app.get("/login", function(req,res){
		res.render("login",{});
	})
	app.get("/", async function(req,res){
		let recentSeminar = await SeminarService.getRecentSeminars();
		res.render("index",{recentSeminar});
	})
	app.post("/login",async function(req,res){
		try{
			var [jwtToken,userData] = await authService.login(req.body.user);//make a jwt token , return undefined if cant find user
			if(!jwtToken){//if cant find user or incorrect password
				return res.status(401).send("cant login");
			
			}
			res.cookie("token",jwtToken).json(userData);
		
		}
		catch(e){
			console.log(e);
			res.status(500).send("error");
		}

	})
	app.post("/bounty", async function(req,res){
		console.log(req.body);
		bountySchema.create({
			
		})
	})
	app.post("/signup",async function(req,res){
		
		var result = await authService.signUp(req.body);
		console.log(result);
		if(!result){//if cant find user or incorrect password
			return res.status(401).redirect("/login");
			
		}
		console.log(result[1]);
		res.cookie("token",result[0]).json(result[1]);//result made up of token and user data
	})
	app.use("/b",bountyRoute);
	return app;
})();