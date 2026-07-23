"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { assignTicket } from "@/actions/tickets/assignTicket";


export default function AssignTechnician({

ticketId,

technicians

}:{

ticketId:string;

technicians:{
 id:string;
 name:string;
 email:string;
}[]

}){


const [pending,startTransition]=useTransition();



function handleAssign(
technicianId:string
){


startTransition(async()=>{


try{


await assignTicket(
ticketId,
technicianId
);



toast.success(
"Technician assigned successfully"
);



}catch(error){


toast.error(
"Failed to assign technician"
);


}


});


}



return (

<select

disabled={pending}

onChange={(e)=>{

handleAssign(
e.target.value
)

}}

className="
rounded-xl
bg-slate-900
border
border-white/20
text-white
px-4
py-3
"

>


<option value="">
Select technician
</option>



{

technicians.map(tech=>(


<option

key={tech.id}

value={tech.id}

>

{tech.name}

</option>


))

}


</select>

)

}