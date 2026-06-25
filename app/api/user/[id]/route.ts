import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const {email} = await request.json();
    if(!email) return new Response(JSON.stringify({message: "No email provided"}), {status: 400});
    try{
        const user = await prisma.users.findUnique({
            where: {
                email,
            },
        });
        return Response.json(user);
    }catch(error:any){
        return new Response(JSON.stringify({message: error.message}), {status: 500});
    }
}
export async function POST(request: NextRequest) {
    const {id, name, email} = await request.json();
    if(!id || !name || !email) return new Response(JSON.stringify({message: "Missing required fields"}), {status: 400});
    try{
        const user = await prisma.users.create({
            data: {
                id:id,
                name,
                email,
            },
        });
        return Response.json(user);
    }catch(error:any){
        return new Response(JSON.stringify({message: error.message}), {status: 500});
    }
}