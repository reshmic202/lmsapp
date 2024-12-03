import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface SidebarDashboardProps {
    close?: () => void;
  }
  
  const SidebarDashboard: React.FC<SidebarDashboardProps> = ({ close }) => {
    const pathname = usePathname();
    const getTotal = 4;

    return (
        <div className=' p-4 bg-slate-100 w-full min-h-screen'>
            <div className=' flex flex-col'>
                <div className=' lg:hidden flex items-end justify-end mb-3'>
                    <svg onClick={close} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </div>
                <div className=' flex items-center justify-center'>
                    <Image src={"/logo.jpg"} alt='logo' height={30} width={200} className=' cursor-pointer mix-blend-multiply' />
                </div>
                <button className=' mt-10 bg-blue-500 p-2 px-4 w-full rounded-lg text-white py-3'>
                    <Link href={"/dashboard/create"} className=''> + Create New</Link>
                </button>
                <div className=' mt-10'>
                    <Link href={"/dashboard"} className={`flex mb-6 items-center gap-2 cursor-pointer ${pathname === '/dashboard' ? " opacity-100 bg-slate-300 p-2 rounded-lg font-bold" : "opacity-55"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <h1>Dashboard</h1>
                    </Link>
                    <Link href={"/dashboard/upgrade"} className={`flex mb-6 items-center gap-2 cursor-pointer ${pathname === '/dashboard/upgrade' ? " opacity-100 bg-slate-300 p-2 rounded-lg font-bold" : "opacity-55"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                        </svg>
                        <h1>Upgrade</h1>
                    </Link>
                    <Link href={"/dashboard/profile"} className={`flex mb-6 items-center gap-2 cursor-pointer ${pathname === '/dashboard/profile' ? " opacity-100 bg-slate-300 p-2 rounded-lg font-bold" : "opacity-55"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <h1>Profile</h1>
                    </Link>
                </div>

                <div className='absolute bottom-4 border-2 border-blue-700 p-4 rounded-2xl w-[260px] bg-white shadow-lg'>
                    <h1 className='font-bold text-xl mb-2'>Available Credit: 5</h1>
                    <div className="w-full bg-slate-300 rounded-full h-2 mb-2">
                        <div
                            className="h-2 bg-green-700 rounded-full"
                            style={{ width: `${getTotal * 20}%` }} // Assuming getTotal ranges from 0 to 5
                        />
                    </div>
                    <p className='text-sm mb-2'>
                        <span className='text-red-600 font-bold'>{getTotal}</span> out of <span className='text-green-600 font-bold'>5</span> Credits Used
                    </p>
                    <Link href="/dashboard/credit" className='text-blue-600 text-sm font-semibold hover:underline'>
                        Upgrade to create more
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SidebarDashboard