import mongoose from "mongoose";

const connectToDb=()=>mongoose.connect("mongodb+srv://danish99:danish99@studentms.atuf0mq.mongodb.net/voosh?retryWrites=true&w=majority");

export {connectToDb};