"use client"
import ForgotPasswordModal from '@/app/component/ForgotPassword'
import Link from 'next/link'
import React, { useState } from 'react'
import Toast from '../component/Toast'

const Login = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [openForgotPasswordModel, setOpenForgotPasswordModel] = useState<boolean>(false)
    const [toast, setToast] = useState<{ message: string; type: string; position: string } | null>(null);


    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })

    const openHideForgotPasswordModel = () => {
        setOpenForgotPasswordModel(!openForgotPasswordModel)
    }
    const hideShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const handleSignup = async () => {
        console.log("process.env.API_URL: ", process.env.NEXT_PUBLIC_API_KEY)
        try {
            if (userInfo.password.length < 6) {
                setToast({ message: 'Password must be at least 6 characters long', type: 'error', position: 'top-right' })
                return
            }
            if (!userInfo.email.includes('@')) {
                setToast({ message: 'Invalid email address', type: 'error', position: 'top-right' })
                return
            }
            // API call to sign up user
            let res: any = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/user/login-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
            const status = res.status;
            res = await res.json();
            if (status == 201) {
                setToast({
                    message: res?.message,
                    type: 'success',
                    position: 'top-right'
                });
                localStorage.setItem('token', res.token);
                window.location.href = '/'
            }
            else {
                setToast({ message: res?.error, type: 'error', position: 'top-right' })
            }

        } catch (err) {
            console.error(err)
        }
    }

    const hideToast = () => {
        setToast(null);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r lg:px-32 md:px-8 px-4  from-indigo-200 via-purple-200 to-purple-300">
            <div className=' rounded-2xl w-full md:w-1/2 lg:w-1/3 p-4 bg-white py-10'>
                <h1 className=' text-2xl text-center mb-4 font-bold'>Login</h1>
                <div className=' flex items-center gap-1 rounded-xl px-2 bg-slate-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <input required name='email' onChange={handleChange} className='w-full p-2 rounded-md bg-slate-100  focus:outline-none text-sm' type="email" placeholder='Email' />
                </div>

                <div className=' flex mt-2 items-center gap-1 rounded-xl px-2 bg-slate-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>

                    <div className=' flex items-center gap-1 justify-between w-full'>
                        <input required onChange={handleChange} name='password' className='w-full p-2 rounded-md bg-slate-100  focus:outline-none text-sm' type={showPassword ? "text" : "password"} placeholder='Password' />
                        <button onClick={hideShowPassword}>
                            {
                                showPassword ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>

                                ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div>
                    <p onClick={openHideForgotPasswordModel} className=' text-red-500 font-semibold text-right mt-2 cursor-pointer'>Forgot password?</p>
                    <button onClick={handleSignup} className='w-full mt-2 px-4 py-2 text-white bg-slate-600 rounded-xl hover:bg-slate-700'>Login</button>
                </div>
                <div className=' flex items-center justify-center mt-1'>
                    <Link href={"/signup"} className=' text-slate-500 font-semibold mt-2 cursor-pointer'>Don't have an account? Sign up</Link>
                </div>
            </div>

            {
                openForgotPasswordModel && (
                    <ForgotPasswordModal isOpen={openForgotPasswordModel} onClose={openHideForgotPasswordModel} />
                )
            }

            {toast && (
                <Toast onClose={hideToast} message={toast.message} position={toast.position as any} type={toast.type as any} />
            )
            }
        </div>
    )
}

export default Login