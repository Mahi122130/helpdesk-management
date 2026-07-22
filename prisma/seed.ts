import { PrismaClient, Role, Priority, Category, TicketStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();


async function main() {

  await prisma.ticketHistory.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();


  const password = await bcrypt.hash(
    "password123",
    10
  );


  const managers = await Promise.all([
    prisma.user.create({
      data:{
        name:"Manager One",
        email:"manager1@company.com",
        password,
        role:Role.MANAGER
      }
    }),

    prisma.user.create({
      data:{
        name:"Manager Two",
        email:"manager2@company.com",
        password,
        role:Role.MANAGER
      }
    })
  ]);



  const technicians = await Promise.all([
    prisma.user.create({
      data:{
        name:"Tech One",
        email:"tech1@company.com",
        password,
        role:Role.TECHNICAL
      }
    }),

    prisma.user.create({
      data:{
        name:"Tech Two",
        email:"tech2@company.com",
        password,
        role:Role.TECHNICAL
      }
    }),

    prisma.user.create({
      data:{
        name:"Tech Three",
        email:"tech3@company.com",
        password,
        role:Role.TECHNICAL
      }
    })
  ]);



  const employees = await Promise.all([
    prisma.user.create({
      data:{
        name:"Employee One",
        email:"emp1@company.com",
        password,
        role:Role.EMPLOYEE
      }
    }),

    prisma.user.create({
      data:{
        name:"Employee Two",
        email:"emp2@company.com",
        password,
        role:Role.EMPLOYEE
      }
    }),

    prisma.user.create({
      data:{
        name:"Employee Three",
        email:"emp3@company.com",
        password,
        role:Role.EMPLOYEE
      }
    })
  ]);



  const tickets = [
    {
      title:"Laptop not starting",
      description:"Employee laptop does not boot after update.",
      category:Category.IT_SUPPORT,
      priority:Priority.HIGH,
      status:TicketStatus.OPEN
    },

    {
      title:"Office printer issue",
      description:"Printer is showing connection error.",
      category:Category.IT_SUPPORT,
      priority:Priority.MEDIUM,
      status:TicketStatus.ASSIGNED
    },

    {
      title:"Air conditioner broken",
      description:"AC not working in meeting room.",
      category:Category.FACILITIES,
      priority:Priority.HIGH,
      status:TicketStatus.IN_PROGRESS
    },

    {
      title:"HR document request",
      description:"Need employee contract copy.",
      category:Category.HR,
      priority:Priority.LOW,
      status:TicketStatus.RESOLVED
    }
  ];


  for(let i=0;i<15;i++){

    const ticket = await prisma.ticket.create({

      data:{
        ticketNumber:`TKT-${String(i+1).padStart(4,"0")}`,

        title:
          tickets[i % tickets.length].title,

        description:
          tickets[i % tickets.length].description,

        category:
          tickets[i % tickets.length].category,

        priority:
          tickets[i % tickets.length].priority,

        status:
          tickets[i % tickets.length].status,


        createdById:
          employees[i % employees.length].id,


        assignedToId:
          i % 2 === 0
          ? technicians[i % technicians.length].id
          : null
      }

    });


    await prisma.ticketHistory.create({
      data:{
        ticketId:ticket.id,
        actorId:employees[i % employees.length].id,
        action:"Ticket created",
        newValue:"OPEN"
      }
    });

  }


  console.log("Database seeded successfully 🚀");

}


main()
.then(()=>{
  prisma.$disconnect();
})
.catch(async(e)=>{
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});