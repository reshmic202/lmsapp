"use client"
import { useAppDispatch, useAppSelector } from '@/store'
import { setValue } from '@/store/userslice';
import { useEffect, useState } from 'react';


const DashboardNav: React.FC = () => {
    const dispatch = useAppDispatch();

    const getUserInfo = async (token: any) => {
        let res: any = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/user/getUserDetailsWithToken/${token}`);
        if (res.status === 201) {
          res = await res.json();
          dispatch(setValue(res.user))
        }
      }

      useEffect(() => {
        const getToken = localStorage.getItem('token');
        console.log("Token: " + getToken);
        if (getToken) {
          getUserInfo(getToken)
        }
        else{
          window.location.href = '/login'
        }
      }, [])
    

    const userDetails: any = useAppSelector(item => item.userInformation);
    const [showModel, setShowModel] = useState<boolean>(false)

    return (
        <nav className=' bg-white text-xs md:text-sm px-2 flex items-end justify-end p-[2px] border select-none rounded-2xl shadow-xl'>
            <div onMouseLeave={() => {
                setShowModel(false)
            }} onMouseEnter={() => {
                setShowModel(true)
            }} className='  flex items-center gap-1  p-2 cursor-pointer '>
                <p className="rounded-full bg-blue-900 p-2 w-10 h-10 flex items-center justify-center text-white">A</p>
                <div>
                    <h1 className=' font-bold'>{userDetails?.name}</h1>
                    <h1 className=' truncate'>{userDetails?.email}</h1>
                </div>
            </div>
            {
                showModel && (
                    <div onMouseLeave={() => {
                        setShowModel(false)
                    }} onMouseEnter={() => {
                        setShowModel(true)
                    }} className="fixed top-16 w-[280px] right-4  z-50   bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 px-6 ">

                            <button className="text-sm text-gray-600 text-center mb-6 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                                Edit your profile details
                            </button>
                            <button onClick={()=>{
                                localStorage.removeItem('token');
                                window.location.href = '/';
                            }} className=' text-red-600  rounded-md  flex items-center gap-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>

                                Logout</button>
                            {/* Add your profile edit form here */}
                        </div>
                    </div>
                )
            }
        </nav>
    )
}

export default DashboardNav