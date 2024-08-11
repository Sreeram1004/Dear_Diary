const express =require("express");
const cors=require("cors")
const user_router =require("./router/auth-router");
const {connectDB_diary} =require("./utils/db-diary");
const {connectDB_user} =require("./utils/db-user");
const diary_router = require("./router/diary_routes");
const app1=express();
const app2=express();
app1.use(cors());
app1.use(express.json());
app1.use("/api/user",user_router);
app2.use(cors());
app2.use(express.json({limit: '50mb'}));
app2.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app2.use("/api/diary",diary_router)
const Port =5000;
connectDB_user().then(() => {
  app1.listen(5000, () => {
    console.log(`server is running at port: 5000`);
  });
});
connectDB_diary().then(() => {
  app2.listen(4000, () => {
    console.log(`server is running at port: 4000`);
  });
});