"use server";


import { prisma } from "@/lib/prisma";

import {
    createTicketSchema
} from "@/schemas/ticket";

import {
    revalidatePath
} from "next/cache";

import {
    getCurrentUser
} from "@/lib/auth/currentUser";

import {
    generateTicketNumber
} from "@/lib/tickets/generateTicketNumber";



export async function createTicketAction(
    data: unknown
){


try{


const user = await getCurrentUser();



if(!user){

return {
success:false,
error:"Unauthorized"
};

}




// Only employees can create tickets

if(user.role !== "EMPLOYEE"){

return {

success:false,

error:"Only employees can create tickets"

};

}





const validated =
createTicketSchema.safeParse(data);



if(!validated.success){

return {

success:false,

error:"Invalid ticket data"

};

}





const ticketNumber =
await generateTicketNumber();






const ticket =
await prisma.ticket.create({

data:{


ticketNumber,


title:
validated.data.title,


description:
validated.data.description,


category:
validated.data.category,


priority:
validated.data.priority,


createdById:user.id,


// status automatically OPEN from Prisma default


}

});






await prisma.ticketHistory.create({

data:{


ticketId:ticket.id,


actorId:user.id,


action:"Ticket created",


newValue:"OPEN"


}

});







revalidatePath("/tickets");

revalidatePath("/dashboard");



return {


success:true,


data:ticket


};





}catch(error){


console.error(
"Create ticket error:",
error
);



return {


success:false,


error:"Something went wrong while creating ticket"


};



}


}