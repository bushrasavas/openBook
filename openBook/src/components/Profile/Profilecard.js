import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { IoMdCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";


import React from 'react';

const Profilecard = () => {
    const user = 'https://i.ibb.co/MP2Hxgb/user.jpg';
    return (
        <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-green-600 dark:text-gray-100">
					<img src={user} alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
					<div className="space-y-4 text-center divide-y dark:divide-gray-100">
						<div className="my-2 space-y-1">
							<h2 className="text-xl font-semibold sm:text-2xl">Arham Khan</h2>
							<p className="px-5 text-xs sm:text-base dark:text-gray-200">Full-stack developer</p>
						</div>
						<div className="flex justify-center pt-2 space-x-4 align-center">
							<a  href="#df"  className="p-2 rounded-md dark:text-gray-100 hover:dark:text-yellow-400">
                            <FaFacebook />
							</a>
							<a  href="#df" className="p-2 rounded-md dark:text-gray-100 hover:dark:text-yellow-400">
                            <IoLogoInstagram />
							</a>
							<a href="#df"  className="p-2 rounded-md dark:text-gray-100 hover:dark:text-yellow-400">
                            <IoMdCall />
							</a>
							<a  href="#df"  className="p-2 rounded-md dark:text-gray-100 hover:dark:text-yellow-400">
                            <IoIosMail />
							</a>
						</div>
					</div>
				</div>
    );
};

export default Profilecard;