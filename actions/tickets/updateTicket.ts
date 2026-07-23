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





const oldTicket = await prisma.ticket.findUnique({

where:{
id:ticketId
}

});



if(!oldTicket){

throw new Error("Ticket not found");

}






// ===============================
// PERMISSION CHECKS
// ===============================



// MANAGER
// Can update everything

if(user.role === "MANAGER"){


// allowed


}




// TECHNICAL EMPLOYEE
// Can only update assigned tickets

else if(user.role === "TECHNICAL"){



if(oldTicket.assignedToId !== user.id){

throw new Error(
"Only assigned technician can update this ticket"
);

}



if(
data.status !== "IN_PROGRESS" &&
data.status !== "RESOLVED"
){

throw new Error(
"Technicians can only change ticket progress"
);

}



}




// EMPLOYEE
// Can only confirm resolution

else if(user.role === "EMPLOYEE"){



if(
oldTicket.createdById !== user.id
){

throw new Error(
"You can only update your own tickets"
);

}



if(
data.status !== "CLOSED" ||
oldTicket.status !== "RESOLVED"
){

throw new Error(
"Only resolved tickets can be confirmed"
);

}


}



else{

throw new Error("Invalid role");

}









// ===============================
// UPDATE TICKET
// ===============================


await prisma.ticket.update({

where:{
id:ticketId
},

data

});








// ===============================
// HISTORY
// ===============================



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


revalidatePath(
"/dashboard"
);


}