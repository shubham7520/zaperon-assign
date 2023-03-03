import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const isAuthenticatesUser = async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false, message: "please provide a token"
        });
    }

    const decodeData = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decodeData.id);

    next();
}

export { isAuthenticatesUser }