import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const loginTokenData = { email, password };
    
    axios.post('https://house-hunter-server-eight-gamma.vercel.app/LoginToken',loginTokenData)
    .then(res=>{
      console.log(res.data);
      if(res.data){
        localStorage.setItem('token',res.data)
        navigate('/dashboard')
      }
    })
    
   
  };
  return (
    <div className="bg-base-300 text-gray-600 h-screen flex justify-center items-center">
      <div className="w-1/4 ">
        <h1 className="text-center pb-4 text-4xl">Dashboard</h1>
        <form onSubmit={handleSubmit} className=" bg-white shadow-xl w-full px-6 space-y-3 py-3  ">
          <img
            className="w-20 mx-auto"
            src="https://i.postimg.cc/W1kk8NZg/logo.png"
            alt=""
          />
          <p className="text-center font-bold py-1">
            Sign in to start your session
          </p>

          <div>
            <label className="">Email</label>
            <input
              className="w-full border px-2 py-1 "
              type="email"
              name="email"
              placeholder=" "
            />
          </div>
          <div>
            <label> Password</label>
            <input
              className="w-full border px-2 py-1 "
              type="password"
              name="password"
              placeholder=" "
            />
          </div>
          <input
            className="w-full py-1   cursor-pointer bg-blue-600 text-white "
            type="submit"
            value="login"
          />
          <div className="py-1 text-center">
          <Link to='/register' className="hover:underline cursor-pointer   ">Need to set up an account?</Link>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
