import { getCurrentUser } from "@/lib/auth/currentUser";
import { prisma } from "@/lib/prisma";
import {
  Ticket,
  Clock,
  CheckCircle,
  Plus
} from "lucide-react";

import Link from "next/link";


export default async function EmployeeDashboard(){


const user = await getCurrentUser();


if(!user){
  return null;
}




const myTickets =
await prisma.ticket.count({

where:{
createdById:user.id
}

});





const waiting =
await prisma.ticket.count({

where:{
createdById:user.id,
status:"RESOLVED"
}

});





const closed =
await prisma.ticket.count({

where:{
createdById:user.id,
status:"CLOSED"
}

});






const tickets =
await prisma.ticket.findMany({

where:{
createdById:user.id
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





<div
className="
flex
justify-between
items-center
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
Employee Dashboard
</h1>


<p
className="
text-slate-400
mt-2
"
>
Manage your reported issues
</p>


</div>





<Link

href="/tickets/create"

className="
flex
items-center
gap-2
rounded-xl
bg-blue-600
px-5
py-3
text-white
font-semibold
hover:bg-blue-500
transition
"

>

<Plus size={18}/>

Create Ticket

</Link>




</div>









<div
className="
grid
md:grid-cols-3
gap-5
"
>


<Card

title="My Tickets"

value={myTickets}

icon={<Ticket/>}

/>





<Card

title="Awaiting Confirmation"

value={waiting}

icon={<Clock/>}

/>





<Card

title="Closed"

value={closed}

icon={<CheckCircle/>}

/>




</div>









<div

className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
"

>


<div
className="
flex
justify-between
items-center
mb-6
"
>


<h2
className="
text-xl
font-bold
text-white
"
>
My Recent Tickets
</h2>


<Link

href="/tickets"

className="
text-sm
text-blue-400
hover:text-blue-300
"

>
View All
</Link>


</div>







<div
className="
space-y-4
"
>



{

tickets.length===0 ? (


<p className="text-slate-400">

No tickets created yet.

</p>


)

:

tickets.map(ticket=>(


<div

key={ticket.id}

className="
rounded-2xl
border
border-white/10
bg-slate-900/50
p-5
hover:border-white/20
transition
space-y-4
"

>






<div
className="
flex
justify-between
items-start
"
>



<div>


<h3
className="
text-lg
font-semibold
text-white
"
>

{ticket.title}

</h3>


<p
className="
text-sm
text-slate-400
mt-1
"
>

{ticket.ticketNumber}

</p>


</div>








<StatusBadge

status={ticket.status}

/>



</div>









<div
className="
flex
gap-3
pt-2
"
>


<Link

href={`/tickets/${ticket.id}`}

className="
flex-1
rounded-xl
border
border-white/10
bg-white/5
py-2.5
text-center
text-sm
font-medium
text-slate-300
hover:bg-white/10
hover:text-white
transition
"

>

View Ticket

</Link>








{

ticket.status==="RESOLVED" && (


<Link

href={`/tickets/${ticket.id}`}

className="
flex-1
rounded-xl
bg-green-600
py-2.5
text-center
text-sm
font-semibold
text-white
hover:bg-green-500
transition
"

>

Confirm Resolution

</Link>


)

}



</div>






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


<div
className="
flex
justify-between
items-center
text-slate-400
"
>

<span>
{title}
</span>


<span className="text-blue-400">
{icon}
</span>


</div>




<p
className="
text-3xl
font-bold
text-white
mt-4
"
>

{value}

</p>



</div>


)

}









function StatusBadge({

status

}:{

status:string;

}){


const styles = {

OPEN:
"bg-blue-500/20 text-blue-300",

ASSIGNED:
"bg-purple-500/20 text-purple-300",

IN_PROGRESS:
"bg-yellow-500/20 text-yellow-300",

RESOLVED:
"bg-green-500/20 text-green-300",

CLOSED:
"bg-slate-500/20 text-slate-300"

};



return (

<span

className={`
px-3
py-1
rounded-full
text-xs
font-semibold
${styles[status as keyof typeof styles]}
`}

>

{status.replace("_"," ")}

</span>

)

}