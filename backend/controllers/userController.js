import User from "../models/userModel.js";

const Register = async (req, res, next) => {

    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: "Please fill the all required field"
            });
        }

        const userExist = await User.findOne({ email: req.body.email });

        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "This Email Already Exist"
            })
        }

        const user = await User.create(req.body);

        const token = await user.getJWTToken();

        const option = {
            expire: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, option).json({
            success: true,
            user,
            token
        })

    } catch (error) {

        res.status(500).json({

            error: false,
            message: "Enternal Server Error"
        })
    }
}

const Login = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter Email & Password"
            });
        }

        const user = await User.findOne({ email: req.body.email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordMatch = await user.comparePassword(req.body.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        const Token = await user.getJWTToken();

        const option = {
            expire: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        }

        res.status(200).cookie("token", Token, option).json({
            success: true,
            user,
            Token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Enternal Server Error"
        })
    }
}

const Home = async (req, res, next) => {


    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({
            success: true,
            message: "User not found"
        });
    }
    res.status(200).json({
        success: true,
        user
    })
}


export { Register, Login, Home }