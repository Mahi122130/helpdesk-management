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



export async function createTicketAction(
data:unknown
){


try{


const user =
await getCurrentUser();



if(!user){

return {
success:false,
error:"Unauthorized"
};

}




const validated =
createTicketSchema.safeParse(data);



if(!validated.success){

return {

success:false,

error:"Invalid data"

};

}





const ticket =
await prisma.ticket.create({

data:{


title:
validated.data.title,


description:
validated.data.description,


category:
validated.data.category,


priority:
validated.data.priority,


createdById:user.id,


ticketNumber:
`TKT-${Date.now()}`



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



return{

success:true,

data:ticket

};



}catch(error){


console.error(error);



return{

success:false,

error:"Something went wrong"

};


}


}