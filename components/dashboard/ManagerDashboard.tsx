import { prisma } from "@/lib/prisma";
import {
  Ticket,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";


export default async function ManagerDashboard(){



const totalTickets =
await prisma.ticket.count();




const openTickets =
await prisma.ticket.count({

where:{
status:"OPEN"
}

});




const resolvedTickets =
await prisma.ticket.count({

where:{
status:"RESOLVED"
}

});





const closedTickets =
await prisma.ticket.count({

where:{
status:"CLOSED"
}

});






const critical =
await prisma.ticket.count({

where:{
priority:"CRITICAL"
}

});



const high =
await prisma.ticket.count({

where:{
priority:"HIGH"
}

});



const medium =
await prisma.ticket.count({

where:{
priority:"MEDIUM"
}

});



const low =
await prisma.ticket.count({

where:{
priority:"LOW"
}

});







const statusData = [

{
name:"Open",
value:openTickets
},

{
name:"Resolved",
value:resolvedTickets
},

{
name:"Closed",
value:closedTickets
}

];









const technicians =
await prisma.user.findMany({

where:{
role:"TECHNICAL"
},


include:{

assignedTickets:true

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

Manager Dashboard

</h1>


<p
className="
text-slate-400
mt-2
"
>

Monitor tickets, priorities and team workload.

</p>


</div>









{/* Stats */}



<div
className="
grid
md:grid-cols-4
gap-5
"
>


<Card

title="Total Tickets"

value={totalTickets}

icon={<Ticket/>}

/>



<Card

title="Open"

value={openTickets}

icon={<Clock/>}

/>




<Card

title="Resolved"

value={resolvedTickets}

icon={<CheckCircle/>}

/>




<Card

title="Critical"

value={critical}

icon={<AlertTriangle/>}

/>




</div>









{/* Priority */}



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

Tickets By Priority

</h2>



<div
className="
grid
md:grid-cols-4
gap-4
"
>



<Stat

label="Critical"

value={critical}

/>



<Stat

label="High"

value={high}

/>



<Stat

label="Medium"

value={medium}

/>



<Stat

label="Low"

value={low}

/>



</div>



</div>









{/* Status */}


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

Tickets By Status

</h2>



<div
className="
grid
md:grid-cols-3
gap-4
"
>


{

statusData.map(item=>(


<Stat

key={item.name}

label={item.name}

value={item.value}

/>


))


}


</div>



</div>









{/* Team Workload */}



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

Team Workload

</h2>






<div
className="
space-y-4
"
>



{

technicians.map(tech=>(


<div

key={tech.id}

className="
rounded-xl
bg-white/5
p-4
flex
justify-between
items-center
"

>



<div>


<p
className="
text-white
font-semibold
"
>

{tech.name}

</p>



<p
className="
text-sm
text-slate-400
"
>

{tech.email}

</p>


</div>





<div
className="
text-white
"
>


{tech.assignedTickets.length}

Tickets


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
text-slate-300
"
>

{title}

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







function Stat({

label,

value

}:{

label:string;

value:number;

}){


return (

<div
className="
rounded-xl
bg-white/5
p-4
"
>


<p
className="
text-slate-400
text-sm
"
>

{label}

</p>


<p
className="
text-2xl
text-white
font-bold
mt-2
"
>

{value}

</p>


</div>

)

}