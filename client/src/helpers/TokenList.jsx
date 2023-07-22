import React from 'react';
import { AiOutlineCloseSquare } from 'react-icons/ai';

function TokenItem({ token, handleTokenSelect }) {
    return (
        <li onClick={() => handleTokenSelect(token)} className="cursor-pointer flex flex-row">
            <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                    <a className="relative block">
                        <img alt="coin" src={token.logoURI} loading='lazy' className="mx-auto object-cover rounded-full h-10 w-10 " />
                    </a>
                </div>
                <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium dark:text-white">
                        {token.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-200">
                        {token.symbol}
                    </div>
                </div>
            </div>
        </li>
    );
}

function TokenList(props) {
    const { tokens, handleTokenSelect, setTokenListDisplay } = props;

    return (
        <div className="fixed top-0 w-full h-full">
            <div className='bg-[#DBDFD9] w-screen h-screen absolute opacity-50'>
            </div>
            <div className="text-xs md:text-base inset-0 z-10 w-full max-w-80 md:max-w-96 h-screen overflow-y-auto flex flex-col justify-center items-center z-10 absolute border-2">
                <div>
                    <div className="container flex flex-col justify-center w-full mx-auto bg-red-200 rounded-lg shadow dark:bg-gray-800">
                        <div className='bg-yellow-200 w-full rounded-t-lg flex justify-end p-1'>
                            <AiOutlineCloseSquare className='cursor-pointer' onClick={() => {
                                setTokenListDisplay(false);
                            }} />
                        </div>
                        <ul className="hide-scrollbar flex flex-col divide-y divide max-h-80 h-fit overflow-scroll">
                            {tokens.map((token, index) => (
                                <React.Fragment key={index}>
                                    <TokenItem token={token} handleTokenSelect={handleTokenSelect} />
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(TokenList);