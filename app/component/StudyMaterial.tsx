import React, { useEffect, useState } from 'react'
import { dummyarr } from '../course/[courseId]/page'
import StudyMaterialCard from './StudyMaterialCard'

const StudyMaterial = ({courseId}:{courseId:any}) => {


  return (
    <div>
        <h1 className=' font-bold text-xl'>Study Materials</h1>
                <div className=' grid grid-cols-2 lg:grid-cols-4 gap-3'>
                    {
                        dummyarr.map((item, index) => {
                            return (
                                <StudyMaterialCard courseId={courseId} item={item} key={index} />
                            )
                        })
                    }
                </div>
    </div>
  )
}

export default StudyMaterial