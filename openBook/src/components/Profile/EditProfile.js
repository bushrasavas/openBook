import React from 'react';
import { BiSolidSave } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";
const EditProfile = () => {
    return (
        <div>
            <section className="mt-6 ms-3 rounded p-6 dark:bg-blue-100 dark:text-gray-50">
	<form novalidate="" action="" className="container flex flex-col mx-auto  space-y-12">
		<fieldset className="grid grid-cols-1 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-700">
			
			<div className="grid grid-cols-6  gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label for="firstname" className="text-sm">First name</label>
					<input id="firstname" type="text" placeholder="First name" className="w-full h-8 pl-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label for="lastname" className="text-sm">Last name</label>
					<input id="lastname" type="text" placeholder="Last name" className="w-full pl-2 h-8 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full ">
					<label for="email" className="text-sm">Email</label>
					<input id="email" type="email" placeholder="Email" className="w-full h-8 pl-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full">
					<label for="address" className="text-sm">Current password</label>
					<input id="address" type="password" placeholder="" className="w-full h-8 pl-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label for="city" className="text-sm">New password</label>
					<input id="city" type="password" placeholder="" className="w-full h-8 pl-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label for="state" className="text-sm">Confirm password</label>
					<input id="state" type="password" placeholder="" className="w-full h-8 pl-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label for="zip" className="text-sm">Contact</label>
					<input id="number" type="text" placeholder="" className="w-full h-8  pl-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
				</div>
			</div>
		</fieldset>
        <div className='btn-save-option-div'>
            <button className="save-btn"><BiSolidSave className='mr-1' /> Save</button>
            <button className="save-btn"><CgOptions className='mr-1'/> Option</button>
        </div>
    
    </form>
</section>
        </div>
    );
};

export default EditProfile;