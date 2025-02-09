import { useContext } from "react";

import UserContext from "../Constants/UserContext";

const Header =()=>{
    const {seen,setPop,loggedIn,setLogin,UserName,setUname}=useContext(UserContext);
    // const toggleup=()=>{
    //     setSeen(!seen)
    // }
    // {console.log(seen)}
    return(
        <div className="flex bg-slate-150 justify-end items-end">
            {UserName===null?
            <button className="bg-blend-color-burn p-2 m-2" onClick={()=>{setPop(!seen);
            }}> signin</button>:<h1 className="m-2 p-2 bg-yellow-50 rounded-xl">{UserName}</h1>}
        </div>
    )
}
export default Header;