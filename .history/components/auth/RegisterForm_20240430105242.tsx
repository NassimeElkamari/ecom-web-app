"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AnimatePresence , motion } from 'framer-motion';
import { FaArrowRight , FaArrowLeft, FaEyeSlash, FaEye } from 'react-icons/fa6'
import LoginForm from './LoginForm'

const RegisterForm = ({handleClick}:any) => {
    const [error , setError] = useState('');
    const router = useRouter();
    const [showLogin , setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [FullName, setFullName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
     

    const handlePasswordInputChange = (e:any) => {
        setPassword(e.target.value);
    };
    const handleEmailInputChange = (e:any) => {
        setEmail(e.target.value);
    };
    const handleNameInputChange = (e:any) => {
        setFullName(e.target.value);
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleShowLoginForm = () => {
        setTimeout(() => {
            setShowLogin(true);
        }, 300); 
    };

    const isValidEmail = (email:string ) =>{
        const emailRegex = /^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})$/i;
        return emailRegex.test(email)
    }

    const handleRegistration = async(e:any) => {
        e.preventDefault();
        const fullName = e.target[0].value;
        const emailValue = e.target[1].value;
        const passwordValue = e.target[2].value;

        if(!isValidEmail(emailValue)){
            setError("Email is invalid");
            return;
        }

        if(!passwordValue || passwordValue.length < 8){
            setError("Password is invalid");
            return;
        }

        try {
            const response = await fetch("api/register" , 
            {   
                method: "POST" , 
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({fullName, email: emailValue, password: passwordValue}),
            });

            if(response.status === 400){
                setError("This email is already registered");
            }
            
            if(response.status === 200){
                setError('');
                setEmail(emailValue);
                setPassword(passwordValue);
                setShowLogin(true);
            }
        } catch (error) {
            setError('Error in registration, please try again');
            console.log(error);
        }
    };

    return (
        <AnimatePresence>
            {!showLogin ? (
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.9 }}
                    className='flex w-[60vw] flex-col pl-[6%]'>
                    <h1 className='text-3xl font-semibold text-white mt-[16%]'>Create Your Account to <br />Unleash Your Dreams</h1>
                    <div className='mt-10 cursor-pointer flex items-center justify-between w-[70%]'>
                        <FaArrowLeft onClick={handleClick} color='white' className='bg-slate-600 w-8 h-8 rounded-full p-2'/>
                        <p className='font-light text-sm pl-[18%]'>Already have an account?</p>
                        <button onClick={handleShowLoginForm} className='bg-slate-900 rounded-xl p-2 underline'>Log in</button>
                    </div>
                    <form onSubmit={handleRegistration}>
                        <input type="text" required onChange={handleNameInputChange} placeholder='fullName' value={FullName} className={`font-thin mt-5 flex items-center justify-between w-[70%] bg-slate-500 text-white p-2 pl-6 rounded-xl shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg ${FullName.length>0 ? 'ring-2 ring-[#279143] outline-none border-green-500' : ''}`}/>
                        <input type="email" required onChange={handleEmailInputChange} placeholder='Email Address' value={email} className={`font-thin mt-2 flex items-center justify-between w-[70%] bg-slate-500 text-white p-2 pl-6 rounded-xl shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg ${email.length>0 ? 'ring-2 ring-[#279143] outline-none border-green-500' : ''}`}/>
                        <input type={showPassword ? 'text' : 'password'} onChange={handlePasswordInputChange} required value={password}  placeholder='Password' className={`font-thin mt-2 flex items-center justify-between w-[70%] bg-slate-500 text-white p-2 pl-6 rounded-xl shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg ${password.length>0 ? 'ring-2 ring-[#279143] outline-none border-green-500' : ''}`}/>
                        <div className='flex mt-3 pl-2'>
                        <input type="checkbox" onClick={togglePasswordVisibility} />
                        <p className='pl-2 text-sm'>Show Password</p>
                        </div>
                            <button className='mt-2 cursor-pointer flex items-center pl-[22%] justify-between w-[70%] bg-slate-500 text-white p-2 rounded-xl shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg'>
                            <p className='font-thin'>Create account</p>
                            <FaArrowRight color='white' className='bg-black w-8 h-8 rounded-full p-2'/>
                        </button>
                    </form>
                    {error && <p className='text-red-500 mt-2'>{error}</p>}
                    <p className='mt-5 font-light text-sm'>By signing in, you agree to MAGNITUDE&apos;s <span className='underline'>Terms of Service, <br /> Privacy Policy </span> and <span className='underline'>Data Usage Properties.</span></p>              
                </motion.div>
            ) : (
                <LoginForm 
                    handleclick={() => setShowLogin(false)} 
                    defaultEmail={email} 
                    defaultPassword={password} 
                />
            )}
        </AnimatePresence>
    );
}

export default RegisterForm;
