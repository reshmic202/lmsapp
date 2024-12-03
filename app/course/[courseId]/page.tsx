"use client"
import ChaptersListCard from '@/app/component/ChaptersListCard'
import DashboardNav from '@/app/component/DashboardNav'
import StudyMaterial from '@/app/component/StudyMaterial'
import StudyMaterialCard from '@/app/component/StudyMaterialCard'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const dummyarr = [
    {
        name: "Notes/Chapters",
        icons: "/notes.png",
        dis: "Read notes to prepare it",
    },
    {
        name: "Flashcard",
        icons: "/flashcard.png",
        dis: "Flashcard to remeber the concepts",
    },
    {
        name: "Quiz",
        icons: "/quiz.png",
        dis: "Great way to test your knowledge",
    },
    {
        name: "Question/Answer",
        icons: "/qa.png",
        dis: "help to practice and learning",
    },
]

const SingleCourse = ({ params }: { params: Promise<{ courseId: string }> }) => {
    const [courseId, setCourseId] = useState<string | null>(null);
    const [course, setCourse] = useState<any>();

    useEffect(() => {
        const fetchParams = async () => {
            const resolvedParams = await params; // Await the promise
            setCourseId(resolvedParams.courseId); // Access `courseId`
        };

        fetchParams();
    }, [params]);

    const currentCourse = async () => {
        let res: any = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/course/get-single-course/${courseId}`);
        res = await res.json();
        setCourse(res.course);
    }

    useEffect(() => {
        if (courseId) {
            currentCourse();
        }
    }, [courseId]);

    return (
        <div>
            <section className=' bg-slate-100 flex flex-col gap-5  lg:px-32 min-h-screen px-8 md:px-16 py-8'>
                <div className=' shadow-lg flex items-center justify-center gap-3 rounded-md p-6 '>
                    <div>
                        <Image src={"/knowledge.png"} alt='know' height={200} width={200} />
                    </div>
                    <div>
                        <h1 className=' text-2xl font-bold'>{course?.title}</h1>
                        <h1 className=' text-sm'>{course?.summary}</h1>
                        <div className="w-full mt-3 bg-slate-900 rounded-full h-2 mb-2">
                            <div
                                className="h-2 bg-green-700 rounded-full"
                                style={{ width: `${0 * 20}%` }} // Assuming getTotal ranges from 0 to 5
                            />
                        </div>

                        <h1 className=' text-sm text-blue-500 font-semibold'>Total Chapters: {course?.chapters.length}</h1>
                    </div>
                </div>

                <StudyMaterial courseId={courseId}/>

                <ChaptersListCard courses={course?.chapters}/>
            </section>
        </div>
    )
}

export default SingleCourse