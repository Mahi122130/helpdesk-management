import { z } from "zod";


export const registerSchema = z.object({

  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),



  email: z
    .string()
    .trim()
    .email("Invalid email address"),



  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),



  confirmPassword: z
    .string(),



  role: z.enum([
    "EMPLOYEE",
    "TECHNICAL"
  ]),



  phone: z
    .string()
    .optional(),



  department: z
    .string()
    .optional(),


})
.refine(

(data)=>data.password === data.confirmPassword,

{
  message:"Passwords do not match",
  path:["confirmPassword"]
}

)
.refine(

(data)=>{

if(data.role==="TECHNICAL"){

return Boolean(
data.phone &&
data.department
);

}

return true;

},

{
message:
"Technical employees need phone and department",
path:["phone"]
}

)
.refine(

(data)=>{

if(
data.role==="TECHNICAL" &&
data.phone
){

return /^09\d{8}$/.test(data.phone);

}

return true;

},

{
message:
"Phone number must start with 09 and contain 10 digits",
path:["phone"]
}

);



export type RegisterInput =
z.infer<typeof registerSchema>;