"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  BarChart3,
  Users,
  LogOut,
  Menu,
  X
} from "lucide-react";

import { useState } from "react";

import { logoutAction } from "@/actions/auth/logout";


export default function Sidebar({
  role
}:{
  role:string;
}) {


const [open,setOpen] = useState(false);



const linkClass = `
group
flex
items-center
gap-3
rounded-xl
px-4
py-3
text-slate-300
transition
duration-300
hover:bg-white/10
hover:text-white
hover:translate-x-1
`;


return (

<>

{/* Mobile Button */}

<button

onClick={()=>setOpen(true)}

className="
md:hidden
fixed
top-5
left-5
z-50
rounded-xl
bg-slate-900
border
border-white/20
p-3
text-white
"

>

<Menu size={24}/>

</button>





{/* Overlay */}

{

open && (

<div

onClick={()=>setOpen(false)}

className="
fixed
inset-0
bg-black/60
z-40
md:hidden
"

/>

)

}






<aside


className={`

fixed
left-0
top-0
h-screen
w-72
bg-slate-900
border-r
border-white/10
p-6
flex
flex-col
z-50

transform
transition-transform
duration-300

${

open

?
"translate-x-0"

:

"-translate-x-full md:translate-x-0"

}

`}


>


{/* Close mobile */}

<button

onClick={()=>setOpen(false)}

className="
absolute
right-5
top-5
text-slate-300
md:hidden
"

>

<X size={24}/>

</button>





<div>


<div className="
mb-10
mt-2
">


<h1

className="
text-2xl
font-bold
text-white
"

>

Helpdesk

</h1>


<p className="
text-xs
text-slate-400
">

Support System

</p>


</div>






<nav className="
space-y-3
">



<Link

href="/dashboard"

onClick={()=>setOpen(false)}

className={linkClass}

>

<LayoutDashboard size={20}/>

Dashboard

</Link>






<Link

href="/tickets"

onClick={()=>setOpen(false)}

className={linkClass}

>

<Ticket size={20}/>

Tickets

</Link>






{

role==="EMPLOYEE" && (

<Link

href="/tickets/create"

onClick={()=>setOpen(false)}

className={linkClass}

>

<PlusCircle size={20}/>

Create Ticket

</Link>

)

}








{

role==="MANAGER" && (

<>


<Link

href="/reports"

onClick={()=>setOpen(false)}

className={linkClass}

>

<BarChart3 size={20}/>

Reports

</Link>





<Link

href="/users"

onClick={()=>setOpen(false)}

className={linkClass}

>

<Users size={20}/>

Users

</Link>



</>

)

}



</nav>


</div>







<form

action={logoutAction}

className="
mt-auto
"

>


<button

className="
w-full
flex
items-center
justify-center
gap-3
rounded-xl
bg-red-500/10
border
border-red-500/20
px-4
py-3
text-red-400
hover:bg-red-500/20
transition
"

>


<LogOut size={18}/>

Logout


</button>


</form>




</aside>


</>

);


}