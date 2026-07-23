import Link from "next/link";

import {
  Headphones,
  Ticket,
  Users,
  ShieldCheck,
  Clock,
  BarChart3,
  ArrowRight,
  CheckCircle2
} from "lucide-react";



const features = [
  {
    icon: Ticket,
    title: "Smart Ticket Management",
    description:
      "Create, assign, track and resolve support tickets with a centralized workflow."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Managers and technical teams work together with clear responsibilities."
  },
  {
    icon: ShieldCheck,
    title: "Role Based Access",
    description:
      "Secure dashboards designed for employees, technicians and managers."
  },
  {
    icon: Clock,
    title: "Faster Resolution",
    description:
      "Prioritize urgent issues and reduce response time."
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Monitor workload, ticket status and team productivity."
  }
];




export default function Home(){


return (

<main

className="
min-h-screen
bg-gradient-to-br
from-slate-950
via-blue-950
to-slate-900
text-white
"

>


{/* Navbar */}

<header
className="
flex
flex-col
sm:flex-row
items-center
justify-between
gap-5
px-4
sm:px-8
py-6
max-w-7xl
mx-auto
"
>


<div

className="
flex
items-center
gap-3
"

>

<div

className="
h-12
w-12
rounded-xl
bg-gradient-to-br
from-blue-600
to-cyan-400
flex
items-center
justify-center
"

>

<Headphones size={26}/>

</div>


<div>

<h1 className="font-bold text-xl">

HelpDesk

</h1>

<p className="text-xs text-slate-400">

Enterprise Support Platform

</p>

</div>


</div>





<nav
className="
flex
w-full
sm:w-auto
gap-3
"
>


<Link

href="/login"

className="
px-5
py-2.5
rounded-xl
border
border-white/20
hover:bg-white/10
transition
"

>

Login

</Link>



<Link

href="/register"

className="
px-5
py-2.5
rounded-xl
bg-gradient-to-r
from-blue-600
to-cyan-500
font-semibold
hover:opacity-90
transition
"

>

Create Account

</Link>


</nav>


</header>







{/* Hero */}


<section

className="
max-w-7xl
mx-auto
px-4
sm:px-8
py-12
md:py-20
grid
md:grid-cols-2
gap-12
items-center
"

>



<div>


<div

className="
inline-flex
items-center
gap-2
rounded-full
border
border-cyan-400/30
bg-cyan-400/10
px-4
py-2
text-sm
text-cyan-300
mb-6
"

>


<CheckCircle2 size={16}/>

Modern IT Support Solution

</div>






<h2
className="
text-4xl
sm:text-5xl
lg:text-6xl
font-bold
leading-tight
"
>
Resolve Issues.
<br/>

Empower Teams.
<br/>

Deliver Faster Support.

</h2>





<p

className="
mt-6
text-lg
text-slate-300
max-w-xl
"

>

A complete helpdesk management platform that connects employees,
technical teams and managers in one intelligent workspace.

</p>






<div
className="
mt-8
flex
flex-col
sm:flex-row
gap-4
"
>

<Link

href="/register"

className="
flex
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-blue-600
to-cyan-500
px-7
py-3
font-semibold
"

>

Get Started

<ArrowRight size={18}/>

</Link>




<Link

href="/login"

className="
rounded-xl
border
border-white/20
px-7
py-3
hover:bg-white/10
"

>

Sign In

</Link>


</div>


</div>









{/* Dashboard Preview */}

<div

className="
rounded-3xl
border
border-white/20
bg-white/10
backdrop-blur-xl
p-6
shadow-2xl
"

>


<div

className="
flex
justify-between
mb-6
"

>

<p className="font-semibold">

Dashboard Overview

</p>


<span

className="
text-xs
bg-green-500/20
text-green-300
px-3
py-1
rounded-full
"

>

Online

</span>


</div>





<div className="space-y-4">


{
[
["Open Tickets","24"],
["In Progress","12"],
["Resolved Today","38"]

].map(item=>(


<div

key={item[0]}

className="
rounded-xl
bg-white/10
p-4
flex
justify-between
"

>

<span className="text-slate-300">

{item[0]}

</span>


<strong>

{item[1]}

</strong>


</div>


))

}


</div>


</div>



</section>









{/* Features */}


<section
className="
max-w-7xl
mx-auto
px-4
sm:px-8
py-12
md:py-20
grid
grid-cols-1
lg:grid-cols-2
gap-12
items-center
"
>


<h3

className="
text-4xl
font-bold
text-center
"

>

Everything Your Support Team Needs

</h3>



<p

className="
text-center
text-slate-300
mt-4
"

>

Built for efficient communication and faster issue resolution.

</p>






<div
className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
mt-12
"
>


{
features.map(feature=>{


const Icon=feature.icon;


return (

<div

key={feature.title}

className="
rounded-2xl
border
border-white/20
bg-white/10
p-6
backdrop-blur-xl
hover:bg-white/15
transition
"

>


<div

className="
h-12
w-12
rounded-xl
bg-blue-600/30
flex
items-center
justify-center
mb-5
"

>

<Icon/>

</div>



<h4 className="text-xl font-semibold">

{feature.title}

</h4>


<p className="text-slate-300 mt-3">

{feature.description}

</p>



</div>


)


})

}


</div>


</section>









{/* Roles */}


<section

className="
max-w-7xl
mx-auto
px-4
sm:px-8
py-12
md:py-20
"

>


<div

className="
rounded-3xl
border
border-white/20
bg-white/10
p-10
"

>


<h3 className="text-3xl font-bold">

Designed For Every Team Member

</h3>



<div
className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-8
mt-8
"
>


<div>

<h4 className="font-semibold text-xl">

Employees

</h4>

<p className="text-slate-300 mt-2">

Create tickets and track your requests.

</p>

</div>



<div>

<h4 className="font-semibold text-xl">

Technical Team

</h4>

<p className="text-slate-300 mt-2">

Resolve assigned issues and update progress.

</p>

</div>



<div>

<h4 className="font-semibold text-xl">

Managers

</h4>

<p className="text-slate-300 mt-2">

Assign work and monitor team performance.

</p>

</div>


</div>


</div>


</section>









{/* CTA */}


<section

className="
text-center
px-8
py-20
"

>


<h3

className="
text-4xl
font-bold
"

>

Ready to improve your support workflow?

</h3>


<p

className="
text-slate-300
mt-4
"

>

Start managing tickets smarter today.

</p>


<Link

href="/register"

className="
inline-block
mt-8
rounded-xl
bg-gradient-to-r
from-blue-600
to-cyan-500
px-10
py-4
font-semibold
"

>

Create Free Account

</Link>


</section>









<footer

className="
border-t
border-white/10
py-8
text-center
text-slate-400
"

>

© {new Date().getFullYear()} HelpDesk Management System

</footer>



</main>


);

}