import axios from "axios";
import React, { useState } from "react";

const EditForm = ({setEditPop,elem}) =>{
    const [title,setTitle] = useState(elem.title)
    const [tentativeDate,setTentativeDate] = useState(elem.tentativeDate);
    const [status,setStatus] = useState(elem.status);
    let memberId = localStorage.getItem('memberId');
    const handleUpdate = async (e) =>{
        e.preventDefault();
        elem.title = title;
        elem.tentativeDate = tentativeDate;
        elem.status = status;
        try{
            const response = await axios.put('https://localhost:7206/api/Todo',elem)
            console.log(response.data);
            setEditPop(false);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }

    }
    return(
        <div className="Form h-screen w-screen bg-[rgba(225,225,225,0.5)] fixed top-0 left-0 flex items-center justify-center">
            <form className="p-5 text-tertiary w-1/2 bg-secondary rounded-md gap-5 flex flex-col justify-between">
                <h1 className="text-2xl font-bold">Update post</h1>
                <div className="text-secondary flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="Title" className="text-xl text-tertiary font-bold">Title :</label>
                        <input className="px-3 py-2 " placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} type="text" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="DateTime" className="text-xl text-tertiary font-bold">Target date :</label>
                        <input className="px-3 py-2 " id="DateTime" value={tentativeDate} onChange={(e)=>setTentativeDate(e.target.value)} placeholder="Target Date" type="datetime-local" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="DateTime" className="text-xl text-tertiary font-bold">Status :</label>
                        <select className="px-3 py-2" value={status}  onChange={(e)=>setStatus(parseInt(e.target.value))} name="status" id="status">
                            <option value="0">PENDING</option>
                            <option value="1">COMPLETE</option>
                        </select>
                    </div>
                </div>
                <div className="flex gap-5">
                    <button className="px-3 py-1 rounded-md border border-tertiary" onClick={()=>setEditPop(false)} >Cancel</button>
                    <button onClick={handleUpdate} className="px-3 py-1 rounded-md border border-tertiary" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditForm