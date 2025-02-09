import { useContext, useState } from "react"
import axios from "axios"
import UserContext from "../Constants/UserContext"
const Sign=()=>{
        const {seen,setPop,loggedIn,setLogin,UserName,setUname}=useContext(UserContext)
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [invalid,setInvalid] =useState(false)
        const handleLogin=(e) =>{
            e.preventDefault()
            axios.post("http://localhost:5000/api/user/SignIn",{username,password})
            .then(result=> {
                console.log(result)
                    if(result.data.message==="Login Successful"){
                        setPop(!seen)
                        setUname(username)
                    }
                     else{
                    setInvalid(true)
                    }
                }
            )
            .catch(err => {console.log(err);
                console.log("hello world");
            });   
        }
    
        return (
            <div className=" fixed p-4 m-4 overflow-auto top-48 left-2/4 bg-gradient-to-tl from-red-100 to-rose-500 rounded-xl">
                <div className="place-content-center">
                    <h2>Login</h2>
                    {invalid?<h2 className="text-red-700">invalid username or password</h2>:null}
                    <form onSubmit={handleLogin}>
                        <div className="m-2 p-2">
                        <label>
                            Username:
                            <input className={invalid?"rounded-xl p-2 border-red-700":"rounded-xl p-2"} type="text" value={username} onChange={e =>setUsername(e.target.value)} />
                        </label>
                        </div>
                        <div className="m-2 p-2">
                        <label>
                            Password:
                            <input className={invalid?"rounded-xl p-2 border-red-700":"rounded-xl p-2"} type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                        </div>
                        <div className="flex justify-between">
                        <button className="bg-blend-color-burn p-2 m-2" onClick={()=>{setPop(!seen);
                                setLogin(!loggedIn);
                                }}> signUP</button>
                        <button type="submit">Login</button>
                        </div>
                    </form>
                    
                </div>
            </div>
        );
    
}
export default Sign;