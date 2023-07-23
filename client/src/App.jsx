import { useEffect, useState } from 'react';
import './App.css'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Tokens from './components/Tokens';
import axios from 'axios';
import { ethers } from "ethers";
import SimpleSwap from "./artifacts/contracts/SimpleSwap.sol/SimpleSwap.json";
import QuoterV2 from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from './helpers';
import About from './components/About';

function App() {
  const [loader, setLoader] = useState(false);
  const [tokenList, setTokenList] = useState([]);

  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [quoter, setQuoter] = useState(null);

  // for goerli network best is optimism
  const tokenLists = {
    optimism: 'https://static.optimism.io/optimism.tokenlist.json',
    celo: 'https://celo-org.github.io/celo-token-list/celo.tokenlist.json',
    avalanche: 'https://tokens.coingecko.com/avalanche/all.json',
    polygon: 'https://tokens.coingecko.com/polygon-pos/all.json',
    gekoCelo: 'https://tokens.coingecko.com/celo/all.json',
    gekoOptimism: 'https://tokens.coingecko.com/optimistic-ethereum/all.json',
    arbitrum: 'https://tokens.coingecko.com/arbitrum-one/all.json',
    binance: 'https://tokens.coingecko.com/binance-smart-chain/all.json',
    uniswap: 'https://tokens.coingecko.com/uniswap/all.json',
    uniswap1: 'https://gateway.ipfs.io/ipns/tokens.uniswap.org',
    uniswapExtended: 'https://gateway.ipfs.io/ipns/extendedtokens.uniswap.org',
  }

  // there is no token list available for sepolia network at the time
  const sepoliaList = [
    {
      "chainId": 11155111,
      "address": "0x3C352eA32DFBb757CCdf4b457E52daF6eCC21917",
      "name": "Ether",
      "symbol": "ETH",
      "logoURI": "",
      decimals: 8,
    },
    {
      "chainId": 11155111,
      "address": "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
      "name": "Wraped Ether",
      "symbol": "WETH",
      "logoURI": "",
      "decimals": 8,
    },
    {
      "chainId": 11155111,
      "address": "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD",
      "name": "Uniswap",
      "symbol": "UNI",
      "logoURI": "",
      "decimals": 8,
    }
  ];

  useEffect(() => {

    const getTokenList = () => {
      axios({
        method: "GET",
        url: tokenLists.uniswapExtended
      }).then((res) => {
        setTokenList(res.data.tokens);
      }).catch((err) => {
        console.log(err);
      });
    }

    getTokenList();

    const connectWallet = async () => {
      let p;
      // get provider
      if (window.ethereum) {
        p = new ethers.providers.Web3Provider(window.ethereum)
      }
      else {
        showToast("MetaMask not installed")
        p = ethers.getDefaultProvider();
      }

      // get signer
      let s = await p.getSigner();
      setSigner(s);
      setProvider(p);
      // get account
      let a = await p.send("eth_requestAccounts", []);;
      setAccount(a[0]);
      // intialize contract
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
      const c = new ethers.Contract(contractAddress, SimpleSwap.abi, s);
      setContract(c);

      // set active chain ID
      const n = await p.getNetwork();
      setChainId(ethers.BigNumber.from(n.chainId).toNumber());

      // getting quoter
      const q = new ethers.Contract(import.meta.env.VITE_QUOTER_ADDRESS, QuoterV2.abi, s);
      setQuoter(q);
    }

    connectWallet();
  }, [])


  return (
    <>
      <Routes>
        <Route element={<Navbar />} path='/'>
          <Route index element={<Home quoter={quoter} provider={provider} tokenList={tokenList} chainId={chainId} contract={contract} account={account} signer={signer} sepoliaList={sepoliaList} />} />
          <Route path='tokens' element={<Tokens loader={loader} setLoader={setLoader} />} />
          <Route path='about' element={<About />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
