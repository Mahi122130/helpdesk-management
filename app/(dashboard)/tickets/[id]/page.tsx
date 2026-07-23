import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  User,
  Tag,
  AlertCircle
} from "lucide-react";


import AssignTechnician from "@/components/tickets/AssignTechnician";
import ManagerActions from "@/components/tickets/ManagerActions";
import TechnicalActions from "@/components/tickets/TechnicalActions";
import EmployeeActions from "@/components/tickets/EmployeeActions";
import CommentForm from "@/components/tickets/CommentForm";



export default async function TicketDetailPage({

params

}:{

params: Promise<{
id:string
}>

}){


const {id}=await params;



const user = await getCurrentUser();


if(!user){

redirect("/login");

}



const ticket = await prisma.ticket.findUnique({

where:{
id
},

include:{


createdBy:true,


assignedTo:true,


comments:{
include:{
author:true
},

orderBy:{
createdAt:"desc"
}

},


history:{
include:{
actor:true
},

orderBy:{
createdAt:"desc"
}

}


}

});



if(!ticket){

notFound();

}




const technicians = await prisma.user.findMany({

where:{
role:"TECHNICAL"
},

select:{

id:true,

name:true,

email:true

}

});





return (

<div className="
min-h-screen
bg-slate-950
p-6
">


<div className="
max-w-6xl
mx-auto
space-y-6
">



<Link

href="/tickets"

className="
inline-flex
items-center
gap-2
text-slate-400
hover:text-white
"

>

<ArrowLeft size={18}/>

Back to tickets

</Link>





{/* Ticket Information */}

<div className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-8
">



<div className="
flex
justify-between
items-start
">

<div>

<h1 className="
text-3xl
font-bold
text-white
">

{ticket.title}

</h1>


<p className="
text-slate-400
mt-2
">

{ticket.ticketNumber}

</p>


</div>



<span className="
rounded-full
bg-blue-500/20
px-4
py-2
text-blue-300
">

{ticket.status}

</span>


</div>






<div className="
grid
md:grid-cols-2
gap-6
mt-8
">



<Info

icon={<User size={16}/>}

label="Created By"

value={ticket.createdBy.name}

/>



<Info

icon={<User size={16}/>}

label="Assigned To"

value={
ticket.assignedTo?.name ?? "Not Assigned"
}

/>



<Info

icon={<AlertCircle size={16}/>}

label="Priority"

value={ticket.priority}

/>



<Info

icon={<Tag size={16}/>}

label="Category"

value={ticket.category}

/>



</div>






{/* Manager Controls */}

{

user.role==="MANAGER" && (

<div className="
mt-8
border-t
border-white/10
pt-6
space-y-6
">


<div>


<h3 className="
text-white
font-semibold
mb-3
">

Assign Technician

</h3>



<AssignTechnician

ticketId={ticket.id}

technicians={technicians}

/>


</div>





<div>


<h3 className="
text-white
font-semibold
mb-3
">

Ticket Controls

</h3>



<ManagerActions

ticketId={ticket.id}

currentStatus={ticket.status}

currentPriority={ticket.priority}

/>



</div>



</div>

)

}







{/* Technical Actions */}

{

user.role==="TECHNICAL" && (

<div className="
mt-8
border-t
border-white/10
pt-6
">


<h3 className="
text-white
font-semibold
mb-3
">

Technician Actions

</h3>



<TechnicalActions

ticketId={ticket.id}

status={ticket.status}

/>


</div>

)

}







{/* Employee Resolution */}

{

user.role==="EMPLOYEE" && (

<div className="
mt-8
border-t
border-white/10
pt-6
">


<h3 className="
text-white
font-semibold
mb-3
">

Resolution

</h3>



<EmployeeActions

ticketId={ticket.id}

status={ticket.status}

/>



</div>

)

}






{/* Description */}

<div className="mt-8">


<h2 className="
text-white
font-semibold
mb-3
">

Description

</h2>


<p className="
text-slate-300
leading-relaxed
">

{ticket.description}

</p>


</div>



</div>








{/* Timeline */}


<div className="
rounded-3xl
border
border-white/10
bg-white/5
p-8
">


<h2 className="
text-xl
font-bold
text-white
mb-6
">

Activity Timeline

</h2>




{

ticket.history.length===0

?

<p className="text-slate-400">

No activity yet

</p>


:


<div className="space-y-5">


{

ticket.history.map(item=>(


<div

key={item.id}

className="
border-l-2
border-blue-500
pl-5
">


<p className="text-white">

{item.action}


{
item.oldValue &&
item.newValue &&
(

<span>

{" "}
from {item.oldValue} → {item.newValue}

</span>

)

}


</p>



<p className="
text-sm
text-slate-400
">

{item.actor.name}

</p>



<p className="
text-xs
text-slate-500
">

{new Date(item.createdAt).toLocaleString()}

</p>


</div>


))

}


</div>


}



</div>







{/* Comments */}


<div className="
rounded-3xl
border
border-white/10
bg-white/5
p-8
">


<h2 className="
text-xl
font-bold
text-white
mb-6
">

Comments / Updates

</h2>




{

ticket.comments.length===0

?

<p className="text-slate-400">

No comments yet

</p>


:


<div className="space-y-4">


{

ticket.comments.map(comment=>(


<div

key={comment.id}

className="
rounded-xl
bg-white/5
p-4
">


<p className="text-white">

{comment.content}

</p>



<p className="
text-sm
text-slate-400
mt-2
">

{comment.author.name}

</p>



</div>


))


}


</div>


}




{/* Only technical employees comment */}

{

user.role==="TECHNICAL" && (

<div className="mt-6">


<CommentForm

ticketId={ticket.id}

/>


</div>

)

}



</div>





</div>


</div>


);

}






function Info({

icon,

label,

value

}:{

icon:React.ReactNode;

label:string;

value:string;

}){


return (

<div className="
flex
items-center
gap-3
">


<div className="text-blue-400">

{icon}

</div>



<div>


<p className="
text-sm
text-slate-400
">

{label}

</p>



<p className="
text-white
">

{value}

</p>



</div>


</div>


)

}