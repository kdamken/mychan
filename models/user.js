const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const User = mongoose.model(
//   "User",
//   new Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true }
//   })
// );

const UserSchema = new Schema({
  // first_name: { type: String, required: true, maxLength: 30 },
  // last_name: { type: String, required: true, maxLength: 30 },
  username: { type: String, required: true, maxLength: 20 },
  // email: { type: String, required: true, maxLength: 60 },
  password: { type: String, required: true, maxLength: 100 },
  member: { type: Boolean, required: true },
  admin: { type: Boolean, required: true },
  // membership_status: { type: String, maxLength: 30 } // need to figure out how to choose setting
});

// // Virtual for author's full name
// AuthorSchema.virtual("name").get(function () {
//     // To avoid errors in cases where an author does not have either a family name or first name
//     // We want to make sure we handle the exception by returning an empty string for that case
//     let fullname = "";
//     if (this.first_name && this.family_name) {
//       fullname = `${this.family_name}, ${this.first_name}`;
//     }

//     return fullname;
//   });


// Virtual for category's URL
UserSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/user/${this._id}`;
});

// AuthorSchema.virtual("date_of_birth_formatted").get(function () {
//   return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
// });

// AuthorSchema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
//   return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toISODate() : '';
// });

// AuthorSchema.virtual("date_of_death_formatted").get(function () {
//   return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
// });

// AuthorSchema.virtual("date_of_death_yyyy_mm_dd").get(function () {
//   return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toISODate() : '';
// });

// AuthorSchema.virtual("lifespan").get(function () {
//   return (this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '') + " - " + (this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '');
// });

// Export model
module.exports = mongoose.model("User", UserSchema);