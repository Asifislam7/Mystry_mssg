/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";

type ConnectionObject ={
    isConnected?: number;
}


const connection: ConnectionObject ={

}


async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }
    const db = await mongoose.connect(process.env.MONGODB_URI);

    //unified topology new urlParser these are not availabe for the newer versions of the mongoose

    connection.isConnected = db.connections[0].readyState;
}