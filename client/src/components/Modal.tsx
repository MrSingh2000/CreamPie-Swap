import React from 'react'
import { convertToInternationalCurrencySystem } from '../helpers';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function Modal(props) {
    const { data, setModal } = props;

    const skeleton = 'w-full bg-gray-200 animate-pulse h-14 rounded-2xl';

    // const value = {
    //     token0: {
    //         name: "USD Coin",
    //         symbol: "USDC"
    //     },
    //     token1: {
    //         name: "Wrapped Ether",
    //         symbol: "WETH"
    //     },
    //     totalValueLockedUSD: "449137585.3772377716909849441922386",
    //     volumeUSD: "379649709068.0163823731227871662818",
    //     token1Price: "0.0005733042912929200087102250569841093",
    //     token0Price: "1744.274402245956897784830465889805",
    //     id: "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640"
    // };

    const value = data;

    // const loading = true;

    return !value ? (
        <>
            <div className="fixed top-0 w-full h-full">
                <div className='bg-[#F1FFEB] w-screen h-screen absolute opacity-50'>
                </div>
                <div className="inset-0 z-10 w-full h-screen overflow-y-auto flex justify-center items-center z-10 absolute border-2">
                    <div className="w-96 p-4 bg-white shadow-lg rounded-2xl">
                        <div className='flex justify-end mb-[2px] cursor-pointer'>
                            <AiFillCloseCircle color='black' />
                        </div>
                        <div className='bg-red-200 rounded-lg p-2 mb-2'>
                            <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                            </div>
                        </div>
                        <div className='flex jutify-center items-center'>
                            <div className='border-r-2 p-4'>
                                <div className='w-36 bg-gray-200 animate-pulse h-10 rounded-2xl'></div>
                                <div className='py-2 text-left'>
                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                    </div>
                                </div>
                            </div>
                            <div className='p-4 border-l-2'>
                                <div className='w-36 bg-gray-200 animate-pulse h-10 rounded-2xl'></div>
                                <div className='py-2 text-left'>
                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>
            <div className="fixed top-0 w-full h-full">
                <div className='bg-[#F1FFEB] w-screen h-screen absolute opacity-50'>
                </div>
                <div className="inset-0 z-10 w-full h-screen overflow-y-auto flex justify-center items-center z-10 absolute border-2">
                    <div className="w-96 p-4 bg-white shadow-lg rounded-2xl">
                        <div className='flex justify-end mb-[2px] cursor-pointer' onClick={() => setModal({visible: false, value: null})}>
                            <AiFillCloseCircle color='black' />
                        </div>
                        <div className='bg-red-200 rounded-lg p-2 mb-2'>
                            <div className='text-left'>
                                <p><span className='font-semibold italic text-sm'>POOL: </span> {value.token0.symbol}<span className='font-bold text-xl'>/</span>{value.token1.symbol}</p>
                            </div>
                            <div className='text-left'>
                                <p><span className='font-semibold italic text-sm'>TVL: </span> {convertToInternationalCurrencySystem(value.totalValueLockedUSD)}</p>
                            </div>
                        </div>
                        <div className='flex jutify-center items-center'>
                            <div className='border-r-2 p-4'>
                                <p className='bg-red-200 rounded-lg p-2 text-sm'>{value.token0.name} ({value.token0.symbol})</p>
                                <div className='py-2 text-left'>
                                    <p><span className='font-semibold italic text-sm'>Price: </span> {convertToInternationalCurrencySystem(value.token0Price)}</p>
                                    <p><span className='font-semibold italic text-sm'>TVL: </span> {convertToInternationalCurrencySystem(value.totalValueLockedToken0)}</p>
                                </div>
                            </div>
                            <div className='p-4 border-l-2'>
                                <p className='bg-red-200 rounded-lg p-2 text-sm'>{value.token0.name} ({value.token0.symbol})</p>
                                <div className='py-2 text-left'>
                                    <p><span className='font-semibold italic text-sm'>Price: </span> {convertToInternationalCurrencySystem(value.token0Price)}</p>
                                    <p><span className='font-semibold italic text-sm'>TVL: </span> {convertToInternationalCurrencySystem(value.totalValueLockedToken0)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

};