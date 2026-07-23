import Sidebar from "../../components/dashboard/Sidebar";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const user = await getCurrentUser();


  if (!user) {
    redirect("/login");
  }



  return (

    <div className="min-h-screen bg-slate-950">

      <Sidebar role={user.role}/>


      <main className="ml-72">

        {children}

      </main>


    </div>

  );

}