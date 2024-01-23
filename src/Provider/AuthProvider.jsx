/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext= createContext(null)
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    useEffect(()=>{
      const token=localStorage.getItem('token')
      const localToken = {token}
      axios.post('http://localhost:5000/checkCurrentUser',localToken)
      .then(res=>{
        // console.log(res.data);
        setUser(res.data)
      })
    },[])

    const authInfo = {
        user 
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;