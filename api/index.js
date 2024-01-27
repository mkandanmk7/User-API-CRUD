import mongoose from "mongoose";
import app from "./app.js";
let server;

let mongoURI = "mongodb+srv://muthumanikandanmk07:muthu123@cluster0.f4vd3bn.mongodb.net/";

const connect = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("db connected");
        server = app.listen(9000, () => {
            console.log("server started");
        })
    } catch (error) {
        console.log("Error in  sever", error.message);
    }
}

connect();