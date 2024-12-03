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
    <section className=' flex flex-col w-full min-h-screen  '>
      <DashboardNav />
      {children}
    </section>
  )
}

export default layout