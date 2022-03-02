const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, `must provide title`],
      trim: true,
      maxlength: [25, `title can't be more than 25 character`],
   },
   isComplete: {
      type: Boolean,
      default: false,
   }, 
});

module.exports = mongoose.model("Task", TaskSchema);
