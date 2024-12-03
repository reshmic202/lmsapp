"use client"
import { useAppSelector } from '@/store';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CourseCard from '../component/CourseCard';

const Dashboard = () => {
  const userDetails: any = useAppSelector(item => item.userInformation);
  const [allCourse,setAllCourse]=useState([]);

  const getAllUserCours=async()=>{
    let res:any= await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/course/get-user-course/${userDetails._id}`);
    res=await res.json();
    // console.log("Courser: ",res.userCourses)
    setAllCourse(res.userCourses);
  };

  useEffect(()=>{
    if(userDetails){
      getAllUserCours();
    }
  },[userDetails,allCourse])
  

  return (
    <section className=' p-6 w-full'>
      <div className=' bg-blue-800 p-4 rounded-md w-full py-4 flex items-center gap-3'>
        <Image src="/lapy.png" height={150} className=' ' width={150} alt='lapy'/>
        <div className=' flex flex-col gap-3'>
          <h1 className='  text-xl text-white'>Hey, <span className=' font-bold text-slate-200'>{userDetails.name}</span></h1>
          <p className=' text-gray-200 text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque suscipit accusantium sed. Eos facilis quis placeat! Mollitia enim molestias, vel natus vero itaque ea cum quae, dolorem fugiat facilis maxime.</p>
        </div>
      </div>

      <div className=' mt-4'>
        <h1 className=' font-bold text-2xl'>Your Study Material</h1>
        <div className=' grid mt-2 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {
            allCourse.length>0 ? 
            (
              allCourse?                          .map((item,index)=>{
                return(
                  <CourseCard item={item} key={index}/>
                )
              })
            )
            :
            (
              <div className=' mt-10 flex items-center flex-col justify-center w-full'>
                <h1 className=' font-bold text-center text-2xl'>No Courses Created Yet.</h1>
              </div>
            ) 
          }
        </div>
      </div>
    </section>
  )
}

export default Dashboard