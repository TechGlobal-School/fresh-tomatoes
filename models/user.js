const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Encrypt user password before saving it to DB
userSchema.pre("save", function (next) {
  // const user = this;
  if (!this.isModified("password")) {
    return next();
  }
  // sync solution
  // const salt = bcrypt.genSalt(10);
  // const hash = bcrypt.hash(this.password, salt);
  // this.password = hash;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (_, hash) => {
      this.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
