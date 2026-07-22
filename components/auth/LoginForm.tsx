"use client";

import { useState } from "react";
import { loginAction } from "@/actions/auth/login";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Headphones,
  ShieldCheck,
} from "lucide-react";


export default function LoginForm() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);


  async function handleSubmit(
    e:React.FormEvent
  ){

    e.preventDefault();

    setError("");
    setLoading(true);


    const result =
      await loginAction(
        email,
        password
      );


    if(result?.error){

      setError(result.error);
      setLoading(false);

    }

  }


  return (

    <div className="relative">


      {/* background decoration */}

      <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-blue-500/30 blur-3xl"/>

      <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-cyan-400/30 blur-3xl"/>



      <div
        className="
        relative
        rounded-3xl
        border
        border-white/20
        bg-white/10
        p-8
        shadow-2xl
        backdrop-blur-xl
        "
      >


        {/* Logo */}

        <div className="mb-8 flex justify-center">

          <div
            className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-blue-600
            to-cyan-400
            shadow-lg
            "
          >

            <Headphones
              className="text-white"
              size={32}
            />

          </div>

        </div>



        <div className="text-center">


          <h1
            className="
            text-3xl
            font-bold
            tracking-tight
            text-white
            "
          >
            Helpdesk Portal
          </h1>


          <p
            className="
            mt-2
            text-sm
            text-slate-300
            "
          >
            Manage tickets. Resolve issues. Work smarter.
          </p>


        </div>




        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >



          {/* Email */}

          <div>


            <label
              className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-200
              "
            >
              Email Address
            </label>



            <div className="relative">


              <Mail
                size={18}
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                "
              />



              <input

                type="email"

                value={email}

                onChange={
                  e=>setEmail(e.target.value)
                }

                placeholder="manager1@company.com"

                className="
                w-full
                rounded-xl
                border
                border-white/20
                bg-white/10
                py-3
                pl-11
                pr-4
                text-white
                outline-none
                placeholder:text-slate-400
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/30
                "

                required

              />


            </div>


          </div>





          {/* Password */}

          <div>


            <label
              className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-200
              "
            >
              Password
            </label>



            <div className="relative">


              <Lock
                size={18}
                className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                "
              />



              <input

                type={
                  showPassword
                  ? "text"
                  : "password"
                }

                value={password}

                onChange={
                  e=>setPassword(e.target.value)
                }

                placeholder="••••••••"

                className="
                w-full
                rounded-xl
                border
                border-white/20
                bg-white/10
                py-3
                pl-11
                pr-12
                text-white
                outline-none
                placeholder:text-slate-400
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/30
                "

                required

              />



              <button

                type="button"

                onClick={()=>
                  setShowPassword(!showPassword)
                }

                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                "

              >

                {
                  showPassword
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
              rounded-xl
              border
              border-red-400/30
              bg-red-500/10
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
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            py-3
            font-semibold
            text-white
            shadow-lg
            transition
            hover:scale-[1.02]
            hover:shadow-cyan-500/30
            disabled:opacity-50
            "

          >

            {
              loading
              ?
              "Signing in..."
              :
              <>
              <ShieldCheck size={18}/>
              Sign in securely
              </>
            }


          </button>



        </form>


        <p
          className="
          mt-8
          text-center
          text-xs
          text-slate-400
          "
        >
          Enterprise Helpdesk Management System
        </p>


      </div>


    </div>

  );
}