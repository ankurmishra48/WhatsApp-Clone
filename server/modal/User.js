import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  sub: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String },
  picture: { type: String },
  given_name: { type: String },
  family_name: { type: String },
  aud: { type: String },
  azp: { type: String },
  email_verified: { type: Boolean },
  exp: { type: Number },
  iat: { type: Number },
  iss: { type: String },
  jti: { type: String },
  nbf: { type: Number },
});

const User = mongoose.model("user", userSchema);
export default User;
