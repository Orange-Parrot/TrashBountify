const mongoose = require("mongoose");
const bountySchema = mongoose.Schema({
    
    userID:{type:mongoose.Schema.Types.ObjectId,ref:"user", require:false},
    description:String,
    bounty:String,
    location:{
        type:{
            type:String,
            enum:["point"],
            require:true
        },
        coordinates: {
            type: [Number],
            required: true
          }
    },
    
    date:Date
  

    

},{strict:false})
module.exports = mongoose.model("bounty",bountySchema);