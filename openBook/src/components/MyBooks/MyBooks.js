import React, { useState } from "react";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline  } from "react-icons/io";
import AddingBook from "./AddingBook";
import BookList from "./BookList"; 
import './MyBooks.css';

export default function MyBooks() {
    const [showAddBookForm, setShowAddBookForm] = useState(false);

    const handleAddBookClick = () => {
        setShowAddBookForm(!showAddBookForm); 
    };

    return (
        <>
            <div className="container">
                <button className="button" onClick={handleAddBookClick}>
                {showAddBookForm 
                        ? <><IoIosCloseCircleOutline className="button-icon" /> Cancel</> 
                        : <><IoIosAddCircleOutline className="button-icon" /> Add a Book</>}
                </button>
                {showAddBookForm && <AddingBook />}
            </div>

            <div className="list">
                <BookList/>
            </div> 
        </>
    );
}