import Todo from "../models/todoModel.js";

// Get todos for a device
export const getTodo = async (req, res) => {
  try {
    const { deviceId } = req.query;
    if (!deviceId) return res.status(400).json({ message: "Device ID required" });

    // Only return todos for this device
    const todos = await Todo.find({ deviceId: deviceId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, deviceId } = req.body;
    if (!deviceId) return res.status(400).json({ message: "Device ID required" });

    const todo = new Todo({ title, deviceId });
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update todo (toggle completed)
export const updateTodo = async (req, res) => {
  try {
    const { deviceId } = req.body;
    const todo = await Todo.findOne({ _id: req.params.id, deviceId });
    if (!todo) return res.status(404).json({ message: "Todo not found for this device" });

    todo.completed = !todo.completed;
    const updated = await todo.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const { deviceId } = req.body;
    const todo = await Todo.findOne({ _id: req.params.id, deviceId });
    if (!todo) return res.status(404).json({ message: "Todo not found for this device" });

    await todo.deleteOne();
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Optional: assign a dummy deviceId to old todos (run once)
export const assignDummyDevice = async () => {
  try {
    await Todo.updateMany(
      { deviceId: { $exists: false } },
      { $set: { deviceId: "old-todos" } }
    );
    console.log("Old todos updated to dummy deviceId");
  } catch (error) {
    console.log(error.message);
  }
};
