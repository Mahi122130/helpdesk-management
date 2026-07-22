import {
    prisma
} from "@/lib/prisma";


import {
    Role,
    TicketStatus,
    Priority
} from "@prisma/client";


import {
    DashboardStats
} from "@/types/dashboard";



export async function getDashboardStats(

    userId:string,

    role:Role

):Promise<DashboardStats>{



const filter =
role === Role.MANAGER

?

{}

:

role === Role.TECHNICAL

?

{
    assignedToId:userId
}

:

{
    createdById:userId
};





const [

totalTickets,

openTickets,

assignedTickets,

inProgressTickets,

resolvedTickets,

closedTickets,

criticalTickets

]=await Promise.all([



prisma.ticket.count({
where:filter
}),



prisma.ticket.count({

where:{
...filter,
status:TicketStatus.OPEN
}

}),



prisma.ticket.count({

where:{
...filter,
status:TicketStatus.ASSIGNED
}

}),



prisma.ticket.count({

where:{
...filter,
status:TicketStatus.IN_PROGRESS
}

}),



prisma.ticket.count({

where:{
...filter,
status:TicketStatus.RESOLVED
}

}),



prisma.ticket.count({

where:{
...filter,
status:TicketStatus.CLOSED
}

}),



prisma.ticket.count({

where:{
...filter,
priority:Priority.CRITICAL
}

})


]);




return {

totalTickets,

openTickets,

assignedTickets,

inProgressTickets,

resolvedTickets,

closedTickets,

criticalTickets

};


}