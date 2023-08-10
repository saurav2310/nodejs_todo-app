import { Task } from "../models/task.js";

// add new task
export const newTask = async (req, res, next) => {
  const { title, description } = req.body;

  await Task.create({
    title,
    description,
    user: req.user,
  });
  res.status(201).json({
    success: true,
    message: "Task added successfully",
  });
};

// get all current user tasks
export const getMyTask = async (req, res, next) => {
  const userid = req.user._id;
  const tasks = await Task.find({ user: userid });

  res.status(201).json({
    success: true,
    tasks,
  });
};

// update a task
export const updateTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) return next(new Error("Invalid"));
  task.isCompleted = !task.isCompleted;
  await task.save();

  res.status(201).json({
    success: true,
    message: "Task Updated",
  });
};

// delete a task
export const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) return next(new Error("Invalid"));

  await task.deleteOne();

  res.status(201).json({
    success: true,
    message: "Task Deleted",
  });
};
