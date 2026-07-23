import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { redirect } from "next/navigation";


export default async function UsersPage(){

const user = await getCurrentUser();


if(!user){
 redirect("/login");
}


if(user.role !== "MANAGER"){
 redirect("/dashboard");
}



const users = await prisma.user.findMany({

orderBy:{
 createdAt:"desc"
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

Users Management

</h1>



<div
className="
rounded-3xl
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
text-slate-400
"
>

<tr>

<th className="p-4">
Name
</th>

<th className="p-4">
Email
</th>

<th className="p-4">
Role
</th>

</tr>

</thead>


<tbody>


{
users.map(user=>(

<tr
key={user.id}
className="
border-t
border-white/10
text-white
"
>


<td className="p-4">
{user.name}
</td>


<td className="p-4">
{user.email}
</td>


<td className="p-4">
{user.role}
</td>


</tr>


))
}


</tbody>


</table>


</div>


</div>


</div>

);

}