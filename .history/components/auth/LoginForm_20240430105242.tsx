"use client"

import React, { useEffect, useState } from 'react'
import {  FaArrowRight, FaArrowLeft} from "react-icons/fa6";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {  motion } from 'framer-motion';


const LoginForm = ({handleclick, defaultEmail, defaultPassword}:any) => {

    const [error , setError] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordInputChange = (e:any) => {
        setPassword(e.target.value);
    };
    const handleEmailInputChange = (e:any) => {
        setEmail(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const router = useRouter();
    const session = useSession();

    useEffect(()=>{
        if(session?.status === "authenticated"){
            router.replace("/");
        }
    },[session, router])
    
    const isValidEmail = (email:string ) =>{
        const emailRegex = /^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})$/i;
        return emailRegex.test(email)
    }

    const handleLogin = async(e:any) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        if(!isValidEmail(email)){
            setError("Email is invalid");
            return;
        }

        if(!password || password.length < 8){
            setError("Invalid Email or Password");
            return;
        }

        const response = await signIn("credentials" , {
            redirect: false ,
            email, password,
        });

        if(response?.error){
            setError("Invalid Email or Password");
            if(response?.url) {
                
                router.replace("/")
            };
        }else{
            setError("")
        }
    
    }

  return (
    <motion.div 
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
    transition={{ duration: 0.9 }}
    className='flex  w-[60vw] flex-col  pl-[6%]'>
        <h1 className='text-3xl font-semibold text-white mt-[16%]'>Create Your Account to  <br />Unleash Your Dreams</h1>
        {/* <p className='mt-6 ml-1'>Don't have an account ? <Link href="/register">Register</Link> {" "}</p> */}
        <div className='mt-10 cursor-pointer flex items-center justify-between w-[70%] '>
        <FaArrowLeft onClick={handleclick}   color='white' className='bg-slate-600 w-8 h-8 rounded-full p-2'/>
        <p className='font-light text-sm pl-16'>Don&apos;t have an account?</p>
        <button onClick={handleclick} className='bg-slate-900 rounded-xl p-2 underline'>Register</button>
        </div>
        <form onSubmit={handleLogin}>
            <input type="email" required defaultValue={defaultEmail} onChange={handleEmailInputChange} placeholder='Email Address' className={`font-thin mt-5 flex items-center justify-between w-[70%] bg-slate-500 text-white p-2 pl-6 rounded-xl shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg ${email.length>0 ? 'ring-2 ring-[#279143] outline-none border-green-500' : ''}`}/>
            <input type={showPassword ? 'text' : 'password'} required value={password} onChange={handlePasswordInputChange} placeholder='Password' className={`font-thin mt-5 flex items-center justify-between w-[70%] bg-slate-500 text-white p-2 pl-6 rounded-xl shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg ${password.length>0 ? 'ring-2 ring-[#279143] outline-none border-green-500' : ''}`}/>
            <div className='flex mt-3 pl-2'>
            <input type="checkbox" onClick={togglePasswordVisibility} />
            <p className='pl-2 text-sm'>Show Password</p>
            </div>
            <button className={`mt-2 cursor-pointer flex items-center pl-[25%] justify-between w-[70%] bg-slate-500 text-white p-2  rounded-xl shadow-lg  bg-opacity-60 backdrop-filter backdrop-blur-lg ${password.length>3 && email.length>3 ? 'bg-opacity-60 backdrop-filter backdrop-blur-lg' : 'bg-opacity-30 backdrop-filter backdrop-blur-lg btn-disabled'}`}>
                <p className='text-center'>Login</p>
                <FaArrowRight color='white' className='bg-black w-8 h-8 rounded-full p-2'/>
            </button>
        </form>
        {error && <p className='text-red-500 mt-2'>{error}</p>}
        <p className='mt-5 font-light text-sm'>By signing in, you agree to MAGNITUDE&apos;s <span className='underline'>Terms of Service, <br /> Privacy Policy </span> and <span className='underline'>Data Usage Properties.</span></p>              
</motion.div>
  )
}

export default LoginForm
