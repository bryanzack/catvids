'use client';
import "@/app/globals.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import Videos from "./components/Video";
import CustomizedDialogs from "./components/Dialog";
import { useAtom } from "jotai";
import { dialogAtom } from "./state/atoms";

export default function Home() {
  const [dialog, setDialog] = useAtom(dialogAtom);
  const { data: session } = useSession();
  const [tab, setTab] = useState('videos') 
  const { openFilePicker, filesContent, plainFiles, loading } = useFilePicker({
    accept: '.mp4',
    onFilesSuccessfullySelected: ({ filesContent, plainFiles}: {filesContent: any, plainFiles: File[]}) => {
      console.log('onFilesSucess: ', filesContent);
    },
    onFilesSelected: () => {
      setDialog(true);
    },
    onFilesRejected: ({ errors }) => {

    }
  });
  
  if (session) {
    return (
      <>
        {dialog && <CustomizedDialogs files={plainFiles} /> }
        <div className={`w-screen h-screen flex items-center justify-center`}>
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
                  <div className='mx-2 px-2 cursor-pointer hover:underline'
                    onClick={() => openFilePicker()}>upload</div>
                </div>
              </div>
              {tab === 'videos' && <p>Videos</p>}
              {tab === 'friends' && <p>Friends</p>}
              {tab === 'activity' && <p>Activity</p>}
            </div>
            <div className="w-full h-[5%] border-t border-black bg-black flex flex-row items-center justify-between text-white px-3">
              <h2>{session.user?.name}</h2>
              <h2 onClick={() => signOut()} className={'px-2 hover:underline cursor-pointer'}>logout</h2>
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
