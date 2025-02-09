import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "../Constants/UserContext";

const Write=()=>{
    const{UserName}=useContext(UserContext)
    const[title,settitle]=useState('');
    const[content,setContent]=useState('');
    const[image,setImage]=useState(null);
    const[fav,setFav]=useState(false);
    const username=UserName;
    const d=new Date();
    const day=d.getDate();
    const month=d.getMonth()+1;
    const year=d.getFullYear();
   const date ={day,month,year}
    const handleImage=(e)=>{
        const files = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(files);
            reader.onloadend = () =>{
                setImage( reader.result)
            }
        }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:4000/api/diary/Write",{username,title,content,fav,date,image})
        .then(result=> console.log(result))
        .catch(err => console.log(err));
    }
return(
    <div className="w-full">
        <form onSubmit={handleSubmit}>
            <div className="p-2 m-2">
                <input type="text" placeholder="title" className="w-full p-2 rounded-xl" onChange={(e)=>{settitle(e.target.value)}}></input>
                <button onClick={()=>{setFav(!fav)}}></button>
            </div>
            <div className="p-2 m-2">
                <textarea rows="20" className="w-full p-2 rounded-xl " onChange={(e)=>{setContent(e.target.value)}}></textarea>
            </div>
            <div className="p-2 m-2"> 
                <input type="file" name="image" onChange={handleImage}></input>
            </div>
            <div className="p-2 m-2">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
);
}
export default Write;