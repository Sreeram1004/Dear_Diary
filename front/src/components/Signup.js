import { useContext, useState } from "react"
import axios from 'axios';
import UserContext from "../Constants/UserContext"
const Signup=()=>{
        const {seen,setPop,loggedIn,setLogin,UserName,setUname}=useContext(UserContext)
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [email, setEmail] = useState('')
        const [phone, setPhone] = useState('')
        const handleLogin=(e) =>{
            e.preventDefault()
            setLogin(!loggedIn)
            axios.post("http://localhost:5000/api/user/Signup",{username,email,password,phone})
            .then(result=> {
                console.log(result);
                setUname(username);
                
            })
            .catch(err => console.log(err));
        }
    
        return (
            <div className=" fixed p-4 m-4 overflow-auto top-48 left-2/4 bg-gradient-to-tl from-red-100 to-rose-500 rounded-xl">
                <div className="popup-inner">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin} >
                    <div className="p-2 m-2">
                        <label>
                            Username:
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        </label>
                        </div>
                        <div className="p-2 m-2">
                        <label>
                            Email:
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                        </label>
                        </div>
                        <div className="p-2 m-2">
                        <label>
                            Password:
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                        </div>
                        <div className="p-2 m-2">
                        <label>
                            Phone:
                            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                        </label>
                        </div>
                        <div className="p-2 m-2">
                        <button type="submit">Login</button>
                        </div>
                    </form>
                    <button onClick={()=>{setLogin(false)}}>Close</button>
                </div>
            </div>
        );
    
}
export default Signup;