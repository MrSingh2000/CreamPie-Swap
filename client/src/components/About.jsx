import React from 'react';
import pie from '../assets/pie.png';

const About = () => {

    return (
        <div className="bg-gradient-to-r from-blue-400 to-purple-600 py-8 px-4 sm:px-8 pt-20 md:pt-2">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className='flex justify-center flex-col items-center'>
                    <img src={pie} alt="logo" className='h-[14rem] w-[14rem]' />
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-10 -mt-10">Cream Pie Swap</h2>
                </div>
                <h1 className="text-4xl font-bold text-center mb-6">About Our DeFi App</h1>
                <p className="text-lg text-gray-800 leading-relaxed mb-6">
                    Welcome to our DeFi (Decentralized Finance) app, powered by the Uniswap protocol. We are committed to providing
                    a decentralized and secure platform for swapping tokens and participating in the growing
                    DeFi ecosystem.
                </p>
                <h2 className="text-2xl font-semibold mb-4 text-left">Key Features:</h2>
                <ul className="list-disc list-inside mb-6 text-left">
                    <li><span className='font-semibold font-sans'>Token Swapping:</span> Trade various ERC20 tokens with ease using our intuitive interface.</li>
                    <li><span className='font-semibold font-sans'>Secure and Non-Custodial:</span> We prioritize the security of your assets by enabling non-custodial transactions.</li>
                    <li><span className='font-semibold font-sans'>Low Fees:</span> Enjoy competitive transaction fees and gas costs thanks to the efficiency of the Uniswap protocol.</li>
                </ul>
                <h2 className="text-2xl font-semibold mb-4 text-left">Technology Stack:</h2>
                <ul className="list-disc list-inside mb-6 text-left">
                    <li><span className='font-semibold font-sans'>Frontend:</span> We utilize the MERN stack, which includes React for building dynamic user interfaces, Redux for
                        state management, and various libraries and tools for enhanced functionality and user experience.
                    </li>
                    <li><span className='font-semibold font-sans'>Backend:</span> Our backend is powered by Node.js and Express.js, providing a robust and scalable server-side
                        infrastructure to handle user requests and interactions with the Ethereum blockchain.
                    </li>
                    <li><span className='font-semibold font-sans'>Smart Contracts:</span> We leverage the power of Solidity, the Ethereum smart contract programming language, to
                        create secure and decentralized smart contracts that enable token swapping and liquidity provision on the
                        Uniswap protocol.
                    </li>
                    <li><span className='font-semibold font-sans'>Ethereum Blockchain:</span> Our DeFi app is integrated with the Ethereum blockchain, leveraging its security and
                        transparency to execute transactions and interact with Uniswap and other DeFi protocols.
                    </li>
                </ul>
                <p className="text-lg text-gray-800 leading-relaxed">
                    Thank you for joining us on this exciting journey into the world of DeFi. If you have any feedback, suggestions,
                    or encounter any issues while using our app, please feel free to reach out to the github repository and
                    contribute to the project. Happy swapping!
                </p>
            </div>
        </div>
    );
};

export default About;
