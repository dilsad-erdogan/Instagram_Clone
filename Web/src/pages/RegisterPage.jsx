import Image from "/auth.png";
import Logo from "/insta_logo.png";
import PlayStore from "/playstore.png";
import Microsoft from "/microsoft.png";
import { useNavigate } from "react-router-dom";
import { register } from "../firebase";
import { useState } from "react";
import { Toaster } from 'react-hot-toast';

const RegisterPage = () => {
    const navigate = useNavigate();
    
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(name, email, password);
        navigate('/login');
    }

    return (
      <div className="flex justify-center items-center h-screen">
        <Toaster position="top-right" />

        {/* Main Container */}
        <div className="flex flex-row justify-center items-center w-full max-w-[1200px]">
          {/* Img Section */}
          <div className="hidden lg:block w-1/2">
              <img src={Image} alt="Image" className="object-cover w-full h-full" />
          </div>
  
          {/* Forms Section */}
          <div className="flex-1 flex-col m-5 flex justify-center items-center">
              {/* Login Form */}
              <div className="flex flex-col justify-center items-center p-5 border border-gray-500 rounded-lg mb-5 max-w-[450px] w-full">
                  {/* Logo */}
                  <img src={Logo} alt="Logo" className="m-5" />
                  
                  {/* Form */}
                  <form className="flex flex-col gap-5 w-full mb-5" onSubmit={handleSubmit}>
                      <input type="text" className="bg-black border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                      <input type="email" className="bg-black border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      <input type="password" className="bg-black border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      <button disabled={!email || !password} type="submit" className="text-white bg-blue-400 hover:bg-blue-800 disabled:bg-blue-200 font-medium rounded-lg w-full text-sm px-5 py-2.5 me-2 mb-2">Register</button>
                  </form>
              </div>
  
              {/* Change Form */}
              <div className="flex gap-4 justify-center items-center p-5 border border-gray-500 rounded-lg mb-5 max-w-[450px] w-full">
                  <p>Do you have an account?</p>
                  <span className="text-blue-400" onClick={() => navigate('/login')}>Login</span>
              </div>
  
              {/* Text */}
              <div className="flex justify-center mb-5">
                  <p>Get the app.</p>    
              </div>
  
              {/* Google or Microsoft */}
              <div className="flex justify-center items-center gap-5">
                  <img src={PlayStore} alt="PlayStore" className="max-w-40" />
                  <img src={Microsoft} alt="Microsoft" className="max-w-40" />
              </div>
          </div>
        </div>
      </div>
    )
}

export default RegisterPage