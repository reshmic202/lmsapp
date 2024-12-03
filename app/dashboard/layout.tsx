"use client"
import { useAppDispatch, useAppSelector } from '@/store';
import { setValue } from '@/store/userslice';
import { useEffect, useState } from 'react'
import SidebarDashboard from '../component/SidebarDashboard';
import DashboardNav from '../component/DashboardNav';


const layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const [showSideBar,setShowSideBar]=useState<boolean>(false);

  const getUserInfo = async (token: any) => {
    let res: any = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/user/getUserDetailsWithToken/${token}`);
    if (res.status === 201) {
      res = await res.json();
      dispatch(setValue(res.user))
    }
  }

  const handleSHowNavBar=() => {
    setShowSideBar(!showSideBar);
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

  return (
    <section className=' flex w-full min-h-screen  '>
      <aside className={`w-1/5 hidden  lg:flex`}>
        <SidebarDashboard />
      </aside>
      <aside className={`w-full lg:hidden ${showSideBar? 'flex' :"hidden"} `}>
        <div className=' bg-red-300 z-50 duration-700 transition-all fixed top-0 left-0 w-3/4 md:w-2/4'>
          <SidebarDashboard close={handleSHowNavBar}/>
        </div>
      </aside>
      <div className=' flex flex-col w-full lg:w-4/5'>
        <div className=' flex items-center bg-slate-200 p-3 justify-between '>
          <svg onClick={handleSHowNavBar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 lg:hidden cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
          <h1 className=' hidden lg:flex'></h1>
          <DashboardNav />
        </div>
        {children}
      </div>
    </section>
  )
}

export default layout