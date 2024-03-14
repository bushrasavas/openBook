import React from 'react';

const Uploadphoto = () => {
    return (
        <div>
            <fieldset className="w-full  space-y-1 dark:text-gray-100">
	         <label for="files" className="block text-sm font-medium">Attachments</label>
	         <div className="flex upload-file">
		     <input type="file" name="files" id="files" className="px-8 py-12 border-2 border-dashed rounded-md dark:border-gray-700 dark:text-gray-400 dark:bg-gray-100" />
	         </div>
             </fieldset>
        </div>
    );
};

export default Uploadphoto;