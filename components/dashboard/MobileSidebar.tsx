"use client";


import {
useState
} from "react";


import {
Menu,
X
} from "lucide-react";


import Sidebar from "./Sidebar";



export default function MobileSidebar({

role

}:{
role:string
}){


const [open,setOpen]=useState(false);



return (

<>


{/* Hamburger */}

<button

onClick={()=>setOpen(true)}

className="

md:hidden
fixed
top-4
left-4
z-[100]
rounded-xl
bg-slate-900
border
border-white/20
p-3
text-white
shadow-xl

"

>

<Menu size={24}/>

</button>







{

open && (

<div

className="

fixed
inset-0
z-[90]
md:hidden

"

>


{/* Overlay */}

<div

onClick={()=>setOpen(false)}

className="

absolute
inset-0
bg-black/60

"

/>






{/* Sidebar container */}

<div

className="

relative
h-full
w-72
animate-in
slide-in-from-left

"

>


<button

onClick={()=>setOpen(false)}

className="

absolute
right-4
top-4
z-[110]
text-white

"

>

<X size={24}/>

</button>





<Sidebar

role={role}

/>




</div>


</div>


)

}




</>

)

}