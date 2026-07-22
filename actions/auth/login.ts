"use server";


import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createToken } from "@/lib/auth/jwt";

import { cookies } from "next/headers";



export async function loginAction(
 email:string,
 password:string
){


try{


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



const valid =
await verifyPassword(
 password,
 user.password
);



if(!valid){

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
60*60*24*7,

path:"/"
}
);



return {
success:true
};



}catch(error){

console.error(error);

return {
error:"Something went wrong"
};

}


}