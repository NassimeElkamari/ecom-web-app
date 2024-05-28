'use client'
import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

type Inputs = {
  email: string
  password: string
}

const LoginForm = ({handleclick}:any) => {
  const { data: session } = useSession()
  const params = useSearchParams()
  let callbackUrl = params.get('callbackUrl') || '/'
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl)
    }
  }, [callbackUrl, params, router, session])

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form
    signIn('credentials', {
      email,
      password,
    })
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
        {params.get('error') && (
          <div className="alert text-error">
            {params.get('error') === 'CredentialsSignin'
              ? 'Invalid email or password'
              : params.get('error')}
          </div>
        )}
        {params.get('success') && (
          <div className="alert text-success">{params.get('success')}</div>
        )}
        <form onSubmit={handleSubmit(formSubmit)}>
            <input type="email" required id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Email is invalid',
                },
              })} placeholder='Email Address' className={`font-thin mt-5 flex items-center justify-between w-[70%] bg-slate-500 text-white p-2 pl-6 rounded-xl shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg `}/>
              {errors.email?.message && (
              <div className="text-error">{errors.email.message}</div>
            )}
            <input type='password' required  id="password"
              {...register('password', {
                required: 'Password is required',
              })} placeholder='Password' className={`font-thin mt-5 flex items-center justify-between w-[70%] bg-slate-500 text-white p-2 pl-6 rounded-xl shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg `}/>
            {errors.password?.message && (
              <div className="text-error">{errors.password.message}</div>
            )}
            <button  type="submit" className={`mt-2 cursor-pointer flex items-center pl-[25%] justify-between w-[70%] bg-slate-500 text-white p-2  rounded-xl shadow-lg  bg-opacity-60  backdrop-blur-lg'bg-opacity-60 backdrop-filter backdrop-blur-lg`}>
                <p className='text-center'>Login</p>
                <FaArrowRight color='white' className='bg-black w-8 h-8 rounded-full p-2'/>
            </button>
        </form>
        <p className='mt-5 font-light text-sm'>By signing in, you agree to MAGNITUDE&apos;s <span className='underline'>Terms of Service, <br /> Privacy Policy </span> and <span className='underline'>Data Usage Properties.</span></p>              
</motion.div>
  )
}

export default LoginForm
