"use server";


import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/schemas/auth";

import bcrypt from "bcryptjs";



export async function registerUser(
    data:any
){


    const validated =
    registerSchema.safeParse(data);



    if(!validated.success){

        return {
            error:
            "Invalid registration data"
        };

    }



    const {
        name,
        email,
        password,
        role,
        phone,
        department
    }
    =
    validated.data;



    const existingUser =
    await prisma.user.findUnique({

        where:{
            email
        }

    });



    if(existingUser){

        return {
            error:
            "Email already exists"
        };

    }



    const hashedPassword =
    await bcrypt.hash(
        password,
        10
    );



    await prisma.user.create({

        data:{

            name,

            email,

            password:
            hashedPassword,


            role,


            phone:
            role==="TECHNICAL"
            ? phone
            : null,


            department:
            role==="TECHNICAL"
            ? department
            : null

        }

    });



    return {

        success:true

    };


}