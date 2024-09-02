import axios from "axios";
import React, { useState } from "react";

const Form = ({setPop}) =>{
    const [title,setTitle] = useState()
    const [tentativeDate,setTentativeDate] = useState();
    let memberId = localStorage.getItem('memberId');
    const handleAddTodo = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('https://localhost:7206/api/Todo',{
                title:title,
                tentativeDate:tentativeDate,
                memberId:memberId
            })
            console.log(response.data);
            setPop(false);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }

    }
    return(
        <div className="Form h-screen w-screen bg-[rgba(225,225,225,0.5)] fixed top-0 left-0 flex items-center justify-center">
            <form className="p-5 text-tertiary w-1/2 bg-secondary rounded-md gap-5 flex flex-col justify-between">
                <h1 className="text-2xl font-bold">Add new post</h1>
                <div className="text-secondary flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="Title" className="text-xl text-tertiary font-bold">Title :</label>
                        <input className="px-3 py-2 " placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} type="text" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="DateTime" className="text-xl text-tertiary font-bold">Target date :</label>
                        <input className="px-3 py-2 " id="DateTime" value={tentativeDate} onChange={(e)=>setTentativeDate(e.target.value)} placeholder="Target Date" type="datetime-local" />
                    </div>
                </div>
                <div className="flex gap-5">
                    <button className="px-3 py-1 rounded-md border border-tertiary" onClick={()=>setPop(false)} >Cancel</button>
                    <button onClick={handleAddTodo} className="px-3 py-1 rounded-md border border-tertiary" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form