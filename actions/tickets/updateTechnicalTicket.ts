"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { revalidatePath } from "next/cache";


export async function updateTechnicalTicket(
  ticketId:string,
  status:
  "IN_PROGRESS" |
  "RESOLVED"
){


const user = await getCurrentUser();


if(!user){
 throw new Error("Unauthorized");
}



if(user.role !== "TECHNICAL"){
 throw new Error(
  "Only technical employees can update tickets"
 );
}



const ticket =
await prisma.ticket.findUnique({

where:{
 id:ticketId
}

});



if(!ticket){
 throw new Error(
  "Ticket not found"
 );
}




if(ticket.assignedToId !== user.id){

throw new Error(
"You are not assigned to this ticket"
);

}





await prisma.ticket.update({

where:{
 id:ticketId
},

data:{
 status
}

});





await prisma.ticketHistory.create({

data:{

ticketId,

actorId:user.id,

action:
`Status changed to ${status}`

}

});




revalidatePath(
`/tickets/${ticketId}`
);


}