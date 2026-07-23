"use client";


import { logoutAction } from "@/actions/auth/logout";
import { LogOut } from "lucide-react";


export default function LogoutButton(){


return (

<form action={logoutAction}>


<button

type="submit"

className="
flex
items-center
gap-2
rounded-xl
border
border-white/10
bg-white/5
px-4
py-2
text-sm
text-white
hover:bg-red-500/20
hover:border-red-500/30
transition
"

>


<LogOut size={16}/>


Logout


</button>


</form>

);

}