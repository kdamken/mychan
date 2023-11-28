const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {DateTime} = require('luxon');

const MessageSchema = new Schema({
  message: { type: String, required: true, maxLength: 1000 },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
});

// Virtual for category's URL
MessageSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/user/${this._id}`;
});

MessageSchema.virtual("date_formatted").get(function () {
  return this.date ? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED) : '';
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);