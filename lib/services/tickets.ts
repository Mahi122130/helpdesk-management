import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";



export async function getDashboardTickets(
userId:string,
role:Role
){


let where={};



if(role===Role.TECHNICAL){

where={
assignedToId:userId
};

}


if(role===Role.EMPLOYEE){

where={
createdById:userId
};

}




return prisma.ticket.findMany({

where,

orderBy:{
createdAt:"desc"
},


take:10,


select:{


id:true,

ticketNumber:true,

title:true,

category:true,

priority:true,

status:true,

createdAt:true,


createdBy:{
select:{
name:true
}
},


assignedTo:{
select:{
name:true
}
}


}



});


}