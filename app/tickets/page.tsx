import {
prisma
} from "@/lib/prisma";


import {
getCurrentUser
} from "@/lib/auth/currentUser";


import {
Role
} from "@prisma/client";


import Link from "next/link";


import {
Plus,
Ticket,
Clock,
AlertTriangle
} from "lucide-react";




export default async function TicketsPage(){



const user =
await getCurrentUser();



if(!user)
return null;




const tickets =
await prisma.ticket.findMany({

where:

user.role === Role.EMPLOYEE

?

{
createdById:user.id
}

:

user.role === Role.TECHNICAL

?

{
assignedToId:user.id
}

:

{},

orderBy:{
createdAt:"desc"
}

});




return (

<div
className="
min-h-screen
bg-slate-950
p-6
"
>


<div className="max-w-6xl mx-auto">


<div className="
flex
items-center
justify-between
mb-8
">


<div>

<h1
className="
text-3xl
font-bold
text-white
"
>

Tickets

</h1>


<p
className="
text-slate-400
"
>

Manage and track your support requests

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
hover:bg-blue-500
"

>

<Plus size={18}/>

New Ticket

</Link>


</div>





{
tickets.length === 0

?

(

<div
className="
rounded-2xl
border
border-white/10
bg-white/5
p-12
text-center
"
>

<Ticket
className="
mx-auto
mb-4
text-slate-400
"
/>


<h2
className="
text-xl
text-white
font-semibold
"
>

No tickets found

</h2>


<p
className="
text-slate-400
mt-2
"
>

Create your first support ticket

</p>


</div>

)



:


(

<div
className="
grid
gap-5
"
>


{

tickets.map(ticket=>(


<div

key={ticket.id}

className="
rounded-2xl
border
border-white/10
bg-white/5
p-6
hover:border-blue-500/50
transition
"


>


<div className="
flex
justify-between
items-start
">


<div>


<h2
className="
text-white
font-semibold
text-lg
"
>

{ticket.title}

</h2>


<p
className="
text-slate-400
text-sm
mt-1
"
>

{ticket.ticketNumber}

</p>


</div>




<div
className="
flex
gap-2
"
>

<span
className="
rounded-full
bg-blue-500/20
px-3
py-1
text-xs
text-blue-300
"
>

{ticket.status}

</span>



<span
className="
rounded-full
bg-red-500/20
px-3
py-1
text-xs
text-red-300
"
>

{ticket.priority}

</span>


</div>


</div>





<div className="
mt-5
flex
gap-5
text-sm
text-slate-400
">


<span className="flex gap-1 items-center">

<Ticket size={15}/>

{ticket.category}

</span>



<span className="flex gap-1 items-center">

<Clock size={15}/>

{
ticket.createdAt.toLocaleDateString()
}

</span>


</div>



</div>


))


}


</div>


)


}


</div>


</div>

)


}