import { useContext, useEffect, useState } from "react";
import UserContext from "../Constants/UserContext";
import axios from "axios";
const Media=()=>{
    const [img,setImg]=useState([]);
    const {UserName}=useContext(UserContext)
    useEffect(()=>{
        axios.get(`http://localhost:4000/api/diary/Media/?username=${UserName}`)
        .then((res)=>{
            // console.log(res)
            setImg(res.data.media);
            console.log(img)
        })
        .catch((error =>{
            console.log(error);
        }))
    }, []);
    return(
        <div>
            {console.log(img)}
            { 
            img.map((user)=>{
               return(<div>
                    <img src={user.url}></img>
                    <h1>{user.date.day}-{user.date.month}-{user.date.year}</h1>
                    </div>
                )
            })
            }
        </div>
    );

}
export default Media;