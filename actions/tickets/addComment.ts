"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { revalidatePath } from "next/cache";


export async function addComment(
 ticketId:string,
 content:string
){


const user = await getCurrentUser();


if(!user){

throw new Error(
"Unauthorized"
);

}



if(!content.trim()){

throw new Error(
"Comment cannot be empty"
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





await prisma.comment.create({

data:{

content,

ticketId,

authorId:user.id

}

});





await prisma.ticketHistory.create({

data:{

ticketId,

actorId:user.id,

action:
"Added a comment"

}

});





revalidatePath(
`/tickets/${ticketId}`
);


}