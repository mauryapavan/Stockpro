
import mongoose from "mongoose";
import { Orderscheema } from "../schemas/OrderSchema.js";

export const order=mongoose.model("order",Orderscheema);
// module.exports={order};
