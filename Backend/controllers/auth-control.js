const User = require("../Models/user_models");
const SignIn=async(req,res)=>{
    try {
        const { username, password } = req.body;
        console.log(req.body)
        const userExist = await User.findOne({ username:username });
    
        if (!userExist) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await userExist.comparePassword(password);
    
        if (isPasswordValid) {
          res.status(200).json({
            message: "Login Successful",
            userId: userExist._id.toString(),
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
        console.log(req.body);
        const body = req.body;
    
        const userExist = await User.findOne({ email: body.email });
    
        if (userExist) {
          return res.status(400).json({ msg: "email already exists" });
        }
    
        const userCreated = await User.create(body);

        res.status(201).json({
          msg: "Registration Successful",
          userId: userCreated._id.toString(),
        });
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
      }
  };
  const Sentiment = async(req,res)=>{
    
    try{
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      console.log(req.body.text)
    const response= await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative."
        },
        {
          "role": "user",
          "content": req.body.text
        }
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });
    console.log(response)
  }
    catch(err){
      console.log(err)
}  
}

module.exports={SignIn,Signup,Sentiment}
