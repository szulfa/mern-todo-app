import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  deviceId: { type: String, required: true } // link todo to device
});

const Todo = mongoose.model("Todo", schema);

export default Todo;
