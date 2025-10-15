import mongoose from "mongoose";
const schema=new mongoose.Schema({
  title:{type:String,required:true},
  completed:{type:Boolean,default:false}
});
const todo=mongoose.model("Todo",schema);
export default todo;