"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { Role, TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";


const updateStatusSchema = z.object({

ticketId:z.string(),

status:z.nativeEnum(TicketStatus)

});



export async function updateTicketStatus(
input:{
ticketId:string;
status:TicketStatus;
}

){


try{


const user = await getCurrentUser();


if(!user){

return {
success:false,
error:"Unauthorized"
};

}



const validated =
updateStatusSchema.safeParse(input);



if(!validated.success){

return {
success:false,
error:"Invalid data"
};

}




const ticket =
await prisma.ticket.findUnique({

where:{
id:input.ticketId
}

});



if(!ticket){

return {
success:false,
error:"Ticket not found"
};

}




// Permission checking


let allowed=false;



// Manager can do anything

if(user.role === Role.MANAGER){

allowed=true;

}



// Technical workflow

if(
user.role===Role.TECHNICAL
&&
ticket.assignedToId===user.id
){

if(

ticket.status===TicketStatus.ASSIGNED
&&
input.status===TicketStatus.IN_PROGRESS

){

allowed=true;

}


if(

ticket.status===TicketStatus.IN_PROGRESS
&&
input.status===TicketStatus.RESOLVED

){

allowed=true;

}

}




// Employee closing ticket

if(

user.role===Role.EMPLOYEE
&&
ticket.createdById===user.id

){

if(

ticket.status===TicketStatus.RESOLVED
&&
input.status===TicketStatus.CLOSED

){

allowed=true;

}

}



if(!allowed){

return {
success:false,
error:"You cannot perform this action"
};

}





await prisma.$transaction([


prisma.ticket.update({

where:{
id:ticket.id
},

data:{
status:input.status
}

}),



prisma.ticketHistory.create({

data:{

ticketId:ticket.id,

actorId:user.id,

action:
`Changed status from ${ticket.status} to ${input.status}`,

oldValue:
ticket.status,

newValue:
input.status

}

})



]);





revalidatePath(`/tickets/${ticket.id}`);

revalidatePath("/tickets");



return {

success:true

};



}

catch(error){

console.error(error);


return {

success:false,

error:"Something went wrong"

};


}


}
const assignSchema=z.object({

ticketId:z.string(),

employeeId:z.string()

});



export async function assignTicket(
input:{
ticketId:string;
employeeId:string;
}

){


try{


const user=await getCurrentUser();



if(!user || user.role!==Role.MANAGER){

return {
success:false,
error:"Only managers can assign tickets"
};

}



const ticket =
await prisma.ticket.findUnique({

where:{
id:input.ticketId
}

});


if(!ticket){

return {
success:false,
error:"Ticket not found"
};

}



await prisma.$transaction([


prisma.ticket.update({

where:{
id:input.ticketId
},

data:{

assignedToId:input.employeeId,

status:TicketStatus.ASSIGNED

}

}),



prisma.ticketHistory.create({

data:{


ticketId:ticket.id,

actorId:user.id,

action:"Ticket assigned",

oldValue:
ticket.status,

newValue:
"ASSIGNED"


}


})


]);




revalidatePath(`/tickets/${input.ticketId}`);


return {
success:true
};


}

catch(error){

console.error(error);

return {

success:false,

error:"Assignment failed"

};


}


}
const commentSchema=z.object({

ticketId:z.string(),

content:z.string()
.min(2)
.max(500)

});



export async function addComment(
input:{
ticketId:string;
content:string;
}

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



const data =
commentSchema.parse(input);



await prisma.comment.create({

data:{

ticketId:data.ticketId,

authorId:user.id,

content:data.content

}

});




revalidatePath(
`/tickets/${input.ticketId}`
);



return {
success:true
};



}

catch(error){

console.error(error);

return {

success:false,

error:"Could not add comment"

};

}


}