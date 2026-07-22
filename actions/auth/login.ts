"use server";


import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function loginAction(
 email:string,
 password:string
){

 const user =
   await prisma.user.findUnique({
     where:{
       email
     }
   });


 if(!user){

   return {
     error:"Invalid email or password"
   };

 }



 const passwordMatch =
   await bcrypt.compare(
     password,
     user.password
   );


 if(!passwordMatch){

   return {
     error:"Invalid email or password"
   };

 }



 const token =
   await createToken({

     id:user.id,
     email:user.email,
     role:user.role

   });



 const cookieStore =
   await cookies();


 cookieStore.set(
   "token",
   token,
   {
     httpOnly:true,
     secure:
       process.env.NODE_ENV==="production",
     sameSite:"lax",
     maxAge:
       60 * 60 * 24 * 7
   }
 );


 redirect("/dashboard");

}