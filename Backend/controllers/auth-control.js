const User = require("../Models/user_models");
const { client } = require("../utils/db-user");
const bcrypt = require("bcrypt");
const SignIn=async(req,res)=>{
    try {
      await client.connect();
      const db = client.db('User'); 
      const Collection = db.collection('users');
        const { username, password } = req.body;
        console.log(req.body)
        const userExist = await Collection.find({ username:username });
    
        if (!userExist) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const isPasswordValid =async function (password) {
          return bcrypt.compare(password, this.password);
        };
    
        if (isPasswordValid) {
          res.status(200).json({
            message: "Login Successful",
            username: username,
          });
          console.log("hello")
        } else {
          res.status(200).json({ message: "Invalid email or passord " });
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
      }
    };
const Signup = async (req, res) => {
    try {
        // const data = req.body
        await client.connect();
      const db = client.db('User'); 
      const Collection = db.collection('users');
        console.log(req.body);
        const body = req.body;
        const saltRound = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(body.password, saltRound);
      body.password = hashedPassword;
        const userExist = await Collection.findOne({ email: body.email });
    
        if (userExist) {
          return res.status(400).json({ msg: "email already exists" });
        }
    
        const userCreated = await Collection.insertOne(body);

        res.status(201).json({
          msg: "Registration Successful",
          username:body.username
        });
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
      }
  };
module.exports={SignIn,Signup}
