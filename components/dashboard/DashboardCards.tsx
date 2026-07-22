import StatCard from "./StatCard";

import {
dashboardCards
} from "@/constants/dashboard";



type Props={

stats:Record<string,number>;

};



export default function DashboardCards({

stats

}:Props){


return (

<div

className="
grid
grid-cols-1
md:grid-cols-4
gap-6
"

>


{

dashboardCards.map(card=>(


<StatCard

key={card.key}

title={card.label}

value={
stats[card.key]
}


/>


))


}


</div>


);


}