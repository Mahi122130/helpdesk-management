import { getCurrentUser } from "@/lib/auth/currentUser";
import { prisma } from "@/lib/prisma";
import {
Ticket,
Clock,
CheckCircle
} from "lucide-react";


export default async function TechnicalDashboard(){


const user = await getCurrentUser();



if(!user){

return null;

}





const assigned =
await prisma.ticket.count({

where:{
assignedToId:user.id
}

});



const inProgress =
await prisma.ticket.count({

where:{

assignedToId:user.id,

status:"IN_PROGRESS"

}

});




const resolved =
await prisma.ticket.count({

where:{

assignedToId:user.id,

status:"RESOLVED"

}

});







const tickets =
await prisma.ticket.findMany({

where:{

assignedToId:user.id

},

orderBy:{
createdAt:"desc"
},

take:5

});





return (

<div
className="
min-h-screen
bg-slate-950
p-6
"
>


<div
className="
max-w-7xl
mx-auto
space-y-8
"
>



<div>

<h1
className="
text-3xl
font-bold
text-white
"
>

Technical Dashboard

</h1>


<p className="text-slate-400 mt-2">

Your assigned tickets and workload

</p>


</div>






<div
className="
grid
md:grid-cols-3
gap-5
"
>



<Card

title="Assigned Tickets"

value={assigned}

icon={<Ticket/>}

/>



<Card

title="In Progress"

value={inProgress}

icon={<Clock/>}

/>




<Card

title="Resolved"

value={resolved}

icon={<CheckCircle/>}

/>



</div>









<div
className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
"
>



<h2
className="
text-xl
font-bold
text-white
mb-5
"
>

Recent Tickets

</h2>





<div className="space-y-4">


{

tickets.map(ticket=>(


<div

key={ticket.id}

className="
rounded-xl
bg-white/5
p-4
flex
justify-between
"

>


<div>

<p className="text-white font-semibold">

{ticket.title}

</p>


<p className="text-slate-400 text-sm">

{ticket.ticketNumber}

</p>


</div>



<span className="text-blue-300">

{ticket.status}

</span>


</div>


))

}



</div>



</div>





</div>


</div>


)

}






function Card({

title,

value,

icon

}:{

title:string;

value:number;

icon:React.ReactNode;

}){


return (

<div
className="
rounded-2xl
border
border-white/10
bg-white/5
p-5
"
>

<div className="flex justify-between text-slate-300">

{title}

<span className="text-blue-400">

{icon}

</span>

</div>


<p className="text-3xl font-bold text-white mt-4">

{value}

</p>


</div>

)

}