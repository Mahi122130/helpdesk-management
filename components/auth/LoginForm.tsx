"use client";

import {
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

import Link from "next/link";

import {
  loginAction
} from "@/actions/auth/login";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Headphones
} from "lucide-react";


const demos = [

  {
    name: "Manager",
    email: "manager1@company.com"
  },

  {
    name: "Technical",
    email: "tech1@company.com"
  },

  {
    name: "Employee",
    email: "emp1@company.com"
  }

];


export default function LoginForm(){


  const router = useRouter();


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [show,setShow] = useState(false);

  const [error,setError] = useState("");

  const [loading,setLoading] = useState(false);



  async function submit(
    e:React.FormEvent
  ){

    e.preventDefault();


    setError("");

    setLoading(true);



    const result = await loginAction(
      email,
      password
    );



    if(result.error){

      setError(result.error);

      setLoading(false);

      return;

    }



    router.push("/dashboard");

  }





return (

<div
className="
w-full
max-w-md
rounded-3xl
border
border-white/20
bg-white/10
p-8
shadow-2xl
backdrop-blur-xl
"
>



<div
className="
flex
justify-center
mb-6
"
>

<div
className="
h-16
w-16
rounded-2xl
bg-gradient-to-br
from-blue-600
to-cyan-400
flex
items-center
justify-center
"
>

<Headphones
className="text-white"
size={32}
/>

</div>

</div>





<h1
className="
text-center
text-3xl
font-bold
text-white
"
>

Helpdesk Portal

</h1>



<p
className="
text-center
text-slate-300
mt-2
"
>

Enterprise Ticket Management

</p>






<form
onSubmit={submit}
className="
mt-8
space-y-5
"
>





<div>


<label
className="
text-white
text-sm
"
>

Email

</label>



<div
className="
relative
mt-2
"
>


<Mail

className="
absolute
left-3
top-3
text-slate-400
"

/>



<input

value={email}

onChange={
e=>setEmail(e.target.value)
}

type="email"

required

placeholder="manager1@company.com"

className="
w-full
rounded-xl
bg-white/10
border
border-white/20
p-3
pl-10
text-white
outline-none
placeholder:text-slate-400
"

/>



</div>

</div>








<div>


<label
className="
text-white
text-sm
"
>

Password

</label>



<div
className="
relative
mt-2
"
>



<Lock

className="
absolute
left-3
top-3
text-slate-400
"

/>



<input


value={password}


onChange={
e=>setPassword(e.target.value)
}


type={
show
?
"text"
:
"password"
}


required


placeholder="password123"


className="
w-full
rounded-xl
bg-white/10
border
border-white/20
p-3
pl-10
pr-10
text-white
outline-none
placeholder:text-slate-400
"

/>



<button

type="button"

onClick={() => setShow(!show)}

className="
absolute
right-3
top-3
text-slate-400
"

>


{
show
?
<EyeOff size={18}/>
:
<Eye size={18}/>
}


</button>


</div>


</div>








{
error &&

<div

className="
rounded-lg
bg-red-500/20
p-3
text-sm
text-red-300
"

>

{error}

</div>

}






<button

disabled={loading}

className="
w-full
rounded-xl
bg-gradient-to-r
from-blue-600
to-cyan-500
py-3
font-semibold
text-white
disabled:opacity-50
"

>


{
loading
?
"Signing in..."
:
"Sign In"
}


</button>





{/* Create Account */}

<p
className="
text-center
text-sm
text-slate-300
mt-5
"
>

Don't have an account?


<Link

href="/register"

className="
ml-2
text-cyan-400
font-semibold
hover:text-cyan-300
"

>

Create Account

</Link>


</p>



</form>









<div
className="mt-8"
>


<p

className="
text-sm
text-slate-300
mb-3
"

>

Demo Accounts

</p>





<div
className="
space-y-2
"
>


{
demos.map(

demo => (

<button

key={demo.email}

type="button"

onClick={()=>{

setEmail(demo.email);

setPassword("password123");

}}

className="
w-full
rounded-lg
border
border-white/20
bg-white/5
p-3
text-left
text-white
hover:bg-white/10
"

>


{demo.name}


<div

className="
text-xs
text-slate-400
"

>

{demo.email}

</div>


</button>


)

)

}



</div>


</div>





</div>

);


}