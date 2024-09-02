import prisma from "@/lib/Db"

export default async function PostDetail({params}:{params:{
    Slug:string
}}){
    const post = await prisma.post.findUnique({
        where:{
            slug:params.Slug
        }
    })
    return(
        <div className="flex flex-col gap-10 px-24 py-24 h-screen w-screen text-slate-200 bg-slate-800">
            <h1 className="text-8xl">{post?.title}</h1>
            <p className="text-5xl">{post?.content}</p>
        </div>
    )
}