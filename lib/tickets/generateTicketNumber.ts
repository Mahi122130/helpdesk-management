import { prisma } from "@/lib/prisma";


export async function generateTicketNumber(){

const count = await prisma.ticket.count();


const number = count + 1;


return `TKT-${String(number).padStart(3,"0")}`;

}