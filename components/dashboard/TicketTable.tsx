import Badge from "./Badge";


type Ticket = {

id:string;

ticketNumber:string;

title:string;

status:string;

priority:string;

category:string;

createdAt:Date;

};



export default function TicketTable({

tickets

}:{
tickets:Ticket[]
}){


return (

<div
className="
rounded-2xl
border
border-white/10
bg-white/5
overflow-hidden
"
>


<table
className="
w-full
text-left
"
>


<thead
className="
bg-white/5
"
>

<tr>

<th className="p-4">
ID
</th>

<th className="p-4">
Title
</th>

<th className="p-4">
Category
</th>

<th className="p-4">
Priority
</th>

<th className="p-4">
Status
</th>


</tr>


</thead>



<tbody>


{
tickets.map(ticket=>(


<tr
key={ticket.id}
className="
border-t
border-white/10
hover:bg-white/5
"
>


<td
className="
p-4
font-medium
"
>

{ticket.ticketNumber}

</td>



<td
className="
p-4
"
>

{ticket.title}

</td>



<td
className="
p-4
text-slate-300
"
>

{ticket.category}

</td>




<td
className="
p-4
"
>

<Badge
value={ticket.priority}
/>

</td>




<td
className="
p-4
"
>

<Badge
value={ticket.status}
/>

</td>


</tr>


))

}



</tbody>


</table>



</div>


)

}