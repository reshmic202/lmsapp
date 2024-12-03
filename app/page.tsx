"use client"
import { useAppDispatch } from '@/store'
import { setValue } from '@/store/userslice';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const dispatch = useAppDispatch();
  const [tokens, setTOkens] = useState<string>()
  const [showNav, setShowNav] = useState<boolean>(false);

  const getUserInfo = async (token: any) => {
    let res: any = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/user/getUserDetailsWithToken/${token}`);
    if (res.status === 201) {
      res = await res.json();
      dispatch(setValue(res.user))
    }
  }

  useEffect(() => {
    const getToken = localStorage.getItem('token');
    console.log("Token: " + getToken);
    if (getToken) {
      setTOkens(getToken)
      getUserInfo(getToken)
      // window.location.href = "/dashboard"
    }
  }, [])



  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6 flex flex-col items-center">
      <nav className=" bg-slate-200 text-black shadow-md w-full">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className=' flex items-center justify-center'>
            <Image src={"/logo.jpg"} alt='logo' height={30} width={200} className=' cursor-pointer mix-blend-multiply' />
          </div>

          {/* Links */}
          <ul className="hidden md:flex items-center  space-x-6">
            <Link href="/home" className="block">Home</Link>
            <Link href="/about" className="block">About</Link>
            <Link href="/contact" className="block">Contact Us</Link>
            <Link href={tokens ? "/dashboard" : "/login"} className="block bg-white text-blue-600 py-2 px-4 rounded">
              {tokens ? "Dashboard" : "Login"}
            </Link>
          </ul>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button onClick={() => {
              setShowNav(true)
            }} id="menu-button" aria-label="Open menu">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        {
          showNav && (
            <div id="mobile-menu" className=" fixed text-2xl font-bold top-0 flex flex-col gap-10 items-center justify-center right-2 md:hidden bg-slate-900 min-h-screen w-full text-white space-y-4 p-4 duration-700 transition-all">
              <p onClick={() => {
              setShowNav(false)
            }} className=' fixed cursor-pointer top-3 text-red-500 right-10 '>X</p>
              <Link href="/home" className="block">Home</Link>
              <Link href="/about" className="block">About</Link>
              <Link href="/contact" className="block">Contact Us</Link>
              <Link href={tokens ? "/dashboard" : "/login"} className="block bg-white text-blue-600 py-2 px-4 rounded">
                {tokens ? "Dashboard" : "Login"}
              </Link>
            </div>
          )
        }
      </nav>


      <main className="w-full max-w-4xl mt-10 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Start Building Your Learning Journey
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Course Section */}
          <div className="p-6 bg-blue-100 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4">Create a Course</h3>
            <p className="text-center mb-4">
              Design and customize courses based on your needs. Add modules, content, and much more.
            </p>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
              Start Creating Course
            </button>
          </div>

          {/* Create Quiz Section */}
          <div className="p-6 bg-green-100 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4">Create a Quiz</h3>
            <p className="text-center mb-4">
              Make interactive quizzes to test knowledge and track progress effectively.
            </p>
            <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition">
              Start Creating Quiz
            </button>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-4 text-center w-full bg-gray-800 text-gray-200">
        <p>© {new Date().getFullYear()} Your LMS. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default Home