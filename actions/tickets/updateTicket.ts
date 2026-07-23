"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { revalidatePath } from "next/cache";


export async function updateTicket(

ticketId:string,

data:{
 priority?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
 status?: "OPEN" | "ASSIGNED" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
}

){


const user = await getCurrentUser();


if(!user){
 throw new Error("Unauthorized");
}



if(user.role !== "MANAGER"){
 throw new Error("Only managers can update tickets");
}




const oldTicket =
await prisma.ticket.findUnique({

where:{
id:ticketId
}

});



if(!oldTicket){
 throw new Error("Ticket not found");
}



await prisma.ticket.update({

where:{
id:ticketId
},

data

});





if(data.priority){

await prisma.ticketHistory.create({

data:{

ticketId,

actorId:user.id,

action:
`Priority changed from ${oldTicket.priority} to ${data.priority}`

}

});

}



if(data.status){

await prisma.ticketHistory.create({

data:{

ticketId,

actorId:user.id,

action:
`Status changed from ${oldTicket.status} to ${data.status}`

}

});

}




revalidatePath(
`/tickets/${ticketId}`
);


}