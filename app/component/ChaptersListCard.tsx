import React from 'react'

interface CourseType{
    courses:[]
}
const ChaptersListCard:React.FC<CourseType> = ({courses}) => {
    return (
        <div>
            <h1 className=' font-bold text-xl'>Chapters</h1>
            <div className=' grid mt-3 grid-cols-1 gap-3'>
                {
                    courses?.map((item:any, index) => {
                        return (
                            <div key={index} className='  bg-white shadow-md p-3 flex gap-2  rounded-lg cursor-pointer'>
                                <div>
                                    <p className=' font-bold'>{index+1}. </p>
                                </div>
                                <div>
                                    <h1 className=' font-bold'>{item.title}</h1>
                                    <h1 className=' text-sm text-slate-400'>{item.description}</h1>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChaptersListCard