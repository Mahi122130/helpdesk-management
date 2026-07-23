import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { redirect } from "next/navigation";


export default async function ReportsPage(){


const user = await getCurrentUser();


if(!user){
 redirect("/login");
}


if(user.role !== "MANAGER"){
 redirect("/dashboard");
}




const total =
await prisma.ticket.count();



const open =
await prisma.ticket.count({

where:{
status:"OPEN"
}

});



const assigned =
await prisma.ticket.count({

where:{
status:"ASSIGNED"
}

});



const resolved =
await prisma.ticket.count({

where:{
status:"RESOLVED"
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


<div
className="
max-w-6xl
mx-auto
"
>


<h1
className="
text-3xl
font-bold
text-white
mb-8
"
>

Reports

</h1>



<div
className="
grid
md:grid-cols-4
gap-5
"
>


<Card
title="Total Tickets"
value={total}
/>


<Card
title="Open"
value={open}
/>


<Card
title="Assigned"
value={assigned}
/>


<Card
title="Resolved"
value={resolved}
/>


</div>


</div>


</div>

);

}



function Card({
title,
value
}:{
title:string;
value:number;
}){


return (

<div
className="
rounded-3xl
border
border-white/10
bg-white/5
p-6
"
>


<p
className="
text-slate-400
"
>
{title}
</p>


<p
className="
text-4xl
font-bold
text-white
mt-3
"
>

{value}

</p>


</div>

);

}