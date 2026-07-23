"use client";


import {useState,useTransition} from "react";
import {toast} from "sonner";
import {addComment} from "@/actions/tickets/addComment";



export default function CommentForm({

ticketId

}:{
ticketId:string
}){


const [comment,setComment]=useState("");

const [pending,startTransition]=useTransition();



function submit(){


startTransition(async()=>{


try{


await addComment(
ticketId,
comment
);


setComment("");

toast.success(
"Comment added"
);



}catch(error){

toast.error(
"Failed to add comment"
);


}


});


}




return (

<div
className="
space-y-3
"
>


<textarea

value={comment}

onChange={(e)=>
setComment(e.target.value)
}

placeholder="
Write an update...
"

className="
w-full
rounded-xl
bg-white/10
border
border-white/20
p-4
text-white
outline-none
"

rows={4}

/>



<button

disabled={pending}

onClick={submit}

className="
rounded-xl
bg-blue-600
px-5
py-3
text-white
"

>

{
pending
?
"Posting..."
:
"Post Comment"
}


</button>


</div>

);

}