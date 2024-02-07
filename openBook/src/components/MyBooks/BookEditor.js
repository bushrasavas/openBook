// // BookEditor.js
// import React from 'react';
// import axios from 'axios';

// export default function BookEditor({ book, mode, onClose }) {
//     const handleEdit = (event) => {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         axios.put(`/api/books/${book.id}`, formData)
//             .then(() => onClose())
//             .catch(error => console.error("Failed to update book:", error));
//     };

//     const handleDelete = () => {
//         axios.delete(`/api/books/${book.id}`)
//             .then(() => onClose())
//             .catch(error => console.error("Failed to delete book:", error));
//     };

//     if (mode === 'edit') {
//         return (
//             <div className="modal">
//                 <form onSubmit={handleEdit}>
//                     <label>
//                         Title:
//                         <input name="title" defaultValue={book.title} required />
//                     </label>
//                     <label>
//                         Author:
//                         <input name="author" defaultValue={book.author} required />
//                     </label>
//                     <label>
//                         Published Year:
//                         <input type="number" name="publishedYear" defaultValue={book.publishedYear} required />
//                     </label>
//                     <label>
//                         Condition:
//                         <select name="condition" defaultValue={book.condition} required>
//                             <option value="Like New">Like New</option>
//                             <option value="Good">Good</option>
//                             <option value="Fair">Fair</option>
//                             <option value="Poor">Poor</option>
//                         </select>
//                     </label>
//                     <button type="submit">Save Changes</button>
//                     <button type="button" onClick={onClose}>Cancel</button>
//                 </form>
//                 <button onClick={onClose}>Cancel</button>
//             </div>
//         );
//     } else if (mode === 'delete') {
//         return (
//             <div className="modal">
//                 <p>Are you sure you want to delete this book?</p>
//                 <button onClick={handleDelete}>Delete</button>
//                 <button onClick={onClose}>Cancel</button>
//             </div>
//         );
//     }

//     return null; // In case of an unsupported mode
// }


// BookEditor.js
import React, { useState } from 'react';
import axios from 'axios';

export default function BookEditor({ book, mode, onClose }) {
    // State to track if a new image is uploaded
    const [newImage, setNewImage] = useState(null);

    const handleEdit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        // Append book details to formData
        formData.append('title', event.target.title.value);
        formData.append('author', event.target.author.value);
        // Append other details as needed

        // Determine how to handle the image
        if (newImage) {
            // If a new image is uploaded, append it to formData
            formData.append('coverImage', newImage);
        } else if (book.coverImage && !book.coverImage.startsWith('http')) {
            // If using an existing BLOB image, no need to send it back
            // Alternatively, handle as needed based on backend expectations
        } else {
            // If using an image URL from the API or no image, send the URL or absence thereof
            formData.append('coverImageUrl', book.coverImage || '');
        }

        try {
            if (mode === 'edit') {
                await axios.put(`/api/books/${book.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }
            onClose(); // Refresh the list and close the modal
        } catch (error) {
            console.error("Failed to update book:", error);
        }
    };

    const handleDelete = async () => {
        try {
            if (mode === 'delete') {
                await axios.delete(`/api/books/${book.id}`);
            }
            onClose(); // Refresh the list and close the modal
        } catch (error) {
            console.error("Failed to delete book:", error);
        }
    };

    const handleImageChange = (event) => {
        if (event.target.files.length > 0){
            const file = event.target.files[0];
            setNewImage(file);
        }
    };

    return (
        <div className="modal">
            {mode === 'edit' && (
                <form onSubmit={handleEdit}>
                    <label>
                        Title:
                        <input name="title" defaultValue={book.title} required />
                    </label>
                    <label>
                        Author:
                        <input name="author" defaultValue={book.author} required />
                    </label>
                    <label>
                        Published Year:
                        <input type="number" name="publishedYear" defaultValue={book.publishedYear} required />
                    </label>
                    <label>
                        Condition:
                        <select name="condition" defaultValue={book.condition} required>
                            <option value="Like New">Like New</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                            <option value="Poor">Poor</option>
                        </select>
                    </label>
                    <label>
                        Cover Image:
                        <input type='file' onchange= {handleImageChange} />
                    </label>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>

            )}
            {mode === 'delete' && (
                <>
                    <p>Are you sure you want to delete this book?</p>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
