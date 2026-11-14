

import mongoose from "mongoose";
import { MONGO_URI } from "../config/config";

const ConnectionDB = async () => {
    await mongoose.connect(MONGO_URI)
        .then(() => {
            console.log("DB connected successfully");
        })
        .catch((err: any) => {
            console.log("DB connected failed");
        });
};

export default ConnectionDB;
