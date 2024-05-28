"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import LoginForm from "./LoginForm";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const RegisterForm = ({handleClick}:any) => {
  const { data: session } = useSession();
  const params = useSearchParams();
  const [error , setError] = useState('');
  const router = useRouter();
  const [showLogin , setShowLogin] = useState(false);


  let callbackUrl = params.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if(res.status === 400){
        setError("This email is already registered");
    }
    
    if(res.status === 201){
        setError('');
        setShowLogin(true);
    }
      } catch (error: any) {
        setError('Error in registration, please try again');
        console.log(error);
    }
  };

  const handleShowLoginForm = () => {
    setTimeout(() => {
        setShowLogin(true);
    }, 300); 
};
  return (
    <AnimatePresence>
      {!showLogin ? (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
          transition={{ duration: 0.9 }}
          className="flex w-[60vw] flex-col pl-[6%]"
        >
          <h1 className="text-3xl font-semibold text-white mt-[16%]">
            Create Your Account to <br />
            Unleash Your Dreams
          </h1>
          <div className="mt-10 cursor-pointer flex items-center justify-between w-[70%]">
            <FaArrowLeft
              onClick={handleClick}
              color="white"
              className="bg-slate-600 w-8 h-8 rounded-full p-2"
            />
            <p className="font-light text-sm pl-[18%]">
              Already have an account?
            </p>
            <button
              onClick={handleShowLoginForm}
              className="bg-slate-900 rounded-xl p-2 underline"
            >
              Log in
            </button>
          </div>
          <form onSubmit={handleSubmit(formSubmit)}>
            <input
              type="text"
              required
              {...register("name", { required: "Name is required" })}
              placeholder="fullName"
              className={`font-thin mt-5 flex items-center justify-between w-[70%] bg-slate-500 text-white p-2 pl-6 rounded-xl shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg 
              `}
            />
            {errors.name?.message && (
              <div className="text-error">{errors.name.message}</div>
            )}
            <input
              type="email"
              required
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Email is invalid",
                },
              })}
              placeholder="Email Address"
              className={`font-thin mt-2 flex items-center justify-between w-[70%] bg-slate-500 text-white p-2 pl-6 rounded-xl shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg "ring-2 ring-[#279143] outline-none border-green-500" }`}
            />
            {errors.email?.message && (
              <div className="text-error"> {errors.email.message}</div>
            )}
            <input
              type='password'
              id="password"
              {...register('password', {
                required: 'Password is required',
              })}
              required
              placeholder="Password"
              className={`font-thin mt-2 flex items-center justify-between w-[70%] bg-slate-500 text-white p-2 pl-6 rounded-xl shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg `}
            />
           
            <button type="submit" className="mt-2 cursor-pointer flex items-center pl-[22%] justify-between w-[70%] bg-slate-500 text-white p-2 rounded-xl shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg">
              <p className="font-thin">Create account</p>
              <FaArrowRight
                color="white"
                className="bg-black w-8 h-8 rounded-full p-2"
              />
            </button>
          </form>
          {error && <p className='text-red-500 mt-2'>{error}</p>}
          <p className="mt-5 font-light text-sm">
            By signing in, you agree to MAGNITUDE&apos;s{" "}
            <span className="underline">
              Terms of Service, <br /> Privacy Policy{" "}
            </span>{" "}
            and <span className="underline">Data Usage Properties.</span>
          </p>
        </motion.div>
      ) : (
        <LoginForm
          handleclick={() => setShowLogin(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default RegisterForm;
