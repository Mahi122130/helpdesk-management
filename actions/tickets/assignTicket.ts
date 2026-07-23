"use server";


import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { revalidatePath } from "next/cache";


export async function assignTicket(
 ticketId:string,
 technicianId:string
){


const user = await getCurrentUser();



if(!user){

throw new Error(
"Unauthorized"
);

}



if(user.role !== "MANAGER"){

throw new Error(
"Only managers can assign tickets"
);

}




const technician = await prisma.user.findUnique({

where:{
 id:technicianId
}

});



if(!technician){

throw new Error(
"Technician not found"
);

}




await prisma.ticket.update({

where:{
 id:ticketId
},

data:{

assignedToId:technicianId,

status:"ASSIGNED"

}

});





await prisma.ticketHistory.create({

data:{


ticketId,


actorId:user.id,


action:
`Ticket assigned to ${technician.name}`


}

});




revalidatePath(
`/tickets/${ticketId}`
);


}