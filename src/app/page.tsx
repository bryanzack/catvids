'use client';
import { useRef } from "react";
import Image from "next/image";
import "@/app/globals.css"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react'
import VideoUpload from "./components/VideoUploader";

export default function Home() {

  const { data: session } = useSession();
  const [tab, setTab] = useState('videos')
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log('Selected file:', file);
      // Perform your file handling logic here
    }
  };
  
  if (session) {
    return (
      <>
        <div className='w-screen h-screen flex items-center justify-center'>
          <div className='w-[1000px] h-[750px] flex flex-col'>
            <div className='w-full h-[5%] border-b border-black flex items-center'>
            </div>
            <div className='w-full h-[90%] border-l border-r border-black'>
              <div className='w-full h-[5%] border border-black bg-black flex flex-row items-center justify-start text-white'>
                <div className='w-full h-full flex flex-row items-center justify-between'>
                  <div className='flex flex-row'>
                    <h2 onClick={() => setTab('videos')} className='px-2 cursor-pointer'>videos</h2>
                    <h2 onClick={() => setTab('friends')} className='px-2 cursor-pointer'>friends</h2>
                    <h2 onClick={() => setTab('activity')} className='px-2 cursor-pointer'>activity</h2>
                  </div> 
                  <VideoUpload />
                </div>
              </div>
              <p>{tab}</p>
            </div>
            <div className="w-full h-[5%] border-t border-black bg-black flex flex-row items-center justify-between text-white px-3">
              <h2>{session.user?.name}</h2>
              <h2 onClick={() => signOut()} className={'cursor-pointer'}>logout</h2>
            </div>
          </div>

        </div>
      </>
    )

  }

  return ( 
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 
        onClick={() => signIn('discord')}
        className={`font-barcode text-[60px] cursor-pointer`}>catvids.xyz</h1> 

    </div>
  );
}
