const { default: mongoose } = require("mongoose");
const { PositionsSchema } = require("../schemas/positonsschema");

const positon= mongoose.model("positon",PositionsSchema);

module.exports={positon};