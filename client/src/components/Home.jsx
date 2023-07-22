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
import TokenList from '../helpers/TokenList';
import LoadingScreen from '../helpers/LoadingScreen';
import { useRef } from 'react';

export default function Home(props) {
    const dispatch = useDispatch();
    let { token0, token1 } = useSelector((state) => state.tokens);
    let loading = useSelector((state) => state.loading);
    const [gettingQuote, setGettingQuote] = useState(false);

    // TODO: set custom message for ongoing transaction
    const [customMessage, setCustomMessage] = useState({
        message: "",
        hash: "",
        success: null
    })

    const { tokenList, chainId, contract, account, signer, quoter, provider, sepoliaList } = props;

    const [tokenListDisplay, setTokenListDisplay] = useState(false);
    const [tokenNumDisplayed, setTokenNumDisplayed] = useState(0)

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
            }));
    }

    useEffect(() => {
        updateTokenFunc(0, tokenList[0], 0);
        updateTokenFunc(1, tokenList[2], 0);

        const filterTokens = () => {
            let newList;
            if (chainId === 11155111) {
                newList = sepoliaList;
            }
            else {
                newList = tokenList.filter((item) => {
                    return (item.chainId === chainId)
                });
            }
            setFilteredTokens(newList);
            updateTokenFunc(0, newList[0], 0);
            updateTokenFunc(1, newList[1], 0);
            console.log(newList);
        }
        chainId && filterTokens();
    }, [tokenList, chainId]);

    const handleTokenSelect = (tokenData) => {
        updateTokenFunc(tokenNumDisplayed, tokenData, 0);
        setTokenListDisplay(false);
    }

    const handleQuote = async (first, second) => {
        console.log("first: ", first, " Second: ", second);
        setGettingQuote(true);
        dispatch(updateLoading(true));
        let data = await quoter.callStatic.quoteExactInputSingle(first.data.address, second.data.address, 3000, ethers.utils.parseEther(first.count), 0);
        console.log("data: ", ethers.utils.formatUnits(data));

        if (first === token0)
            dispatch(updateToken1Count(parseFloat(ethers.utils.formatUnits(data)).toFixed(4)));
        else
            dispatch(updateToken0Count(parseFloat(ethers.utils.formatUnits(data)).toFixed(4)));

        console.log(ethers.utils.formatUnits(data));
        console.log(parseFloat(ethers.utils.formatUnits(data)));
        console.log(parseFloat(first.count));
        console.log(parseFloat(first.count) / (parseFloat(ethers.utils.formatUnits(data))));

        setQuote(({
            value: (parseFloat(first.count) / (parseFloat(ethers.utils.formatUnits(data)).toFixed(4))).toFixed(4),
            token0: first,
            token1: second
        }));

        dispatch(updateLoading(false));
        setGettingQuote(false);
    }

    const getTransactionLog = async (hash, trial = 1) => {
        const receipt = await provider.getTransactionReceipt('0xa5f2123ff5fde19d3ca925405046e6f59e3dcdf421d43ad9852f835718b8cb39');
        console.log(receipt);
        if (trial === 10)
            console.log("Transaction Failed");
        if (receipt.status === 1)
            console.log("Transaction Success");
        else {
            console.log("Trial: ", trial);
            trial += 1;
        }
    }

    const handleSwap = async () => {
        try {
            dispatch(updateLoading(true));
            const ERC20abi = [
                {
                    "constant": true,
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_spender",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_from",
                            "type": "address"
                        },
                        {
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "decimals",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint8"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_owner",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "name": "balance",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "name": "_spender",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "payable": true,
                    "stateMutability": "payable",
                    "type": "fallback"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                }
            ]
            // establish connection with the ERC20 token contract of the token being swapped
            const ERC20TokenContract = new ethers.Contract(token0.data.address, ERC20abi, signer);

            // the contract address which needs approval to spend tokens
            const targetAllowanceContract = import.meta.env.VITE_CONTRACT_ADDRESS;

            // approval of spending tokens from the account of the spender, approval request sent to ERC20 token
            const maxApproval = ethers.BigNumber.from(2).pow(256).sub(1);

            setCustomMessage({
                message: "Waiting for token allowance",
                hash: null,
                success: null
            })

            dispatch(updateLoading(true));
            await ERC20TokenContract.approve(targetAllowanceContract, maxApproval, {
                gasLimit: 2000000
            }).then(async (txn) => {
                console.log("approval: ", txn);
                let result = await contract.swapExactInputSingle(ethers.utils.parseEther((token0.count).toString()), token0.data.address, token1.data.address, {
                    gasLimit: ethers.utils.hexlify(2000000)
                })
                console.log('Transaction successful:', result);
                // const reciept = await getTransactionLog(result.hash);
                // console.log("reciept: ", reciept);
            }).catch((err) => {
                console.log("Error while approval: ", err);
            });

            dispatch(updateLoading(false));

            // const reciept = await ethers.c
            // const transaction = await provider.sendTra(txn.hash);
            // console.log("txn: ", transaction);
        } catch (error) {
            console.error('Transaction failed:', error.message);
        }
    }

    const handleValueChange = async (e, token) => {
        console.log(typeof e.target.value)
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
            <div className='flex justify-center items-center mt-[15vh] flex-col '>
                <div className='bg-[#232323] border-2 border-[#111111] max-w-xl rounded-lg px-4 py-2 custom-shadow'>
                    <p className='text-white py-2 font-semibold font-sans'>SWAP Token</p>

                    <div className=''>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                                {token0?.data?.symbol === "UNI" || token0?.data?.symbol === "WETH" || token0?.data?.symbol === "ETH" ? <Token tokenName={token0.data.symbol} /> : <img className='h-6' src={token0.data ? token0.data.logoURI : ""} alt="logo" />}
                            </div>
                            {!token1.count || token0.count ? (<input onChange={(e) => handleValueChange(e, 0)} value={token0?.count >= 0 ? token0?.count : ""} type="text" name="price" id="price" className="block w-full px-6 py-4 pr-12 border-t border-b border-l border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 text-lg" placeholder="0.00" />)
                                : (<div className='bg-white block w-full px-6 py-4 pr-12 border-t border-b border-l border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 text-lg'>
                                    {loading.value ? <Spinner height={28} width={28} /> : (<button className='bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-92 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg text-sm py-1 px-2' onClick={() => {
                                        handleQuote(token1, token0);
                                    }}>Get Quote</button>)}
                                </div>)
                            }
                            <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                <button onClick={() => {
                                    setTokenListDisplay(true);
                                    setTokenNumDisplayed(0);
                                }} type="button" className="py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                                    {token0.data ? token0.data.symbol : ""}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                                {token1?.data?.symbol === "UNI" || token1?.data?.symbol === "WETH" || token0?.data?.symbol === "ETH" ? <Token tokenName={token1.data.symbol} /> : <img className='h-6' src={token1.data ? token1.data.logoURI : "#"} alt="logo" />}
                            </div>
                            {!token0.count || token1.count ? (<input onChange={(e) => handleValueChange(e, 1)} value={token1?.count >= 0 ? token1?.count : ""} type="text" name="price" id="price" className="block w-full px-6 py-4 pr-12 border-t border-b border-l border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 text-lg" placeholder="0.00" />) : (
                                <div className='bg-white block w-full px-6 py-4 pr-12 border-t border-b border-l border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 pl-7 text-lg'>
                                    {loading.value ? <Spinner height={28} width={28} /> : (<button className='bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-92 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg text-sm py-1 px-2' onClick={() => {
                                        handleQuote(token0, token1);
                                    }}>Get Qoute</button>)}
                                </div>
                            )}
                            <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                <button onClick={() => {
                                    setTokenListDisplay(true);
                                    setTokenNumDisplayed(1);
                                }} type="button" className="py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full">
                                    {token1.data ? token1.data.symbol : ""}
                                </button>
                            </div>
                        </div>
                    </div>
                    {quote && <div className='bg-[#7a7a7a] text-white font-mono text-start text-sm py-2 px-1 my-1 rounded-xl'>
                        {`1 ${quote.token1.data.symbol} = ${quote.value} ${quote.token0.data.symbol}`}
                    </div>}

                    <button type="button" onClick={handleSwap} className="py-2 px-4 mt-4 bg-[#000000] hover:bg-[#111111] focus:ring-indigo-500 focus:ring-offset-[#111111] text-white w-92 transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg font-sans custom-white-shadow">
                        Swap
                    </button>

                    {/* <button type="button" onClick={getLog} className="py-2 px-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-92 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Status
                    </button> */}

                </div>

                {
                    tokenListDisplay ? (<TokenList tokens={filteredTokens} setTokenListDisplay={setTokenListDisplay} handleTokenSelect={handleTokenSelect} />) : null
                }

                {
                    loading.value && !gettingQuote ? <LoadingScreen message={customMessage} /> : null
                }

            </div>
        </>
    )
}
