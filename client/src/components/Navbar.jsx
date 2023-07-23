import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import logo from '../assets/cp_logo.png';
import Footer from './Footer';

export default function Navbar({ account }) {

    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <nav className="bg-gradient-to-b from-[#000000] from-20% via-[#111111] via-40% to-[#232323] dark:bg-gray-800 w-full shadow text-white md:static fixed md:z-0 z-40">
                <div className="px-8 mx-auto">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <NavLink to="/" className="flex-shrink-0" href="/">
                                <img className="w-12 h-12 rounded-full" src={logo} alt="Workflow" />
                            </NavLink>
                            <div className="hidden md:block">
                                <div className="flex items-baseline ml-10 space-x-4">
                                    <NavLink to='/' className='hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium'
                                        style={({ isActive }) => {
                                            return {
                                                color: isActive ? 'white' : '#8E8E7B',
                                            }
                                        }}
                                    >
                                        Swap
                                    </NavLink>
                                    <NavLink to='/tokens' className='hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium'
                                        style={({ isActive }) => {
                                            return {
                                                color: isActive ? 'white' : '#8E8E7B',
                                            }
                                        }}>
                                        Tokens
                                    </NavLink>
                                    <NavLink to='/about' className='hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium'
                                        style={({ isActive }) => {
                                            return {
                                                color: isActive ? 'white' : '#8E8E7B',
                                            }
                                        }}>
                                        About
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className='font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent'>
                                {account ? `${account.substr(0, 6)}...${account.substr(-4,)}` : null}
                            </p>
                        </div>
                        <div className="flex -mr-2 md:hidden">
                            <button onClick={() => setShowMenu((prev) => !prev)} className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                                <svg width="20" height="20" fill="white" className="w-8 h-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {showMenu && (
                    <div className="md:hidden px-2 w-full z-40 fixed">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black rounded-b-lg flex flex-col">
                            <NavLink onClick={() => setTimeout(() => {
                                setShowMenu((prev) => !prev)
                            }, 200)
                            } to='/' className='hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium'
                                style={({ isActive }) => {
                                    return {
                                        color: isActive ? 'white' : '#8E8E7B',
                                        backgroundColor: isActive ? '#960FDF' : "",
                                    }
                                }}
                            >
                                Swap
                            </NavLink>
                            <NavLink onClick={() => setTimeout(() => {
                                setShowMenu((prev) => !prev)
                            }, 200)} to='/tokens' className='hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium'
                                style={({ isActive }) => {
                                    return {
                                        color: isActive ? 'white' : '#8E8E7B',
                                        backgroundColor: isActive ? '#960FDF' : "",
                                    }
                                }}>
                                Tokens
                            </NavLink>
                            <NavLink onClick={() => setTimeout(() => {
                                setShowMenu((prev) => !prev)
                            }, 200)} to='/about' className='hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium'
                                style={({ isActive }) => {
                                    return {
                                        color: isActive ? 'white' : '#8E8E7B',
                                        backgroundColor: isActive ? '#960FDF' : "",
                                    }
                                }}>
                                About
                            </NavLink>
                        </div>
                    </div>)}
            </nav >
            <Outlet />

        </>
    )
}
