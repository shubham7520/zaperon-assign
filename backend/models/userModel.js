import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enterPassword) {

    return await bcrypt.compare(enterPassword, this.password)

}

userSchema.methods.getJWTToken = async function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE })
}

const user = mongoose.model('user', userSchema);

export default user;