import React from 'react';
import { BiSolidSave } from 'react-icons/bi';

const SellForm = () => {
    return (
        <section className="p-6 my-10 bg-gray-200 text-gray-900">
        <form novalidate="" action="" className="container flex flex-col mx-auto space-y-12">
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-200">
                <div className="space-y-2 col-span-full lg:col-span-1">
                    <p className="font-bold text-xl">Add Sell Post</p>
                    <p className="text-md text-gray-600">Add a book you want to sell.For selling books you have to fill up the form.</p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                        <label for="firstname" className="text-md">Book name</label>
                        <input id="firstname" type="text" placeholder="Enter book name" className="w-full h-10 border-green-300 rounded-md focus:ring focus:ring-opacity-75 px-2  text-gray-900" />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <label for="lastname" className="text-md">Book Price</label>
                        <input id="lastname" type="text" placeholder="Enter book price" className="w-full h-10 border-green-300 rounded-md focus:ring focus:ring-opacity-75 px-2  text-gray-900" />
                    </div>
                    <div className="col-span-full">
                        <label for="address" className="text-md">Photo url</label>
                        <input id="address" type="text" placeholder="Give a book photo url" className="w-full h-10 border-green-300 rounded-md focus:ring focus:ring-opacity-75 px-2  text-gray-900" />
                    </div>
                    <div className="col-span-full">
                        <label for="address" className="text-md">Address</label>
                        <input id="address" type="text" placeholder="Enter your address" className="w-full h-10 border-green-300 rounded-md focus:ring focus:ring-opacity-75 px-2  text-gray-900" />
                    </div>
                   
                </div>
            </fieldset>

                  <div className="mx-auto">
            <button className="save-btn "><BiSolidSave className='mr-1' /> Submit</button>
                    
                    </div>          
        </form>
    </section>
    );
};

export default SellForm;