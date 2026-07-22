import { getCurrentUser } from "@/lib/auth/currentUser";


export default async function Header(){


const user =
await getCurrentUser();


return (

<header
className="
h-20
border-b
border-white/10
flex
items-center
justify-between
px-6
"
>


<div>

<h2
className="
text-xl
font-semibold
"
>
Dashboard
</h2>


</div>



<div
className="
text-right
"
>

<p
className="
font-medium
"
>
{user?.name}
</p>


<p
className="
text-sm
text-slate-400
"
>
{user?.role}
</p>


</div>



</header>


)

}