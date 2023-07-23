import { useEffect, useState } from 'react'
import Modal from './Modal';
import { convertToInternationalCurrencySystem, sendRequest } from '../helpers';

export default function Tokens(props) {
    const { loader, setLoader } = props;

    const [tokens, setTokens] = useState([{
        id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        name: "Wrapped Ether",
        volumeUSD: "787594457935.751680289829328998934",
        symbol: "WETH",
        totalValueLockedUSD: "1134596748.731921096906403179699527"
    },
    {
        id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        name: "Wrapped Ether",
        volumeUSD: "787594457935.751680289829328998934",
        symbol: "WETH",
        totalValueLockedUSD: "1134596748.731921096906403179699527"
    },
    {
        id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        name: "Wrapped Ether",
        volumeUSD: "787594457935.751680289829328998934",
        symbol: "WETH",
        totalValueLockedUSD: "1134596748.731921096906403179699527"
    },
    {
        id: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        name: "Wrapped Ether",
        volumeUSD: "787594457935.751680289829328998934",
        symbol: "WETH",
        totalValueLockedUSD: "1134596748.731921096906403179699527"
    }]);
    const [pools, setPools] = useState([
        {
            token0: {
                name: "USD Coin",
                symbol: "USDC"
            },
            token1: {
                name: "Wrapped Ether",
                symbol: "WETH"
            },
            liquidity: "23245663630218564096",
            volumeUSD: "379355311408.9848807162494397214139",
            id: "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640"
        },
        {
            token0: {
                name: "USD Coin",
                symbol: "USDC"
            },
            token1: {
                name: "Wrapped Ether",
                symbol: "WETH"
            },
            liquidity: "6724112927316819006",
            volumeUSD: "70631765418.74382847133483493636906",
            id: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"
        },
    ]);

    useEffect(() => {
        const tokenQuery = `query toptokens {
            tokens(first: 20, orderBy: volumeUSD, orderDirection: desc) {
              id
              name
              symbol
              volumeUSD
              totalValueLockedUSD
            }
          }`;
        const poolQuery = `query toppools {
                pools(
                  orderBy: totalValueLockedUSD
                  orderDirection: desc
                  first: 20
                  skip: 4
                  where: {
                      id_not: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"
                  }
                  subgraphError: allow
                ) {
                  token0 {
                    name
                    symbol
                  }
                  token1 {
                    name
                    symbol
                  }
                  totalValueLockedUSD
                  volumeUSD
                  token1Price
                  token0Price
                  id
                }
              }`;

        setLoader(true);

        const getData = () => {
            // for tokens
            setLoader(true);
            sendRequest(tokenQuery)
                .then((res) => {
                    setTokens(res.data.data.tokens);
                })
                .catch((err) => {
                    console.log(err);
                });
            sendRequest(poolQuery)
                .then((res) => {
                    setPools(res.data.data.pools);
                    setLoader(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoader(false);
                });
        }

        getData();

    }, []);

    const [modal, setModal] = useState({ visible: false, value: null });
    const handlePoolClick = (poolId) => {
        setModal({visible: true, value: null});
        const query = `query pooldata {
            pool(id: "${poolId}") {
              token0Price
              token1Price
              token0 {
                name
                symbol
              }
              token1 {
                name
                symbol
                totalValueLockedUSD
              }
              volumeToken0
              volumeToken1
              totalValueLockedToken0
              totalValueLockedToken1
            }
          }`
        sendRequest(query)
        .then((res) => {
            setModal({visible: true, value: res.data.data.pool});
        })
    }


    // const [query, setQuery] = useState(``);


    return (
        <>
            <div className='md:pt-0 pt-16'>
                <div className="container max-w-full px-4 mx-auto sm:px-8">
                    <div className=" flex justify-center items-center lg:justify-around flex-col lg:flex-row text-white">
                        {/* TOKENS */}
                        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8 w-full lg:w-[31rem] xl:w-[35rem]">
                            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow ">
                                <p className='text-xl text-left font-semibold pb-2 font-mono'>Available Tokens</p>
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="rounded-tl-xl bg-[#960FDF] text-white px-5 py-3 text-sm font-semibold text-lg text-center uppercase border-b border-gray-200">
                                                #
                                            </th>
                                            <th scope="col" className="bg-[#960FDF] text-white px-5 py-3 text-sm font-semibold text-lg text-center uppercase border-b border-gray-200">
                                                Token
                                            </th>
                                            <th scope="col" className="bg-[#960FDF] text-white px-5 py-3 text-sm font-semibold text-lg text-center uppercase border-b border-gray-200">
                                                TVL
                                            </th>
                                            <th scope="col" className="rounded-tr-xl bg-[#960FDF] text-white px-5 py-3 text-sm font-semibold text-lg text-center uppercase border-b border-gray-200">
                                                Volume
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className='w-full h-[28rem] overflow-x-scroll'>
                                    <table className="min-w-full leading-normal">
                                        <tbody className='w-full'>
                                            {loader ? (<>
                                                <div className='w-full bg-white p-2 '>
                                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                                    </div>
                                                </div>
                                                <div className='w-full bg-white p-2 '>
                                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                                    </div>
                                                </div>
                                                <div className='w-full bg-white p-2 '>
                                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                                    </div>
                                                </div>
                                                <div className='w-full bg-white p-2 '>
                                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                                    </div>
                                                </div>
                                                <div className='w-full bg-white p-2 '>
                                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                                    </div>
                                                </div>
                                                <div className='w-full bg-white p-2 '>
                                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                                    </div>
                                                </div>

                                            </>) : tokens.map((token, index) => {
                                                const tvl = convertToInternationalCurrencySystem(token.totalValueLockedUSD);
                                                const vl = convertToInternationalCurrencySystem(token.volumeUSD);

                                                return (
                                                    <><tr key={index}>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <div className="flex justify-center items-center">
                                                                <div className=''>
                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                        {index + 1}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className=" text-sm bg-white border-b border-gray-200 cursor-pointer">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {token.name}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {tvl}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                                                <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                                                </span>
                                                                <span className="relative">
                                                                    {vl}
                                                                </span>
                                                            </span>
                                                        </td>
                                                    </tr></>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* POOLS */}
                        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8 w-full lg:w-[31rem] xl:w-[35rem]">
                            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                                <p className='text-xl text-left font-semibold pb-2 font-mono'>Available Pools</p>
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="rounded-tl-xl bg-[#960FDF] text-white px-5 py-3 text-sm font-semibold text-lg text-center uppercase border-b border-gray-200">
                                                #
                                            </th>
                                            <th scope="col" className="bg-[#960FDF] text-white px-5 py-3 text-sm font-semibold text-lg text-center uppercase border-b border-gray-200">
                                                Pool
                                            </th>
                                            <th scope="col" className="rounded-tr-xl bg-[#960FDF] text-white px-5 py-3 text-sm font-semibold text-lg text-center uppercase border-b border-gray-200">
                                                Volume
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className='w-full max-h-[28rem] h-fit overflow-x-scroll'>
                                    <table className="min-w-full leading-normal">

                                        <tbody>
                                            {loader ? (<>
                                                <div className='w-full bg-white p-2 '>
                                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                                    </div>
                                                </div>
                                                <div className='w-full bg-white p-2 '>
                                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                                    </div>
                                                </div>
                                                <div className='w-full bg-white p-2 '>
                                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                                    </div>
                                                </div>
                                                <div className='w-full bg-white p-2 '>
                                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                                    </div>
                                                </div>
                                                <div className='w-full bg-white p-2 '>
                                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                                    </div>
                                                </div>
                                                <div className='w-full bg-white p-2 '>
                                                    <div className='w-full bg-gray-200 animate-pulse h-14 rounded-2xl'>
                                                    </div>
                                                </div>

                                            </>) : pools.map((pool, index) => {
                                                const vl = convertToInternationalCurrencySystem(pool.volumeUSD);

                                                return (
                                                    <><tr key={index}>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <div className="flex justify-center items-center">
                                                                <div className=''>
                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                        {index + 1}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td onClick={() => handlePoolClick(pool.id)} className=" text-sm bg-white border-b border-gray-200 cursor-pointer">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {pool.token0.symbol}/{pool.token1.symbol}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                                                <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                                                </span>
                                                                <span className="relative">
                                                                    {vl}
                                                                </span>
                                                            </span>
                                                        </td>
                                                    </tr></>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='absolute'> */}
                {modal.visible && <Modal data={modal.value} setModal={setModal} />}
                {/* </div> */}
            </div >

        </>
    )
}
