const mongoose = require("mongoose");
const volunteerSchema = mongoose.Schema({
    name:String,
    email:String,
    railroadline:String,
    takenBounty:[{type:mongoose.Schema.Types.ObjectId,ref:"bounty", require:false}],
    postedBounty:[{type:mongoose.Schema.Types.ObjectId,ref:"bounty", require:false}]
    

},{strict:false})
module.exports = mongoose.model("user",volunteerSchema);