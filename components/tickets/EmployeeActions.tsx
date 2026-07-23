"use client";


import {useTransition} from "react";
import {toast} from "sonner";

import {confirmResolution} from "@/actions/tickets/confirmResolution";


export default function EmployeeActions({

ticketId,
status

}:{

ticketId:string;
status:string;

}){


const [pending,startTransition]=useTransition();



function confirm(){


startTransition(async()=>{


try{


await confirmResolution(ticketId);



toast.success(
"Resolution confirmed"
);



}catch(error){


toast.error(
"Failed to confirm"
);


}


});


}



if(status !== "RESOLVED"){

return null;

}




return (

<button

disabled={pending}

onClick={confirm}

className="
rounded-xl
bg-green-600
px-5
py-3
text-white
"

>

{
pending
?
"Confirming..."
:
"Confirm Resolution"
}

</button>


);

}