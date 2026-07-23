import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { redirect } from "next/navigation";
import Link from "next/link";

import TicketFilters from "@/components/tickets/TicketFilters";



export default async function TicketsPage({

searchParams

}:{

searchParams: Promise<{

search?: string;

status?: string;

priority?: string;

category?: string;

assignedTo?: string;

sort?: string;

}>

}){



const params = await searchParams;



const user = await getCurrentUser();



if(!user){

redirect("/login");

}







const where:any = {};





// =====================
// ROLE ACCESS CONTROL
// =====================


// Employee only sees own tickets

if(user.role === "EMPLOYEE"){

where.createdById = user.id;

}



// Technical only sees assigned tickets

if(user.role === "TECHNICAL"){

where.assignedToId = user.id;

}








// =====================
// FILTERS
// =====================



if(params.search){

where.title = {

contains: params.search,

mode:"insensitive"

};

}




if(params.status){

where.status = params.status;

}




if(params.priority){

where.priority = params.priority;

}





if(params.category){

where.category = params.category;

}






// Manager only assigned filter

if(
params.assignedTo &&
user.role === "MANAGER"
){

where.assignedToId = params.assignedTo;

}









// =====================
// SORT
// =====================


let orderBy:any = {

createdAt:"desc"

};



if(params.sort==="priority"){

orderBy = {

priority:"desc"

};

}




if(params.sort==="status"){

orderBy = {

status:"asc"

};

}




if(params.sort==="date"){

orderBy = {

createdAt:"desc"

};

}









// =====================
// GET TICKETS
// =====================


const tickets =
await prisma.ticket.findMany({

where,


include:{


createdBy:true,


assignedTo:true


},


orderBy


});











// =====================
// TECHNICIANS
// MANAGER ONLY
// =====================


const technicians =

user.role === "MANAGER"

?

await prisma.user.findMany({

where:{

role:"TECHNICAL"

},


select:{

id:true,

name:true

}

})

:

[];









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
space-y-6
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

Tickets

</h1>



<p

className="
text-slate-400
mt-2
"

>

Manage and track helpdesk requests

</p>


</div>










<TicketFilters


technicians={technicians}



showAssignedFilter={

user.role === "MANAGER"

}



role={

user.role

}


/>









<div

className="
space-y-4
"

>


{

tickets.length === 0 ? (


<div

className="
rounded-2xl
border
border-white/10
bg-white/5
p-8
text-center
text-slate-400
"

>

No tickets found

</div>


)

:

(


tickets.map(ticket=>(


<Link


key={ticket.id}


href={`/tickets/${ticket.id}`}


className="
block
rounded-2xl
border
border-white/10
bg-white/5
p-5
hover:bg-white/10
transition
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


<h2

className="
text-lg
font-semibold
text-white
"

>

{ticket.title}

</h2>



<p

className="
text-sm
text-slate-400
mt-1
"

>

{ticket.ticketNumber}

</p>






<div

className="
flex
gap-4
mt-3
text-sm
"

>


<span className="text-slate-300">

{ticket.category}

</span>



<span className="text-yellow-300">

{ticket.priority}

</span>


</div>




</div>









<div

className="
text-right
"

>



<p

className="
text-blue-300
font-medium
"

>

{ticket.status}

</p>





<p

className="
text-sm
text-slate-400
mt-2
"

>

Assigned:

{" "}

{

ticket.assignedTo?.name ??

"Not assigned"

}


</p>






</div>







</div>







</Link>


))


)

}





</div>







</div>


</div>


);

}