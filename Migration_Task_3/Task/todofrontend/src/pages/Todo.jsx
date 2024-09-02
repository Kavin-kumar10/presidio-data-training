import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "../Components/Form";
import EditForm from "../Components/EditForm";


const Todo = () =>{
    const navigate = useNavigate();
    const [data,setData] = useState();
    const [pop,setPop] = useState(false);
    const [editPop,setEditPop] = useState({
        pop:false,
        elem:null
    });
    const handleDelete = async(e,elem) =>{
        e.preventDefault()
        try{
            const response = await axios.delete(`https://localhost:7206/api/Todo?TodoId=${elem.todoId}`)
            console.log(response.data);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    }
    const ConvertDate = (date) =>{
        const DateObject = new Date(date);
        let requiredDate = DateObject.getDate()+"-"+DateObject.getMonth()+"-"+DateObject.getFullYear();
        return requiredDate;
        
    }
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/Login')
        }
        const fetchData = async () =>{
            const result = await axios.get(`https://localhost:7206/api/Todo/GetByMemberId?MemberId=${localStorage.getItem('memberId')}`);
            setData(result.data);
            console.log(result.data);
            
        }
        fetchData();
    },[])
    return(
        <div className="Todo h-screen w-screen flex-col bg-secondary flex px-20 py-20 gap-10">

            {
                pop?
                <Form setPop={setPop}/>:<></>
            }

            {
                editPop.pop?
                <EditForm elem={editPop.elem} setEditPop={setEditPop}/>:<></>
            }

            <h1 className="text-3xl text-tertiary font-bold">Todo List</h1>
            <div className="flex flex-col gap-5">
            <div className="flex gap-3">
                <button onClick={()=>setPop(true)} className="px-5 py-2 bg-green-700 hover:bg-green-600 rounded-md w-fit text-tertiary">Add Todo</button>
                <button className="px-5 py-2 bg-red-700 hover:bg-red-600 rounded-md w-fit text-tertiary" onClick={()=>{
                    localStorage.clear();
                    navigate('/Login');
                }}>Logout</button>
            </div>
            <table className=" w-full  border border-tertiary text-tertiary rounded">
                <thead className="w-full flex items-center justify-between">
                    <th className="columns">Title</th>
                    <th className="columns">Target Date</th>
                    <th className="columns">Todo Status</th>
                    <th className="columns">Actions</th>
                </thead>
                {
                    data?.map((elem)=>
                        <tr className="w-full flex items-center justify-between text-center">
                            <td className="columns">{elem.title}</td>
                            <td className="columns">{ConvertDate(elem.tentativeEndDate)}</td>
                            <td className="columns">{elem.status === 0?"PENDING":"COMPLETE"}</td>
                            <td className="columns gap-5 flex w-full items-center justify-center">
                                <button onClick={()=>setEditPop({...editPop,elem:elem,pop:true})} className="text-blue-400">Edit</button>
                                <button onClick={(e)=>handleDelete(e,elem)} className="text-red-500">Delete</button>
                            </td>
                        </tr>
                    )
                }
            </table>
            </div>
        </div>
    )
}

export default Todo