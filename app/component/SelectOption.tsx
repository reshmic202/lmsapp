"use client"
import React, { useState } from 'react'
const category=[
    {
        name:"Exam",
        image:"/exam.png"
    },
    {
        name:"Job Interview",
        image:"/job.png"
    },
    {
        name:"Practice",
        image:"/practice.png"
    },
    {
        name:"Coding Prep",
        image:"/code.png"
    },
    {
        name:"Other Prep",
        image:"/knowledge.png"
    },
]

interface changeForCategoryType{
    changeForCategory:(category:string)=>void
}

const SelectOption:React.FC<changeForCategoryType> = ({changeForCategory}) => {
    const [selectedOption,setSelectOptions] = useState<string>("");

    return (
        <div>
            <p className=' font-bold mt-10 text-black'>For which you want to create your personal study materials?</p>

            <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2'>
                {
                    category.map((item, index) => {
                        return (
                            <div onClick={()=>{
                                setSelectOptions(item.name)
                                changeForCategory(item.name)
                            }} key={index} className={`flex items-center flex-col cursor-pointer border rounded-xl p-3
             justify-center gap-2 ${selectedOption===item.name && " border-slate-400 border-4"}shadow-lg`}>
                                <img src={item.image} alt={item.name} className='w-12 h-12' />
                                <p className='ml-2 font-semibold text-sm'>{item.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SelectOption