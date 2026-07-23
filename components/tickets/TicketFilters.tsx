"use client";

import {
  useRouter,
  useSearchParams
} from "next/navigation";

import {
  useState
} from "react";


export default function TicketFilters({

technicians,

showAssignedFilter,

role

}:{

technicians:{
id:string;
name:string;
}[];

showAssignedFilter:boolean;

role:string;

}){


const router = useRouter();

const searchParams = useSearchParams();





const [search,setSearch] =
useState(
searchParams.get("search") ?? ""
);


const [status,setStatus] =
useState(
searchParams.get("status") ?? ""
);


const [priority,setPriority] =
useState(
searchParams.get("priority") ?? ""
);


const [category,setCategory] =
useState(
searchParams.get("category") ?? ""
);


const [assignedTo,setAssignedTo] =
useState(
searchParams.get("assignedTo") ?? ""
);


const [sort,setSort] =
useState(
searchParams.get("sort") ?? ""
);







function applyFilters(){


const params =
new URLSearchParams();




if(search)
params.set(
"search",
search
);



if(status)
params.set(
"status",
status
);



if(priority)
params.set(
"priority",
priority
);



if(category)
params.set(
"category",
category
);



if(
showAssignedFilter &&
assignedTo
){

params.set(
"assignedTo",
assignedTo
);

}



if(sort)
params.set(
"sort",
sort
);




router.push(
`/tickets?${params.toString()}`
);


}







function clearFilters(){


setSearch("");

setStatus("");

setPriority("");

setCategory("");

setAssignedTo("");

setSort("");

router.push(
"/tickets"
);


}







const selectClass = `

rounded-xl

bg-slate-900

border

border-white/10

p-3

text-white

outline-none

`;








return (

<div
className="
space-y-4
"
>





<div
className="
grid
md:grid-cols-5
gap-3
"
>






<input

value={search}

onChange={
e=>setSearch(
e.target.value
)
}

placeholder="Search title..."

className="
rounded-xl
bg-slate-900
border
border-white/10
p-3
text-white
placeholder:text-slate-400
outline-none
"

/>









{/* STATUS */}


<select

value={status}

onChange={
e=>setStatus(
e.target.value
)
}

className={selectClass}

>

<option value="">
Status
</option>




{

role === "TECHNICAL" ?


<>


<option value="ASSIGNED">
Assigned
</option>


<option value="IN_PROGRESS">
In Progress
</option>


<option value="RESOLVED">
Resolved
</option>


</>


:

role === "EMPLOYEE" ?


<>


<option value="OPEN">
Open
</option>


<option value="RESOLVED">
Resolved
</option>


<option value="CLOSED">
Closed
</option>


</>


:


<>


<option value="OPEN">
Open
</option>


<option value="ASSIGNED">
Assigned
</option>


<option value="IN_PROGRESS">
In Progress
</option>


<option value="RESOLVED">
Resolved
</option>


<option value="CLOSED">
Closed
</option>


</>


}



</select>









{/* PRIORITY */}


<select

value={priority}

onChange={
e=>setPriority(
e.target.value
)
}

className={selectClass}

>


<option value="">
Priority
</option>


<option value="LOW">
Low
</option>


<option value="MEDIUM">
Medium
</option>


<option value="HIGH">
High
</option>


<option value="CRITICAL">
Critical
</option>


</select>









{/* CATEGORY */}


<select

value={category}

onChange={
e=>setCategory(
e.target.value
)
}

className={selectClass}

>


<option value="">
Category
</option>


<option value="IT_SUPPORT">
IT Support
</option>


<option value="FACILITIES">
Facilities
</option>


<option value="HR">
HR
</option>


<option value="OTHER">
Other
</option>


</select>









{/* ASSIGNED TECHNICIAN ONLY MANAGER */}


{

showAssignedFilter && (


<select

value={assignedTo}

onChange={
e=>setAssignedTo(
e.target.value
)
}

className={selectClass}

>


<option value="">
Assigned To
</option>



{

technicians.map(
tech=>(


<option

key={tech.id}

value={tech.id}

>

{tech.name}

</option>


)

)


}



</select>


)

}









{/* SORT */}


<select

value={sort}

onChange={
e=>setSort(
e.target.value
)
}

className={selectClass}

>


<option value="">
Sort
</option>


<option value="date">
Date
</option>


<option value="priority">
Priority
</option>


<option value="status">
Status
</option>


</select>






</div>







<div
className="
flex
gap-3
"
>


<button

onClick={applyFilters}

className="
rounded-xl
bg-blue-600
px-6
py-3
text-white
font-semibold
hover:bg-blue-700
"

>

Apply Filters

</button>







<button

onClick={clearFilters}

className="
rounded-xl
border
border-white/20
bg-white/5
px-6
py-3
text-white
hover:bg-white/10
"

>

Clear Filters

</button>





</div>





</div>

);

}