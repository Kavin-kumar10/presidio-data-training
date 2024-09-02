import React,{useEffect, useState} from "react";
import { ToastContainer } from "react-toastify";
import Toastify from "../../../utils/Toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { logo } from "../../../Assets";

const Register = () =>{
    // {
    //     "name": "string",
    //     "password": "string",
    //     "email": "user@example.com"
    //   }
    const navigate = useNavigate();
    const [name,setName] = useState();
    const [password,setPassword] = useState();
    const [email,setEmail] = useState();
    const handleRegister = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('https://localhost:7206/api/User/Register',{
                name:name,
                password:password,
                email:email
            })
            console.log(response.data);
            navigate('/Login');
        }
        catch(err){
            console.log(err);
            
        }
    } 
    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/')
        }
    },[])
  
    return(
        <div className="Register h-screen w-screen flex">
            <ToastContainer />
            <div className=" w-1/2 h-full bg-secondary hidden sm:flex items-center justify-center ">
                <div className="flex flex-col items-center justify-center w-full">
                    <img className="w-1/2 h-auto" src={logo} alt="Logo"/>
                    <p className="mt-12 text-2xl text-tertiary font-semibold opacity-50">Todo List</p>
                </div>
            </div>
            <div className="w-full sm:w-1/2 h-full p-5 flex flex-col items-center justify-center">
                <h1 className="text-3xl text-secondary font-bold my-5">Register</h1>
                <form id="register" className="w-full gap-2 py-5 rounded-md flex items-center justify-center flex-col">
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div className="flex justify-between">
                                <label className="opacity-50 text-secondary" for="Name">Username</label>
                                <p className="invisible">Error</p>
                            </div>
                            <input value={name} onChange={e=>setName(e.target.value)} name="Name" className="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" type="text" id="Name"/>
                        </div>
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div className="flex justify-between">
                                <label className="opacity-50" for="email">Email</label>
                                <p className="invisible">Error</p>
                            </div>
                            <input value={email} onChange={e=>setEmail(e.target.value)} name="email" className="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" type="email" id="email"/>
                        </div>
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <div className="flex justify-between">
                                <label className="opacity-50" for="password">Password</label>
                                <p className="invisible">Error</p>
                            </div>
                            <input value={password} onChange={e=>setPassword(e.target.value)} name="password" className="px-4 py-2 my-1 outline-none rounded-sm shadow-sm shadow-gray-700" type="password" id="password"/>
                        </div>
                        <div className="flex flex-col mb-3 w-full md:w-2/3 lg:w-1/2">
                            <p className="self-start">Already Have an account? <Link className="text-blue-700" to='/Login'>Login</Link></p>
                        </div>
                        <div className="flex justify-between w-full md:w-2/3 lg:w-1/2">
                            <button className="px-5 py-2 border-2 border-secondary"  type="reset">Reset</button>
                            <button onClick={handleRegister} className="px-5 py-2 border-2 border-secondary bg-secondary text-tertiary hover:bg-tertiary hover:text-secondary duration-300" type="submit">Submit</button>
                        </div>
                </form>
            </div>
        </div>
    )
}

export default Register