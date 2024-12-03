"use client"
import SelectOption from '@/app/component/SelectOption';
import Toast from '@/app/component/Toast';
import TopicRelated from '@/app/component/TopicRelated';
import { useAppSelector } from '@/store';
import React, { useState } from 'react'
import {uuid} from 'uuidv4'
import { RiLoader5Fill } from "react-icons/ri";


const CreateNewCourse = () => {
    const [selectedOptions,setSelectOptions]=useState<number>(1);
    const userDetails: any = useAppSelector(item => item.userInformation);

    const [newStudyDetails,setNewStudyDetails]=useState({
        topic:"",
        category:"",
        level:""
    })
    const [iscreating,setIsCreating] = useState<boolean>(false)
    const [toast, setToast] = useState<{ message: string; type: string; position: string } | null>(null);



    const changeForTopic=(topic:string)=>{
        setNewStudyDetails({
            ...newStudyDetails,
            topic:topic
        })
    }
    const changeForCategory=(category:string)=>{
        setNewStudyDetails({
            ...newStudyDetails,
            category:category
        })
    }
    const changeForLevel=(level:string)=>{
        setNewStudyDetails({
            ...newStudyDetails,
            level:level
        })
    }

    const createCourse=async()=>{
        setIsCreating(true)
        try{
            let res: any = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/course/create-course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    topic: newStudyDetails.topic,
                    category: newStudyDetails.category,
                    level: newStudyDetails.level,
                    createdBy:userDetails._id,
                    courseId:uuid()
                })
            })
            const status = res.status;
            res = await res.json();
            if (status == 201) {
                setToast({
                    message: res?.message,
                    type: 'success',
                    position: 'top-right'
                });
                window.location.href="/dashboard";
            }
            else {
                setToast({ message: res?.error, type: 'error', position: 'top-right' })
                //  window.location.href="/dashboard";
            }
        }catch(err){
            console.error(err)
            setToast({ message: 'Something went wrong', type: 'error', position: 'top-right' })
            // window.location.href="/dashboard";
        }
        setIsCreating(false)
    }

    const hideToast = () => {
        setToast(null);
    };

  return (
    <div className=' flex items-center w-full mt-10 justify-center flex-col px-8 lg:px-32 text-center md:px-16 '>
        {toast && (
                <Toast onClose={hideToast} message={toast.message} position={toast.position as any} type={toast.type as any} />
            )
            }
        <h1 className=' text-3xl font-bold text-blue-600'>Start Building Your Personal Study Materials</h1>
        <p className=' text-gray-500 text-sm'>Find all details in order to generate study materials for your next project</p>

        {
            selectedOptions === 1 && (<SelectOption changeForCategory={changeForCategory} />)
        }
        {
            selectedOptions === 2 && (<TopicRelated changeForLevel={changeForLevel} changeForTopic={changeForTopic} />)
        }

        <div className=' w-2/3 mt-5 justify-between flex items-end  mb-4'>
            {selectedOptions !==1 ? (<button onClick={()=>{
                setSelectOptions((prev)=>{
                    return prev - 1
                })
            }} className=' border-gray-600 border rounded-lg p-2 px-8'>Previous</button>):(null)}
            {
                selectedOptions==1 ? (<button onClick={()=>{
                    setSelectOptions((prev)=>{
                        return prev + 1
                    })
                }} className=' bg-blue-500 p-2 rounded-lg px-8 text-white flex items-end justify-end'>Next</button>) : (<button disabled={iscreating} onClick={createCourse} className=' bg-blue-500 p-2 rounded-lg px-8 disabled:bg-slate-800 disabled:cursor-not-allowed text-white flex items-end justify-end' >
                    {
                        iscreating ? (<RiLoader5Fill className=' animate-spin h-6 w-6' /> ) : "Generate"
                    }
                </button>)
            }
        </div>
        
    </div>
  )
}

export default CreateNewCourse