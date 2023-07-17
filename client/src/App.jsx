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

function App() {
  const [loader, setLoader] = useState(false);
  const [tokenList, setTokenList] = useState([]);

  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [quoter, setQuoter] = useState(null);

  useEffect(() => {

    const getTokenList = () => {
      axios({
        method: "GET",
        url: 'https://tokens.coingecko.com/uniswap/all.json'
      }).then((res) => {
        setTokenList(res.data.tokens);
      }).catch((err) => {
        console.log(err);
      });
    }

    getTokenList();

    const connectWallet = async () => {
      let p;
      console.log(window.ethereum)
      // get provider
      if (window.ethereum) {
        p = new ethers.providers.Web3Provider(window.ethereum)
      }
      else {
        console.log("MetaMask not installed; using read-only defaults")
        p = ethers.getDefaultProvider();
      }

      // get signer
      let s = await p.getSigner();
      setSigner(s);
      setProvider(p);
      // get account
      let a = await provider.send("eth_requestAccounts", []);;
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
    // getAssets();


  }, [])


  return (
    <>
      <Routes>
        <Route element={<Navbar />} path='/'>
          <Route index element={<Home quoter={quoter} provider={provider} tokenList={tokenList} chainId={chainId} contract={contract} account={account} signer={signer}/>} />
          <Route path='tokens' element={<Tokens loader={loader} setLoader={setLoader} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
