"use client";


import {useTransition} from "react";
import {toast} from "sonner";
import {updateTechnicalTicket} from "@/actions/tickets/updateTechnicalTicket";



export default function TechnicalActions({

ticketId,
status

}:{

ticketId:string;
status:string;

}){


const [pending,startTransition]=useTransition();




function update(
newStatus:"IN_PROGRESS"|"RESOLVED"
){


startTransition(async()=>{


try{


await updateTechnicalTicket(
ticketId,
newStatus
);



toast.success(
"Ticket updated successfully"
);



}catch(error){


toast.error(
"Action failed"
);


}


});


}



return (

<div className="flex gap-3">


{
status === "ASSIGNED" && (

<button

disabled={pending}

onClick={()=>update("IN_PROGRESS")}

className="
rounded-xl
bg-blue-600
px-5
py-3
text-white
"

>

Start Working

</button>

)

}



{
status === "IN_PROGRESS" && (

<button

disabled={pending}

onClick={()=>update("RESOLVED")}

className="
rounded-xl
bg-green-600
px-5
py-3
text-white
"

>

Resolve Ticket

</button>

)

}


</div>

);

}