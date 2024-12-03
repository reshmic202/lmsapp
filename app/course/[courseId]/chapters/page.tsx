"use client"
import React, { useEffect, useState } from 'react'
import DOMPurify from 'isomorphic-dompurify';
import CurrentChapterNote from '@/app/component/CurrentChapter';


const page = ({ params }: { params: any }) => {

  const [allMaterials, setAllMaterials] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const getAllStudyMaterials = async () => {
    let res: any = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/notes/get-all-notes/${params.courseId}`);
    res = await res.json();
    setAllMaterials(res.notes);
  }

  useEffect(() => {

    getAllStudyMaterials();
  }, [])

  
  return (
    <div className=' lg:px-32 py-8 md:px-16 px-8 '>
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
          className={`w-20 bg-white rounded-md border border-slate-200 p-3 hover:bg-slate-100 transition ${currentPage === 0 && "hidden"}`}
          disabled={currentPage === 0} // Optional: Disable 'Prev' on the first page
        >
          Prev
        </button>
        <div className="flex gap-2 w-full">
  {allMaterials.length > 0 ? (
    allMaterials.map((item: any, index: number) => (
      <div
        key={index}
        className={`${
          index === currentPage ? "bg-blue-500" : "bg-slate-200"
        } w-full h-3 rounded-md`}
      ></div>
    ))
    
  ) : (
    <p className="text-gray-500">No materials available</p>
  )}
</div>

        <button
          onClick={() => {
            if(currentPage+1!==allMaterials.length){
              setCurrentPage((prev) => prev + 1);
            }
          }}
          disabled={currentPage+1===allMaterials.length}
          className={`w-20 bg-blue-400 text-white rounded-md border border-slate-200 p-3 hover:bg-blue-500 transition ${currentPage+1 === allMaterials?.length && "hidden"}`}
        >
          {currentPage+1===allMaterials.length?"Finish":"Next"}
        </button>
      </div>

      <CurrentChapterNote allMaterials={allMaterials} currentPage={currentPage}/>

    </div>
  )
}

export default page