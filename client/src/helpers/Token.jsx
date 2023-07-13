import React from 'react'

export default function Token(props) {
    const { tokenName } = props;


    return (
        <div className='border-2 rounded-full text-xs w-[25px] h-[25px] break-words flex justify-center items-center'>
            {tokenName.length > 3 ? tokenName.substring(0,2) : tokenName}
        </div>
    )
}
