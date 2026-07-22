import {
LayoutDashboard,
Ticket,
Users,
Settings
} from "lucide-react";


export default function Sidebar(){

return (

<aside
className="
hidden
md:flex
w-64
min-h-screen
bg-slate-900
border-r
border-white/10
p-6
flex-col
"
>


<h1
className="
text-xl
font-bold
mb-10
"
>

HelpDesk

</h1>



<nav
className="
space-y-3
"
>


{
[
{
name:"Dashboard",
icon:LayoutDashboard
},
{
name:"Tickets",
icon:Ticket
},
{
name:"Users",
icon:Users
},
{
name:"Settings",
icon:Settings
}

].map(item=>{


const Icon=item.icon;


return (

<div

key={item.name}

className="
flex
items-center
gap-3
rounded-xl
p-3
text-slate-300
hover:bg-white/10
cursor-pointer
"

>

<Icon size={20}/>

{item.name}


</div>

)


})

}


</nav>


</aside>

)

}