// import React, { useState } from "react";
// import { IoIosAddCircleOutline, IoIosCloseCircleOutline  } from "react-icons/io";
// import AddingBook from "./AddingBook"; // Assuming this is the path to your AddingBook component
// import BookList from "./BookList"; // Assuming this is the path to your BookList component
// import './MyBooks.css';



// export default function MyBooks() {
//     const [showAddBookForm, setShowAddBookForm] = useState(false);

//     const handleAddBookClick = () => {
//         setShowAddBookForm(!showAddBookForm); // Toggle the display of the form
//     };

//     return (
//         <div className="container">
//             <button className="button" onClick={handleAddBookClick}>
//             {showAddBookForm 
//                     ? <><IoIosCloseCircleOutline className="button-icon" /> Cancel</> 
//                     : <><IoIosAddCircleOutline className="button-icon" /> Add a Book</>}
//             </button>
//             {showAddBookForm && <AddingBook />}
//             <BookList/>
//         </div>
//     );
// }

import React, { useState } from "react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline  } from "react-icons/io";
import AddingBook from "./AddingBook"; // Assuming this is the path to your AddingBook component
import BookList from "./BookList"; // Assuming this is the path to your BookList component
import './MyBooks.css';

export default function MyBooks() {
    const [showAddBookForm, setShowAddBookForm] = useState(false);

    const handleAddBookClick = () => {
        setShowAddBookForm(!showAddBookForm); // Toggle the display of the form
    };

    // Function to refresh the book list after adding a new book
    // This is a placeholder. The actual implementation will depend on how BookList fetches its data.
    const refreshBookList = () => {
        // Trigger a refresh in BookList. 
        // This could be done by passing a prop to BookList that changes when a book is added,
        // causing BookList to refetch the books from the API.
    };

    return (
        <div className="container">
            <button className="button" onClick={handleAddBookClick}>
                {showAddBookForm 
                    ? <><IoIosCloseCircleOutline className="button-icon" /> Cancel</> 
                    : <><IoIosAddCircleOutline className="button-icon" /> Add a Book</>}
            </button>
            {showAddBookForm && <AddingBook onBookAdded={refreshBookList} />}
            <BookList />
        </div>
    );
}


// import React, { useState, useEffect } from "react";
// //import axios from 'axios';
// import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
// import AddingBook from "./AddingBook";
// import BookList from "./BookList";
// import { fetchBooks, addBook } from './Api'; // Adjust the import path as necessary
// import './MyBooks.css';

// //const apiUrl = "http://localhost:8080/api/books";

// export default function MyBooks() {
//     const [showAddBookForm, setShowAddBookForm] = useState(false);
//     const [books, setBooks] = useState([]);

//     useEffect(() => {
//         const loadBooks = async () => {
//             const response = await fetchBooks();
//             setBooks(response.data);
//         };
//         loadBooks();
//     }, []);

//     // useEffect(() => {
//     //     fetchBooks();
//     // }, []);

//     // const fetchBooks = async () => {
//     //     try {
//     //         const response = await axios.get(apiUrl);
//     //         setBooks(response.data);
//     //     } catch (error) {
//     //         console.error('Error fetching books:', error);
//     //     }
//     // };

//     const handleAddBookClick = () => {
//         setShowAddBookForm(!showAddBookForm); // Toggle the display of the form
//     };

//     // const handleAddBook = async (newBook) => {
//     //     try {
//     //         await axios.post(apiUrl, newBook);
//     //         fetchBooks(); // Refresh the book list after adding
//     //     } catch (error) {
//     //         console.error('Error adding book:', error);
//     //     }
//     // };

//     const handleAddBook = async (newBook) => {
//         try {
//             await addBook(newBook);
//             // Refresh the book list after adding
//             fetchBooks();
//         } catch (error) {
//             console.error('Error adding book:', error);
//         }
//     };

//     // const handleAddBook = async (newBook) => {
//     //     try {
//     //         await axios.post(apiUrl, newBook, {
//     //             headers: {
//     //                 'Content-Type': 'application/json'
//     //             }
//     //         });
//     //         fetchBooks(); // Refresh the book list after adding
//     //     } catch (error) {
//     //         console.error('Error adding book:', error);
//     //     }
//     // };
    

//     return (
//         <div className="container">
//             <button className="button" onClick={handleAddBookClick}>
//                 {showAddBookForm 
//                     ? <><IoIosCloseCircleOutline className="button-icon" /> Cancel</> 
//                     : <><IoIosAddCircleOutline className="button-icon" /> Add a Book</>}
//             </button>
//             {showAddBookForm && <AddingBook onAddBook={handleAddBook} />}
//             <BookList books={books}/>
//         </div>
//     );
// }
