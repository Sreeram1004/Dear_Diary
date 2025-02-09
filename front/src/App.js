import Header from "./components/Header";
import Home from "./components/Home";
import { createBrowserRouter,Outlet} from 'react-router-dom';
import Write from "./components/Write";
import Media from "./components/Media";
import Calender from "./components/Calender"
import Memories from "./components/Memories"
import Sidebar from "./components/Sidebar";
import Sign from "./components/Sign";
import Signup from "./components/Signup";
import UserContext from "./Constants/UserContext";
import { useContext,useState } from "react";
const App =()=>{
  const {seen,loggedIn}=useContext(UserContext)
  const [login,setLogin]=useState(false);
  const [pop,setPop]=useState(false);
  const [uname,setUname]=useState(null);
  return (
    <UserContext.Provider value={{seen : pop,setPop,loggedIn:login,setLogin,UserName:uname,setUname}}>
<div className="m-0 p-0 flex ">
    <div className="sticky top-0 h-screen">
    <Sidebar />
    </div>
    <div className="w-full bg-[url('https://img.freepik.com/free-photo/top-view-open-notepad-with-feijoas-flowers_140725-133171.jpg?w=1060&t=st=1719543986~exp=1719544586~hmac=f01d4404fa9acaf231523fe5e83033f691f7541bedfb58a95f290820e4ae13fb')] bg-no-repeat bg-cover bg-center">
      <Header/>
      <Outlet/>
    </div>
    {pop?<Sign/>:null}
    {login?<Signup/>:null}
</div>
</UserContext.Provider>
  );
}
export const appRouter = createBrowserRouter([
  {
      path : "/",
      element : <App/>,
      children: [
          {
              path: "/",
              element : <Home/>
          },
          {
            path: "/Write",
            element : <Write/>
          }, 
          {
            path: "/Media",
            element : <Media/>
          },
          {
            path: "/Calender",
            element : <Calender/>
          },
          {
            path: "/Memories",
            element : <Memories/>
          },   
      ]
  },
  

])

export default App;
