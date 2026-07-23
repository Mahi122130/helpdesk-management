"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

import { updateTicket } from "@/actions/tickets/updateTicket";


export default function EmployeeActions({

ticketId,
status

}:{
ticketId:string;
status:string;
}){


const [pending,startTransition] = useTransition();



function confirmResolution(){


startTransition(async()=>{


try{


await updateTicket(
ticketId,
{
status:"CLOSED"
}
);


toast.success(
"Resolution confirmed successfully"
);


}catch(error){


toast.error(
"Failed to confirm resolution"
);


}


});


}






if(status !== "RESOLVED"){

return (

<div
className="
rounded-xl
border
border-white/10
bg-white/5
px-4
py-3
text-sm
text-slate-400
"
>

Waiting for technician to resolve this ticket.

</div>

);

}




return (

<button

onClick={confirmResolution}

disabled={pending}

className="
inline-flex
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-green-600
to-emerald-500
px-6
py-3
text-white
font-semibold
shadow-lg
shadow-green-500/20
hover:from-green-500
hover:to-emerald-400
transition
disabled:opacity-50
disabled:cursor-not-allowed
"

>


{

pending

?

<>

<Loader2
size={18}
className="animate-spin"
/>

Confirming...

</>


:

<>

<CheckCircle2
size={18}
/>

Confirm Resolution

</>


}



</button>


);

}