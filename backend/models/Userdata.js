import mongoose from "mongoose";

const UserDataSchema = new mongoose.Schema({
    userdata: { type: String}
});

const userdata = mongoose.model("userdata", UserDataSchema);

export default userdata;
