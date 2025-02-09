import { createContext } from "react";

const UserContext = createContext({
    seen:false,
    loggedIn:false,
    UserName:null,
});

export default UserContext