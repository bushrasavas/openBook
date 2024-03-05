// BookList.js
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import BookEditor from './BookEditor'; // Ensure this path is correct
import defaultImage from './book.png';
import './MyBooks.css';

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
        axios.get('/books').then(response => {
            setBooksData(response.data);
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching books:", error);
            setError(error);
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
        fetchBooks(); // Refresh the list after any operation
    };

    const filteredAndSortedBooks = useMemo(() => {
        return booksData
            .filter(book => {
                return searchKeyword ? book.title.toLowerCase().includes(searchKeyword.toLowerCase()) || book.author.toLowerCase().includes(searchKeyword.toLowerCase()) : true;
            })
            .sort(sortingOptions[sortOption]);
    }, [booksData, searchKeyword, sortOption]);

    return (
        <div>
            <h2>Library</h2>
            {loading && <div>Loading books...</div>}
            {error && <div>Error fetching books. Please try again later.</div>}
            <input type="text" placeholder="Search by title or author..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
            <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="author-asc">Author (A-Z)</option>
                <option value="author-desc">Author (Z-A)</option>
                <option value="year-desc">Year (Newest)</option>
                <option value="year-asc">Year (Oldest)</option>
            </select>
            {!loading && !error && filteredAndSortedBooks.map(book => (
                <div key={book.id} className='book-container'>
                    <img src={book.coverImage || defaultImage} alt="Cover" className='book-image' />
                    <div>Title: {book.title}</div>
                    <div>Author: {book.author}</div>
                    <div>Year: {book.publishedYear}</div>
                    <div>Condition: {book.condition}</div>
                    <button onClick={() => openEditor(book)}>Edit</button>
                    <button onClick={() => openDeleter(book)}>Delete</button>
                </div>
            ))}
            {currentBook && (
                <BookEditor
                    book={currentBook}
                    mode={mode}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}
