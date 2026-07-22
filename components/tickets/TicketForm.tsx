"use client";


import {
useForm
} from "react-hook-form";


import {
zodResolver
} from "@hookform/resolvers/zod";


import {
createTicketSchema
} from "@/schemas/ticket";


import {
createTicketAction
} from "../../actions/tickets/createTicket";


import {
useRouter
} from "next/navigation";


import {
toast
} from "sonner";




export default function TicketForm(){


const router=useRouter();



const {

register,

handleSubmit,

formState:{
errors,
isSubmitting
}


}=useForm({

resolver:
zodResolver(createTicketSchema)

});





async function submit(data:any){


const result =
await createTicketAction(data);



if(!result.success){

toast.error(result.error);

return;

}



toast.success(
"Ticket created successfully"
);


router.push("/tickets");


}





return (

<form

onSubmit={handleSubmit(submit)}

className="space-y-6"


>


<div>

<label className="text-sm text-slate-300">
Title
</label>


<input

{...register("title")}

placeholder="Example: Laptop cannot connect to WiFi"

className="
mt-2
w-full
rounded-xl
border
border-white/10
bg-slate-900
px-4
py-3
text-white
outline-none
focus:ring-2
focus:ring-blue-500
"

/>


</div>




<div>

<label className="text-sm text-slate-300">
Description
</label>


<textarea

{...register("description")}

rows={5}

placeholder="Describe the problem in detail..."

className="
mt-2
w-full
rounded-xl
border
border-white/10
bg-slate-900
px-4
py-3
text-white
outline-none
focus:ring-2
focus:ring-blue-500
"

/>


</div>





<div className="
grid
md:grid-cols-2
gap-5
">


<div>

<label className="text-sm text-slate-300">
Category
</label>


<select

{...register("category")}

className="
mt-2
w-full
rounded-xl
border
border-white/10
bg-slate-900
px-4
py-3
text-white
"


>

<option value="IT_SUPPORT">
IT Support
</option>

<option value="FACILITIES">
Facilities
</option>

<option value="HR">
HR
</option>

<option value="OTHER">
Other
</option>


</select>


</div>




<div>


<label className="text-sm text-slate-300">
Priority
</label>


<select

{...register("priority")}

className="
mt-2
w-full
rounded-xl
border
border-white/10
bg-slate-900
px-4
py-3
text-white
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


</div>


</div>





<button

disabled={isSubmitting}

className="
w-full
rounded-xl
bg-blue-600
py-3
font-semibold
text-white
transition
hover:bg-blue-500
disabled:opacity-50
"


>

{

isSubmitting

?

"Creating ticket..."

:

"Submit Ticket"

}


</button>



</form>

)

}