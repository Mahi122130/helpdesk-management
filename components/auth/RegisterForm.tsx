"use client";


import {
 useState
} from "react";


import {
 useRouter
} from "next/navigation";


import Link from "next/link";


import {
 User,
 Mail,
 Lock,
 Eye,
 EyeOff,
 Headphones,
 Building2,
 Phone
} from "lucide-react";


import {
 registerUser
} from "@/actions/auth/register";



export default function RegisterForm(){


const router = useRouter();


const [show,setShow] = useState(false);


const [error,setError] = useState("");


const [loading,setLoading] = useState(false);



const [form,setForm] = useState({

name:"",
email:"",
password:"",
confirmPassword:"",
role:"EMPLOYEE",
phone:"",
department:""

});





function change(
e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
){

setForm({

...form,

[e.target.name]:e.target.value

});

}





async function submit(
e:React.FormEvent
){

e.preventDefault();


setError("");

setLoading(true);



if(form.password !== form.confirmPassword){

setError("Passwords do not match");

setLoading(false);

return;

}




const result = await registerUser(form);



if(result.error){

setError(result.error);

setLoading(false);

return;

}



router.push("/login");

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

Create Account

</h1>




<p

className="
text-center
text-slate-300
mt-2
"

>

Join Helpdesk Portal

</p>







<form

onSubmit={submit}

className="
mt-8
space-y-4
"

>





<div className="relative">


<User

className="
absolute
left-3
top-3
text-slate-400
"

/>


<input

name="name"

value={form.name}

onChange={change}

placeholder="Full Name"

required

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








<div className="relative">


<Mail

className="
absolute
left-3
top-3
text-slate-400
"

/>


<input

name="email"

type="email"

value={form.email}

onChange={change}

placeholder="Email"

required

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









<div className="relative">


<Lock

className="
absolute
left-3
top-3
text-slate-400
"

/>



<input

name="password"

type={
show
?
"text"
:
"password"
}

value={form.password}

onChange={change}

placeholder="Password"

required

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

onClick={()=>setShow(!show)}

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








<input

name="confirmPassword"

type="password"

value={form.confirmPassword}

onChange={change}

placeholder="Confirm Password"

required

className="
w-full
rounded-xl
bg-white/10
border
border-white/20
p-3
text-white
outline-none
placeholder:text-slate-400
"

/>









<select

name="role"

value={form.role}

onChange={change}

className="
w-full
rounded-xl
bg-white/10
border
border-white/20
p-3
text-white
outline-none
"

>


<option

value="EMPLOYEE"

className="text-black"

>

Employee

</option>



<option

value="TECHNICAL"

className="text-black"

>

Technical Employee

</option>



</select>








{
form.role === "TECHNICAL" &&

<>


<div className="relative">

<Phone

className="
absolute
left-3
top-3
text-slate-400
"

/>


<input

name="phone"

value={form.phone}

onChange={change}

placeholder="Phone Number"

className="
w-full
rounded-xl
bg-white/10
border
border-white/20
p-3
pl-10
text-white
placeholder:text-slate-400
"

/>


</div>





<div className="relative">


<Building2

className="
absolute
left-3
top-3
text-slate-400
"

/>


<input

name="department"

value={form.department}

onChange={change}

placeholder="Department"

className="
w-full
rounded-xl
bg-white/10
border
border-white/20
p-3
pl-10
text-white
placeholder:text-slate-400
"

/>


</div>


</>

}








{
error &&

<p

className="
bg-red-500/20
text-red-300
rounded-lg
p-3
text-sm
"

>

{error}

</p>

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
"Creating Account..."
:
"Create Account"
}


</button>






<p

className="
text-center
text-sm
text-slate-300
mt-5
"

>


Already have an account?


<Link

href="/login"

className="
ml-2
text-cyan-400
font-semibold
"

>

Login

</Link>


</p>





</form>


</div>


);

}