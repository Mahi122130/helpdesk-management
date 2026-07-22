type Props = {
    value:string;
};


export default function Badge({
    value
}:Props){


const colors:any = {

OPEN:
"bg-blue-500/20 text-blue-300",

ASSIGNED:
"bg-purple-500/20 text-purple-300",

IN_PROGRESS:
"bg-yellow-500/20 text-yellow-300",

RESOLVED:
"bg-green-500/20 text-green-300",

CLOSED:
"bg-slate-500/20 text-slate-300",


LOW:
"bg-green-500/20 text-green-300",

MEDIUM:
"bg-yellow-500/20 text-yellow-300",

HIGH:
"bg-orange-500/20 text-orange-300",

CRITICAL:
"bg-red-500/20 text-red-300",

};


return (

<span
className={`
px-3
py-1
rounded-full
text-xs
font-medium
${colors[value] ?? "bg-white/10"}
`}
>

{value.replace("_"," ")}

</span>

)

}