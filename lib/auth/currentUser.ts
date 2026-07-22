import { cookies } from "next/headers";
import { verifyToken } from "./jwt";
import { prisma } from "@/lib/prisma";


export async function getCurrentUser(){

    const cookieStore = await cookies();

    const token =
        cookieStore.get("token")?.value;


    if(!token){
        return null;
    }


    try{

        const payload =
            await verifyToken(token);


        const user =
            await prisma.user.findUnique({

                where:{
                    id:
                    payload.id as string
                }

            });


        return user;


    }catch(error){

        return null;

    }

}