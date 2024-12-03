import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface ItemType{
    item: any;
    courseId: any;
}
const StudyMaterialCard:React.FC<ItemType> = ({item,courseId}) => {
  return (
    <div className=' bg-white p-4 gap-1 rounded-md flex flex-col items-center justify-center'>
        <span className=' bg-green-400 text-xs p-1
         px-2 rounded-md text-white'>{"Ready"}</span>
         <Image src={item.icons} alt='know' height={80} width={80} />
         <h1 className=' font-bold'>{item.name}</h1>
         <p className=' text-gray-400 font-medium'>{item.dis}</p>
         <Link href={`/course/${courseId}/chapters`} className='   w-full text-center bg-slate-100 p-2 px-3 rounded-lg'>
            View
         </Link>
    </div>
  )
}

export default StudyMaterialCard