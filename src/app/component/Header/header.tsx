"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    // State to manage the open/closed status of the mobile menu
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Toggles the open/closed state of the mobile menu.
     */
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="flex justify-between lg:px-16 items-center p-4 bg-gray-800 text-white ">
            <div className="text-2xl  flex items-center gap-2">
               <div className='bg-white w-[36px]'>
               <Image src={"/un.png"} height={36} width={36} alt='logo'></Image> 
               </div>
                <div>
                <span>RZ <span className='font-bold'>Blog</span></span>
                </div>
            </div>

            <div className="md:hidden flex justify-center items-center gap-5">

            <div className='lg:hidden'>
            </div>
                <button onClick={toggleMenu} className="focus:outline-none">
                    {/* Hamburger icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            <ul className={`md:flex items-center md:h-auto h-screen gap-10 pt-16 md:pt-0 font-semibold text-[18px] space-x-4  ${isOpen ? 'flex flex-col absolute top-0 left-0 w-full h-full bg-gray-800 z-10' : 'hidden'} md:block`}>
                {isOpen && (
                    <button onClick={toggleMenu} className="absolute top-4 right-4 text-white">
                        {/* Close (cross) icon */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
                  <li className="relative group ">
                    <Link href="/" className="">
                        Home
                    </Link>
                    <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>

                <li className="relative group ">
                    <Link href="/blogs">Blogs</Link>
                    <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </li>

                <li className="relative group ">
                    <Link href="/contact">Contact</Link>
                    <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    
                </li>
              
            </ul>
           
        </nav>
    );
};

export default Navbar;
