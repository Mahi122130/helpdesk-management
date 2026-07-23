import {
getCurrentUser
} from "@/lib/auth/currentUser";


import {
getDashboardStats
} from "@/lib/services/dashboard";


import DashboardCards
from "@/components/dashboard/DashboardCards";




export default async function DashboardPage(){



const user =
await getCurrentUser();



if(!user){

return null;

}




const stats =
await getDashboardStats(

user.id,

user.role

);





return (

<div

className="
space-y-8
"

>


<div>

<h1

className="
text-3xl
font-bold
"

>

Dashboard

</h1>


<p

className="
text-slate-400
"

>

Welcome back {user.name}

</p>


</div>




<DashboardCards

stats={stats}

/>



</div>


);

}