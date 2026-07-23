import TicketForm from "@/components/tickets/TicketForm";
import Link from "next/link";
import { ArrowLeft, Ticket } from "lucide-react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/currentUser";


export default async function CreateTicketPage() {


  const user = await getCurrentUser();


  // Not logged in
  if (!user) {
    redirect("/login");
  }


  // Only employees can create tickets
  if (user.role !== "EMPLOYEE") {
    redirect("/tickets");
  }



  return (

    <div className="min-h-screen bg-slate-950 p-6">


      <div className="max-w-3xl mx-auto">



        <Link
          href="/tickets"
          className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-slate-400
          hover:text-white
          mb-8
          transition
          "
        >

          <ArrowLeft size={16}/>

          Back to tickets

        </Link>




        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-8
          shadow-2xl
          "
        >



          <div className="flex items-center gap-4 mb-8">


            <div
              className="
              h-12
              w-12
              rounded-xl
              bg-blue-600/20
              flex
              items-center
              justify-center
              "
            >

              <Ticket
                className="text-blue-400"
              />

            </div>




            <div>


              <h1
                className="
                text-3xl
                font-bold
                text-white
                "
              >

                Create Ticket

              </h1>



              <p
                className="
                text-slate-400
                mt-1
                "
              >

                Report an issue and our team will help you.

              </p>



            </div>



          </div>





          <TicketForm />



        </div>



      </div>


    </div>

  );

}