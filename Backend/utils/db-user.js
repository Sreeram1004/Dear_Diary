const mongoose =require("mongoose");
const { MongoClient } = require('mongodb');
const uri_user="mongodb+srv://sreeramangina:Df05rk9DBS6BrJOY@cluster0.ms09c2k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri_user, {
});
const connectDB_user =async()=>{
try{
    await client.connect()
    // await mongoose.createConnection(uri_user,{socketTimeoutMS: 45000, // Increase as needed
    //     connectTimeoutMS: 30000});
    console.log("connected");
}
catch(err){
    console.log(err);
}
}

module.exports = {connectDB_user,client};