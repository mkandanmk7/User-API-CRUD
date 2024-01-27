import httpStatus from "http-status";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const isUserAlreadyExist = async (name) => {
    let isUserExist = await User.findOne({ name })
    console.log("user name", isUserExist);
    return !!isUserExist;

}
const isUserEmailAlreadyExist = async (email) => {
    let userEmail = await User.findOne({ email });
    console.log("email", userEmail);
    return !!userEmail;
}

const getUserById = async (userId) => {
    try {
        let user = await User.findById({ _id: userId });
        if (!user) return null;
        // let { password, ...otherData } = user.toObject();

        return user;

    } catch (error) {
        console.log(error.message);
        throw new Error("Error in getting user data");
    }
}

export const createUser = async (req, res) => {

    const { name, email, password } = req.body;
    let userNameExist = await isUserAlreadyExist(name);
    if (userNameExist) {
        return res.status(httpStatus.NOT_ACCEPTABLE).json({ error: "User name already exist" });
    }
    let userEmailExist = await isUserEmailAlreadyExist(email);
    if (userEmailExist) {
        return res.status(httpStatus.NOT_ACCEPTABLE).json({ error: "User Email already exist" });
    }
    let hashPassword = await bcrypt.hash(password, 10);

    let newUser = new User({
        name,
        email,
        password: hashPassword
    });
    let user = await newUser.save();
    res.status(201).json({
        success: true,
        data: user
    })

}

export const getUsers = async (req, res) => {
    try {
        let allUsers = await User.find();

        res.status(200).json({
            success: true,
            data: allUsers
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Error in get all users"
        })
    }
}

export const getUser = async (req, res) => {
    try {
        let { userId } = req.params;
        let user = await getUserById(userId);
        // console.log({user});
        if (!user) res.status(httpStatus.NOT_FOUND).json({
            error: "User not found"
        })

        res.status(200).json({
            success: true,
            data: user
        })

    } catch (error) {
        console.log(error.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Error in get user"
        })
    }
};

export const updateUser = async (req, res) => {
    try {
        let { userId } = req.params;
        let { password, ...otherFields } = req.body;
        let user = await getUserById(userId);
        if (!user) res.status(httpStatus.NOT_FOUND).json({
            error: "User not found"
        })
        let userNameExist = await isUserAlreadyExist(otherFields.name);
        if (userNameExist) {
            return res.status(httpStatus.NOT_ACCEPTABLE).json({ error: "User name already exist" });
        }
        let userEmailExist = await isUserEmailAlreadyExist(otherFields.email);
        if (userEmailExist) {
            return res.status(httpStatus.NOT_ACCEPTABLE).json({ error: "User Email already exist" });
        }
        if (password) {
            let hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
        }
        Object.assign(user, otherFields);
        await user.save();

        res.status(200).json({
            success: true,
            data: user,
        })


    } catch (error) {
        console.log(error.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Error in update user"
        })
    }
};

export const deletUser = async (req, res) => {
    try {
        let { userId } = req.params;
        let user = await User.findById({_id:userId});
        await user.deleteOne({_id:userId});
        res.status(200).json({
            success:true,
            message:"deleted successfully"
        })
    } catch (error) {
        console.log(error.message);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Error in delete user"
        })
    }
};


