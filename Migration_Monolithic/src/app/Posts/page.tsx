import prisma from "@/lib/Db"
import Link from "next/link"
import AddPost from "@/Components/AddPost"
// import { usePop } from "@/Context/PostContext";
import PopButton from "./PopButton";

export default async function Post() {

    // const {pop,togglePop} = usePop();

    const posts = await prisma.post.findMany(
        {
            where:{
                title:{
                    startsWith:""
                }
            },
        }
    )

    return(
        <div className="flex flex-col gap-10 px-24 py-24 h-screen w-screen text-slate-200 bg-slate-800">
            {/* {
                pop?
                <AddPost/>:<></>
            } */}
            <h1 className="text-5xl font-bold">All Posts ({posts.length})</h1>
            {/* <PopButton/> */}
            <div className="grid grid-cols-3 gap-5">
                {
                    posts.map((elem : any)=>
                    <Link href={`/Posts/${elem.slug}`} key={elem.id} className="size-full rounded-md p-5 border border-slate-600">
                        <h1>{elem.title}</h1>                        
                    </Link>
                    )
                }
            </div>
        </div>
    )
}
