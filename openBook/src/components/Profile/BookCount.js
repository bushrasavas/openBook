import React from 'react';
import { GiBookshelf } from "react-icons/gi";
import { GiSpellBook } from "react-icons/gi";
import { FcReadingEbook } from "react-icons/fc";
import { PiBookBookmarkDuotone } from "react-icons/pi";
const BookCount = () => {
    return (
        <div>
           <div className="grid grid-cols-4 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
    <div className="flex items-center bg-white hover:shadow-md border rounded-sm overflow-hidden shadow col-span-2">
        <div className="p-4 bg-green-400">
			
			<GiBookshelf className="h-12 w-12 text-white" />
			
			</div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Books</h3>
            <p className="text-3xl">12,768</p>
        </div>
    </div>
    <div className="flex items-center bg-white hover:shadow-md border rounded-sm overflow-hidden shadow col-span-2">
        <div className="p-4 bg-blue-400">
			
			<GiSpellBook className="h-12 w-12 text-white" />
			</div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Book Owned</h3>
            <p className="text-3xl">265</p>
        </div>
    </div>

	<div className="flex items-center bg-white hover:shadow-md border rounded-sm overflow-hidden shadow col-span-2">
        <div className="p-4 bg-red-400">
			
			<FcReadingEbook className="h-12 w-12 text-white" />
			</div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Book Borrowed</h3>
            <p className="text-3xl">65</p>
        </div>
    </div>

	<div className="flex items-center bg-white hover:shadow-md border rounded-sm overflow-hidden shadow col-span-2">
        <div className="p-4 bg-yellow-400">
		<PiBookBookmarkDuotone className="h-12 w-12 text-white" />
			</div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Book Sell</h3>
            <p className="text-3xl">26</p>
        </div>
    </div>
 
   
</div>
        </div>
    );
};

export default BookCount;