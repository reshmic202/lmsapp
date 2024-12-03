import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiLoader5Fill } from "react-icons/ri";

interface Item {
    item: any;
}
const CourseCard: React.FC<Item> = ({ item }) => {
    console.log(item)

    const getDate = (createdAt:string) => {
        const date = new Date(createdAt);

        const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

        return  formattedDate;
    }

    return (
        <div className=" shadow-lg bg-slate-50 p-3 px-4 rounded-lg border border-slate-300">
            <div className=" flex mb-2 items-center justify-between ">
                <Image src={"/knowledge.png"} height={50} width={50} alt="logo" />
                <p className=" text-xs   bg-blue-500 text-white rounded-lg p-1 px-2">{getDate(item.createdAt)}</p>
            </div>
            <h1 className="font-bold truncate break-words">{item?.courseLayout?.studyMaterial?.title?.slice(0,40)}</h1>
            <p className=" text-sm truncate break-words text-justify whitespace-normal">{item?.courseLayout?.studyMaterial?.summary?.slice(0,250)}</p>
            <div className="w-full bg-slate-900 rounded-full h-2 mb-2">
                        <div
                            className="h-2 bg-green-700 rounded-full"
                            style={{ width: `${0 * 20}%` }} // Assuming getTotal ranges from 0 to 5
                        />
                    </div>
            <div className=" flex items-end justify-end">
                <Link href={`/course/${item.courseId}`} className={`${item.status==='generating'?"bg-slate-800 cursor-not-allowed":"bg-blue-500 hover:bg-blue-900"} text-white p-2
             rounded-md py-2 px-3 cursor-pointer w-1/3  duration-700 transition-all text-center`}>
                {
                    item.status==='generated'?"View" : (
                        <div className=" flex gap-1 items-center">
                            <RiLoader5Fill size={24} className=' animate-spin' />
                            <h1>Generating</h1>
                        </div>
                    )
                }
             </Link>
            </div>
        </div>
    )
}

export default CourseCard