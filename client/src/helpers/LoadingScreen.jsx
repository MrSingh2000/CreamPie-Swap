import React from 'react'
import { BsPatchCheck, BsFillPatchCheckFill } from 'react-icons/bs';
import {BiCheckCircle} from 'react-icons/bi';

function LoadingScreen({ message }) {
    const tempMessage = {
        message: "Waiting for transaction to confirm",
        hash: "0x89282928292892829829828928292",
        success: null
    }
    return (
        <div className='w-full h-full fixed top-0 left-0'>
            <div className='bg-[#DBDFD9] w-screen h-screen absolute opacity-50'>
            </div>
            <div className="text-xs md:text-base inset-0 z-10 w-full max-w-80 md:max-w-96 h-screen overflow-y-auto flex flex-col justify-center items-center z-10 absolute border-2">
                <div>
                    <div className="p-4 container flex flex-col justify-center items-center border-2 border-[#FF8800] w-full mx-auto bg-white rounded-lg shadow-xl dark:bg-gray-800">
                        {message.success === 1 ? (
                            <BiCheckCircle size={48} color='#46E112'/>
                        ) : (<div className='loader'></div>)}
                        <div className='font-sans text-xl font-semibold mt-6'>
                            {message.message}
                        </div>
                        {message.hash && <div className='font-sans text-sm py-2'>
                            <span className='font-semibold'>Transaction Hash:</span> <span className='font-mono'>{message.hash}</span>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen