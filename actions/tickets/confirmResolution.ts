"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { revalidatePath } from "next/cache";


export async function confirmResolution(
  ticketId:string
){


const user = await getCurrentUser();


if(!user){
 throw new Error("Unauthorized");
}



if(user.role !== "EMPLOYEE"){
 throw new Error(
  "Only employees can confirm resolution"
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




if(ticket.createdById !== user.id){

throw new Error(
"You can only confirm your own tickets"
);

}




if(ticket.status !== "RESOLVED"){

throw new Error(
"Ticket is not ready for confirmation"
);

}




await prisma.ticket.update({

where:{
 id:ticketId
},

data:{
 status:"CLOSED"
}

});





await prisma.ticketHistory.create({

data:{

ticketId,

actorId:user.id,

action:
"Employee confirmed resolution and closed ticket"

}

});





revalidatePath(
`/tickets/${ticketId}`
);


}