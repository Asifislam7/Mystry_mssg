/* eslint-disable @typescript-eslint/no-unused-vars */

import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}


const MessageSchema:Schema<Message>= new Schema({
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})


export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpires: Date;
    messages: Message[];
    isAcceptingMessage: boolean;
}

const UserSchema:Schema<User>= new Schema({
    username: {type: String, required: [true, "Username is required"], trim :true, unique: true},
    email: {type: String, required: true, unique:true, match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email"]},
    password: {type: String, required: [true, "password is required"]},
    verifyCode: {type: String, required: true},
    verifyCodeExpires: {type: Date, required: true},
    messages: [MessageSchema],
    isAcceptingMessage: {type: Boolean, default: true},
})

export default mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema);



