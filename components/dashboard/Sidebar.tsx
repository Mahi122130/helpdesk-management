"use client";


import Link from "next/link";
import {usePathname} from "next/navigation";

import {
LayoutDashboard,
Ticket,
PlusCircle,
Users,
ChartBar,
Settings
} from "lucide-react";


type Role =
"MANAGER" |
"TECHNICAL" |
"EMPLOYEE";


const menu = {


MANAGER:[
{
name:"Dashboard",
href:"/dashboard",
icon:LayoutDashboard
},

{
name:"All Tickets",
href:"/tickets",
icon:Ticket
},

{
name:"Users",
href:"/users",
icon:Users
},

{
name:"Reports",
href:"/reports",
icon:ChartBar
}

],



TECHNICAL:[
{
name:"Dashboard",
href:"/dashboard",
icon:LayoutDashboard
},

{
name:"Assigned Tickets",
href:"/tickets",
icon:Ticket
}

],



EMPLOYEE:[
{
name:"Dashboard",
href:"/dashboard",
icon:LayoutDashboard
},

{
name:"My Tickets",
href:"/tickets",
icon:Ticket
},

{
name:"Create Ticket",
href:"/tickets/create",
icon:PlusCircle
}

]

};



export default function Sidebar({

role

}:{
role:Role
}){


const pathname = usePathname();


return (

<aside
className="
fixed
left-0
top-0
h-screen
w-72
bg-slate-950
border-r
border-white/10
p-6
"
>


<h1
className="
text-2xl
font-bold
text-white
mb-10
"
>

HelpDesk Pro

</h1>



<nav className="space-y-2">


{
menu[role].map((item)=>{


const Icon=item.icon;


const active =
pathname.startsWith(item.href);



return (

<Link

key={item.href}

href={item.href}

className={`
flex
items-center
gap-3
px-4
py-3
rounded-xl

${
active

?
"bg-blue-600 text-white"

:

"text-slate-400 hover:bg-white/10"

}

`}

>


<Icon size={20}/>

{item.name}


</Link>

)


})

}


</nav>



</aside>

)

}