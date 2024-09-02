"use client"
import create from "@/action/create";
// import { usePop } from "@/Context/PostContext";

export default function AddPost(){
    // const {pop,togglePop} = usePop();
    return(
        <div className="h-screen text-slate-200 flex items-center justify-center w-screen fixed top-0 left-0 bg-[rgba(225,225,225,0.5)]">
            <form action={create} className=" gap-5 flex flex-col rounded-md p-6 bg-slate-800 ">
                <h1 className="text-3xl">Add Post</h1>
                <div className="flex flex-col gap-1">
                    <label className="text-lg" htmlFor="Title">Title</label>
                    <input type="text" id="Title" name="title" className="px-3 py-2 w-fit bg-transparent outline-none border rounded"/>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-lg" htmlFor="Content">Content</label>
                    <input type="text" name="content"  className="px-3 py-2 w-fit bg-transparent outline-none border rounded"/>
                </div>
                <div className="flex justify-between items-center">
                    {/* <button onClick={()=>togglePop()} className="px-5 py-2 hover:bg-slate-600 bg-slate-700 rounded-md">Close</button>
                    <button onClick={()=>togglePop()} className="px-5 py-2 hover:bg-slate-600 bg-slate-700 rounded-md" type="submit">Submit</button> */}
                </div>
            </form>
        </div>
    )
}