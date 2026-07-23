import Link from "next/link";
import { Plus, Ticket as TicketIcon } from "lucide-react";

import { getCurrentUser } from "@/lib/auth/currentUser";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";


export default async function TicketsPage() {


  const user = await getCurrentUser();


  if (!user) {
    redirect("/login");
  }



  let tickets;



  if (user.role === "EMPLOYEE") {


    tickets = await prisma.ticket.findMany({

      where:{
        createdById:user.id
      },

      include:{
        createdBy:true,
        assignedTo:true
      },

      orderBy:{
        createdAt:"desc"
      }

    });


  } else if (user.role === "TECHNICAL") {


    tickets = await prisma.ticket.findMany({

      where:{
        assignedToId:user.id
      },

      include:{
        createdBy:true,
        assignedTo:true
      },

      orderBy:{
        createdAt:"desc"
      }

    });



  } else {


    // Manager sees all tickets

    tickets = await prisma.ticket.findMany({

      include:{
        createdBy:true,
        assignedTo:true
      },

      orderBy:{
        createdAt:"desc"
      }

    });


  }



  return (

    <div
      className="
      min-h-screen
      bg-slate-950
      p-6
      "
    >



      <div className="max-w-7xl mx-auto">



        {/* Header */}

        <div
          className="
          flex
          items-center
          justify-between
          mb-8
          "
        >


          <div>


            <h1
              className="
              text-3xl
              font-bold
              text-white
              "
            >

              {
                user.role === "MANAGER"
                ?
                "All Tickets"
                :
                user.role === "TECHNICAL"
                ?
                "Assigned Tickets"
                :
                "My Tickets"
              }

            </h1>



            <p
              className="
              text-slate-400
              mt-2
              "
            >

              Manage and track support requests

            </p>


          </div>




          {
            user.role === "EMPLOYEE" && (

              <Link
                href="/tickets/create"
                className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-white
                font-medium
                hover:bg-blue-700
                transition
                "
              >

                <Plus size={18}/>

                New Ticket

              </Link>

            )
          }



        </div>





        {/* Tickets */}

        {
          tickets.length === 0 ? (

            <div
              className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-10
              text-center
              "
            >

              <TicketIcon
                className="
                mx-auto
                text-slate-400
                mb-4
                "
                size={40}
              />


              <h2
                className="
                text-xl
                font-semibold
                text-white
                "
              >

                No tickets found

              </h2>


              <p
                className="
                text-slate-400
                mt-2
                "
              >

                There are no tickets available yet.

              </p>


            </div>


          ) : (


            <div
              className="
              grid
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
              "
            >


              {
                tickets.map((ticket)=>(


                  <Link
                    key={ticket.id}
                    href={`/tickets/${ticket.id}`}
                    className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-6
                    hover:border-blue-500/50
                    transition
                    "
                  >



                    <div
                      className="
                      flex
                      justify-between
                      items-start
                      "
                    >


                      <h3
                        className="
                        text-lg
                        font-semibold
                        text-white
                        "
                      >

                        {ticket.title}

                      </h3>


                      <span
                        className="
                        text-xs
                        rounded-full
                        bg-blue-500/20
                        px-3
                        py-1
                        text-blue-300
                        "
                      >

                        {ticket.status}

                      </span>


                    </div>




                    <p
                      className="
                      text-slate-400
                      text-sm
                      mt-3
                      line-clamp-3
                      "
                    >

                      {ticket.description}

                    </p>




                    <div
                      className="
                      mt-5
                      space-y-2
                      text-sm
                      "
                    >


                      <p className="text-slate-300">

                        Priority:
                        <span className="ml-2 text-white">

                          {ticket.priority}

                        </span>

                      </p>



                      <p className="text-slate-300">

                        Category:
                        <span className="ml-2 text-white">

                          {ticket.category}

                        </span>

                      </p>



                      <p className="text-slate-300">

                        Created by:
                        <span className="ml-2 text-white">

                          {ticket.createdBy.name}

                        </span>

                      </p>



                      <p className="text-slate-300">

                        Assigned:
                        <span className="ml-2 text-white">

                          {
                            ticket.assignedTo?.name ??
                            "Not assigned"
                          }

                        </span>

                      </p>



                    </div>




                  </Link>


                ))
              }


            </div>


          )
        }



      </div>


    </div>

  );

}