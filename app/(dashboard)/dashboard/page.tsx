import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { redirect } from "next/navigation";


import ManagerDashboard from "../../../components/dashboard/ManagerDashboard";
import TechnicalDashboard from "../../../components/dashboard/TechnicalDashboard";
import EmployeeDashboard from "../../../components/dashboard/EmployeeDashboard";



export default async function DashboardPage(){


const user = await getCurrentUser();



if(!user){

redirect("/login");

}





if(user.role==="MANAGER"){

return (

<ManagerDashboard/>

)

}




if(user.role==="TECHNICAL"){

return (

<TechnicalDashboard/>

)

}




return (

<EmployeeDashboard/>

)


}