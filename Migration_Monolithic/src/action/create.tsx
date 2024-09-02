"use server"

import prisma from "@/lib/Db";

export default async function create(formdata:FormData){

    await prisma.post.create({
        data:{
            title:formdata.get("title") as string,
            content:formdata.get("content") as string,
            slug:formdata.get("title")?.toString().trim().replace(/\s+/g, '_') as string
        }
    })
}