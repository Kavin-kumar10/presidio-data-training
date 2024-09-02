import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { logo } from "../../../Assets";
import { Link } from "react-router-dom";
import Toastify from "../../../utils/Toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () =>{
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/')
        }
    },[])
    const [memberId,setMemberId] = useState();
    const [password,setPassword] = useState();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('https://localhost:7206/api/User/Login',{
                userId:memberId,
                password:password
            })
            console.log(response.data);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('memberId',response.data.memberID);
            navigate('/');
        }
        catch(err){
            console.log(err);
            
        }
    } 
    return(
        <div className="Login h-screen w-screen flex">
            <ToastContainer/>
            <div className="w-full sm:w-1/2 h-full p-5 flex flex-col items-center justify-center">
                <h1 className="text-3xl text-secondary font-bold my-5" >Login</h1>
                <form id="login" action="/" className="w-full gap-2 py-5 rounded-md flex items-center justify-center flex-col">
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div className="flex justify-between">
                                <label className="opacity-50 text-secondary" for="Id">Member Id : </label>
                                <p id="idError" className="invisible text-red-600 text-sm">Error</p>
                            </div>
                            <input value={memberId} onChange={(e)=>setMemberId(e.target.value)} required name="Id" type="number" className="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" id="email"/>
                        </div>
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div className="flex justify-between">
                                <label className="opacity-50" for="password">Password</label>
                                <p id="passError" className="invisible text-red-600 text-sm">Error</p>
                            </div>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} required name="password" className="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" type="password" id="password"/>
                        </div>
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <p className="self-start">Create new account?<Link className="text-blue-700" to='/Register'> Register</Link></p>
                        </div>
                        <div className="flex justify-between w-full md:w-2/3 lg:w-1/2">
                            <button className="px-5 py-2 border-2 border-secondary" type="reset">Reset</button>
                            <button onClick={handleSubmit} className="px-5 py-2 border-2 border-secondary bg-secondary text-tertiary hover:bg-tertiary hover:text-secondary duration-300" type="submit">Submit</button>
                        </div>
                </form>
            </div>
            <div className=" w-1/2 h-full bg-secondary hidden sm:flex items-center justify-center ">
                <div className="flex flex-col items-center justify-center w-full">
                    <img className="w-1/2 h-auto" src={logo} alt="Logo"/>
                    <p className="mt-12 text-2xl text-tertiary font-semibold opacity-50">Todo List</p>
                </div>
            </div>
        </div>
    )
}

export default Login