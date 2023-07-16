import React, { useEffect, useState } from 'react'
import Widget from './Widget'
import Navbar from './Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Token from '../helpers/Token';
import { tokenSlice, updateToken0, updateToken0Count, updateToken1, updateToken1Count } from '../state/slices/tokens';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { updateLoading } from '../state/slices/loading';
import Spinner from '../helpers/Spinner';

export default function Home(props) {
    const dispatch = useDispatch();
    let { token0, token1 } = useSelector((state) => state.tokens);
    let loading = useSelector((state) => state.loading);
    const { tokenList, chainId, contract, account, signer, quoter, provider } = props;
    const [tokenListDisplay, setTokenListDisplay] = useState({ visible: false, token: 0 });
    const [filteredTokens, setFilteredTokens] = useState(tokenList);
    const [quote, setQuote] = useState(null);

    const updateTokenFunc = (tokenNum, data, count) => {
        if (tokenNum === 0)
            dispatch(updateToken0({
                data, count
            }));
        else
            dispatch(updateToken1({
                data, count
            }))
    }

    useEffect(() => {
        updateTokenFunc(0, tokenList[0], 0);
        updateTokenFunc(1, tokenList[2], 0);

        const filterTokens = () => {
            let newList = tokenList.filter((item) => {
                return (item.chainId === chainId)
            });
            setFilteredTokens(newList);
            console.log(newList, "chaidID: ", chainId);
            updateTokenFunc(0, newList[0], 0);
            updateTokenFunc(1, newList[1], 0);
        }
        chainId && filterTokens();
    }, [tokenList, chainId]);

    const handleTokenSelect = (token, data) => {
        updateTokenFunc(token, data, 0);
        setTokenListDisplay({ visible: false, token: 0 });
    }

    const handleQuote = async (first, second) => {
        dispatch(updateLoading(true));
        let data = await quoter.callStatic.quoteExactInputSingle(first.data.address, second.data.address, 3000, ethers.utils.parseEther(first.count), 0);

        if (first === token0)
            dispatch(updateToken1Count(parseFloat(ethers.utils.formatUnits(data)).toFixed(2)));
        else
            dispatch(updateToken0Count(parseFloat(ethers.utils.formatUnits(data)).toFixed(2)));

        dispatch(updateLoading(false));
    }

    const handleSwap = async () => {
        console.log("clicked");

        // await contract.swapLINKForWETH(10, {
        //     gasLimit: ethers.utils.hexlify(1000000)
        // }).then((res) => {
        //     console.log("res: ", res);
        // }).catch((err) => {
        //     console.log("error: ", err);
        // })

        let res = await contract.approve(account, ethers.utils.parseEther('1'));
        // console.log(token0, token1);
        console.log("res: ", res);

        // await signer.sendTransaction({
        //     to: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
        //     gasLimit: 200000,
        //     value: ethers.utils.parseEther('0.00001')._hex
        // })
        //     .then((res) => console.log("res: ", res))
        //     .catch((err) => console.log("err: ", err));

    }

    const handleValueChange = async (e, token) => {
        if (token === 0) {
            dispatch(updateToken0Count(e.target.value));
            if (token1.count !== 0)
                dispatch(updateToken1Count(0));
        }
        else {
            dispatch(updateToken1Count(e.target.value));
            if (token0.count !== 0)
                dispatch(updateToken0Count(0));
        }
    }


    return (
        <>
            <div className='flex justify-center items-center bg-red-800 mt-[15vh] flex-col'>
                <div className='bg-red-300 max-w-xl rounded-lg px-4 py-2'>
                    <p>SWAP Token</p>

                    <div className=''>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                                {token0?.data?.symbol === "UNI" || token0?.data?.symbol === "WETH" ? <Token tokenName={token0.data.symbol} /> : <img className='h-6' src={token0.data ? token0.data.logoURI : ""} alt="logo" />}
                            </div>
                            {!token1.count || token0.count ? (<input onChange={(e) => handleValueChange(e, 0)} value={token0?.count > 0 ? token0?.count : ""} type="text" name="price" id="price" className="block w-full px-6 py-4 pr-12 border-t border-b border-l border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 text-lg" placeholder="0.00" />)
                                : (<div className='bg-white block w-full px-6 py-4 pr-12 border-t border-b border-l border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 text-lg'>
                                    {loading.value ? <Spinner height={28} width={28} /> : (<button className='bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-92 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg text-sm py-1 px-2' onClick={() => {
                                        handleQuote(token1, token0);
                                    }}>Get Qoute</button>)}
                                </div>)
                            }
                            <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                <button onClick={() => setTokenListDisplay({ visible: true, token: 0 })} type="button" className="py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                                    {token0.data ? token0.data.symbol : ""}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                                {token1?.data?.symbol === "UNI" || token1?.data?.symbol === "WETH" ? <Token tokenName={token1.data.symbol} /> : <img className='h-6' src={token1.data ? token1.data.logoURI : "#"} alt="logo" />}
                            </div>
                            {!token0.count || token1.count ? (<input onChange={(e) => handleValueChange(e, 1)} value={token1?.count > 0 ? token1?.count : ""} type="text" name="price" id="price" className="block w-full px-6 py-4 pr-12 border-t border-b border-l border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 text-lg" placeholder="0.00" />) : (
                                <div className='bg-white block w-full px-6 py-4 pr-12 border-t border-b border-l border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 text-lg'>
                                    {loading.value ? <Spinner height={28} width={28} /> : (<button className='bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-92 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg text-sm py-1 px-2' onClick={() => {
                                        handleQuote(token0, token1);
                                    }}>Get Qoute</button>)}
                                </div>
                            )}
                            <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                <button onClick={() => setTokenListDisplay({ visible: true, token: 1 })} type="button" className="py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                                    {token1.data ? token1.data.symbol : ""}
                                </button>
                            </div>
                        </div>
                    </div>
                    {quote && <div className='bg-red-100 text-start text-sm py-2 px-1 my-1 rounded-xl'>
                        {`1 WETH = ${quote} UNI`}
                    </div>}

                    <button type="button" onClick={handleSwap} className="py-2 px-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-92 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Swap
                    </button>

                </div>

                {tokenListDisplay.visible && (<div className="fixed top-0 w-full h-full">
                    <div className='bg-[#F1FFEB] w-screen h-screen absolute opacity-50'>
                    </div>
                    <div className="text-xs md:text-base inset-0 z-10 w-full max-w-80 md:max-w-96 h-screen overflow-y-auto flex justify-center items-center z-10 absolute border-2">
                        <div>
                            <div className="container flex flex-col justify-center w-full mx-auto bg-red-200 rounded-lg shadow dark:bg-gray-800">
                                <ul className="flex flex-col divide-y divide max-h-80 h-fit overflow-scroll">
                                    {filteredTokens.map((token, index) => {
                                        return (<>
                                            <li key={index} onClick={() => handleTokenSelect(tokenListDisplay.token, token)} className="cursor-pointer flex flex-row">
                                                <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                                                    <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                                                        <a className="relative block">
                                                            {(token.symbol === "UNI" || token.symbol === "WETH") ? <Token tokenName={token.symbol} /> : <img alt="coin" src={token.logoURI} className="mx-auto object-cover rounded-full h-10 w-10 " />}
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
                                        </>)
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>)}

            </div>
        </>
    )
}
