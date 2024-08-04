const mongoose =require("mongoose");
const uri_user="mongodb+srv://sreeramangina:QfK26F3wq78hsY32@diary.dtxwfls.mongodb.net/list?retryWrites=true&w=majority&appName=Diary";
const connectDB_user =async()=>{
try{
    await mongoose.createConnection(uri_user,{socketTimeoutMS: 45000, // Increase as needed
        connectTimeoutMS: 30000});
    console.log("connected");
}
catch(err){
    console.log(err);
}
}

module.exports = connectDB_user;