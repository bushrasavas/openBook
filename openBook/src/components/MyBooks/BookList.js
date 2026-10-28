import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import BookEditor from './BookEditor'; 
import defaultImage from './book.png';
import './MyBooks.css';
import { MdEdit, MdDelete } from "react-icons/md";

const sortingOptions = {
    'author-asc': (a, b) => a.author.localeCompare(b.author),
    'title-asc': (a, b) => a.title.localeCompare(b.title),
    'year-desc': (a, b) => b.publishedYear - a.publishedYear,
    'author-desc': (a, b) => b.author.localeCompare(a.author),
    'title-desc': (a, b) => b.title.localeCompare(a.title),
    'year-asc': (a, b) => a.publishedYear - b.publishedYear,
};

export default function BookList() {
    const [booksData, setBooksData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentBook, setCurrentBook] = useState(null);
    const [mode, setMode] = useState('');
    const [sortOption, setSortOption] = useState('title-asc');
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        setLoading(true);
        axios.get('/api/books').then(response => {
            const updatedBooksData = response.data.map(book => ({
                ...book,
                coverImage: book.coverImage ? `data:image/jpeg;base64,${book.coverImage}` : defaultImage
            }));
            setBooksData(updatedBooksData);
        })
        .catch(error => {
            console.error("Error fetching books:", error);
            setError(error);
        })
        .finally(() => {
            setLoading(false);
        });
    }; 

    const openEditor = (book) => {
        setCurrentBook(book);
        setMode('edit');
    };

    const openDeleter = (book) => {
        setCurrentBook(book);
        setMode('delete');
    };

    const closeModal = () => {
        setCurrentBook(null);
        setMode('');
        
        // Refresh the list after any operation
        fetchBooks(); 
    };

    const filteredAndSortedBooks = useMemo(() => {
        return booksData
            .filter(book => {
                return searchKeyword ? book.title.toLowerCase().includes(searchKeyword.toLowerCase()) || book.author.toLowerCase().includes(searchKeyword.toLowerCase()) : true;
            })
            .sort(sortingOptions[sortOption]);
    }, [booksData, searchKeyword, sortOption]);

    return (
        <div className="listing">
            <div className='header'>
                <h2>Library</h2>
            </div>

            {loading && <div>Loading books...</div>}
            {error && <div>Error fetching books. Please try again later.</div>}

            {currentBook && (
                <BookEditor
                    book={currentBook}
                    mode={mode}
                    onClose={closeModal}
                />
            )}
            
            <div className='filtering'>
                <input type="text" placeholder="Search by title or author..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                    <option value="author-asc">Author (A-Z)</option>
                    <option value="author-desc">Author (Z-A)</option>
                    <option value="year-desc">Year (Newest)</option>
                    <option value="year-asc">Year (Oldest)</option>
                </select>
            </div>

            
            {!loading && !error && filteredAndSortedBooks.map(book => (
                <div key={book.id} className='book-container'>
                    <div className="inner-div">
                        <img src={book.coverImage} alt="Cover" className='book-image' />
                    </div>
                    <div className='inner-div2'>
                        {book.title && <div><strong>Title: </strong>{book.title}</div>}
                        {book.author && <div><strong>Author: </strong>{book.author}</div>}
                        {book.publishedYear && <div><strong>Year: </strong>{book.publishedYear}</div>}
                        {book.bookCondition && <div><strong>Condition: </strong>{book.bookCondition}</div>}
                        {book.location && <div><strong>Location: </strong>{book.location}</div>}
                    </div>
                    <div className="book-detail-control">
                        <button className="control-button" onClick={() => openEditor(book)}><MdEdit/></button>
                        <button className="control-button" onClick={() => openDeleter(book)}><MdDelete/></button>
                    </div>
                    
                </div>
                ))}
        </div>
    );
}