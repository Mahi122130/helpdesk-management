import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";


export default function DashboardLayout(
{
children
}:{
children:React.ReactNode
}

){

return (

<div
className="
min-h-screen
bg-slate-950
text-white
flex
"
>


<Sidebar/>


<div
className="
flex-1
"
>

<Header/>


<main
className="
p-6
"
>

{children}

</main>


</div>


</div>

)

}