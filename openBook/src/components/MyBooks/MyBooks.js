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

    return (
        <div className="container">
            <button className="button" onClick={handleAddBookClick}>
            {showAddBookForm 
                    ? <><IoIosCloseCircleOutline className="button-icon" /> Cancel</> 
                    : <><IoIosAddCircleOutline className="button-icon" /> Add a Book</>}
            </button>
            {showAddBookForm && <AddingBook />}
            <BookList/>
        </div>
    );
}
