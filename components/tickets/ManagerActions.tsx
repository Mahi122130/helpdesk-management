"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { updateTicket } from "@/actions/tickets/updateTicket";


export default function ManagerActions({

ticketId,
currentStatus,
currentPriority

}:{
ticketId:string;
currentStatus:string;
currentPriority:string;
}){


const [pending,startTransition]=useTransition();



function update(data:any){


startTransition(async()=>{


try{


await updateTicket(
ticketId,
data
);


toast.success(
"Ticket updated successfully"
);



}catch(error){


toast.error(
"Update failed"
);


}



});


}



return (

<div className="space-y-4">


<select

disabled={pending}

defaultValue={currentPriority}

onChange={(e)=>{


if(e.target.value !== currentPriority){

update({
priority:e.target.value
});

}


}}

className="
bg-slate-900
text-white
border
border-white/20
rounded-xl
p-3
w-full
"

>


<option value="LOW">
Low
</option>

<option value="MEDIUM">
Medium
</option>

<option value="HIGH">
High
</option>

<option value="CRITICAL">
Critical
</option>


</select>





<select

disabled={pending}

defaultValue={currentStatus}

onChange={(e)=>{


if(e.target.value !== currentStatus){


update({
status:e.target.value
});


}


}}

className="
bg-slate-900
text-white
border
border-white/20
rounded-xl
p-3
w-full
"

>


<option value="OPEN">
Open
</option>


<option value="ASSIGNED">
Assigned
</option>


<option value="IN_PROGRESS">
In Progress
</option>


<option value="RESOLVED">
Resolved
</option>


<option value="CLOSED">
Closed
</option>


</select>


</div>

);

}