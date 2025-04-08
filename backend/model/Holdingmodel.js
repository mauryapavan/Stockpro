const {model, default: mongoose}=require("mongoose");
const { HoldingSchema } = require("../schemas/Holdingschema");

const Holding=  mongoose.model("holding",HoldingSchema);

module.exports={Holding};