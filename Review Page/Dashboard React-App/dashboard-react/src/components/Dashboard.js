import './Dashboard.css';
import { Link } from 'react-router-dom';
import Header from './Header';
import React, { useState, useEffect } from 'react';
import myImg from './grey.jpg';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchPublisher, setSearchPublisher] = useState('');
  const [searchOwner, setSearchOwner] = useState('');

  useEffect(() => {
    // Fetch books from your Spring Boot API
    fetch('http://localhost:8080/book')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));

    // Fetch users from your Spring Boot API
    fetch('http://localhost:8080/user')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = event => {
    setSelectedGenre(event.target.value);
  };

  const handleAuthorSearch = event => {
    setSearchAuthor(event.target.value);
  };

  const handlePublisherSearch = event => {
    setSearchPublisher(event.target.value);
  };

  const handleOwnerSearch = event => {
    setSearchOwner(event.target.value);
  };

  const getUserById = ownerId => {
    const user = users.find(user => user.id === ownerId);
    return user ? user.name : 'Unknown';
  };

  const handleContactClick = (ownerEmail, bookTitle) => {
    const subject = `Book Request - ${bookTitle}`;
    // Open default email client with pre-filled email and subject
    window.location.href = `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}`;
  };

  const filteredBooks = books.filter(book => {
    const titleMatches = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const genreMatches = selectedGenre === 'All' || book.genre === selectedGenre;
    const authorMatches = book.author.toLowerCase().includes(searchAuthor.toLowerCase());
    const publisherMatches = book.publisher.toLowerCase().includes(searchPublisher.toLowerCase());
    const ownerMatches =
      searchOwner === '' || getUserById(book.ownerId).toLowerCase().includes(searchOwner.toLowerCase());

    // Filter out books that are unavailable
    const availabilityMatches = book.availability;

    return (
      titleMatches &&
      genreMatches &&
      authorMatches &&
      publisherMatches &&
      ownerMatches &&
      availabilityMatches
    );
  });

  const genreOptions = [
    'All',
    'Fiction',
    'Non-fiction',
    'Mystery/Thriller',
    'Science Fiction',
    'Fantasy',
    'Historical Fiction',
    'Romance',
    'Horror',
    'Adventure',
    'Biography/Autobiography',
    'Self-Help',
    'Science',
    'Poetry',
    'Humor',
    'Dystopian',
    'Young Adult (YA)',
    "Children's Literature",
    'Crime',
    'Philosophy',
    'Travelogue',
  ];

  const handleAvailabilityToggle = (bookId, currentAvailability) => {
    // Send a PATCH request to update the book's availability
    fetch(`http://localhost:8080/book/${bookId}/availability?availability=${!currentAvailability}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(updatedBook => {
        // Update the state with the updated book
        setBooks(prevBooks =>
          prevBooks.map(book => (book.id === updatedBook.id ? updatedBook : book))
        );
      })
      .catch(error => console.error('Error updating book availability:', error));
  };

  return (
    <>
    <Header/>
    <div className="Dashboard">
      <h2>Dashboard</h2>
      <div className="filters">
        <div>
          <label>Search by Title:</label>
          <input type="text" placeholder="Search by title" value={searchTerm} onChange={handleSearch} />
        </div>
        <div>
          <label>Search by Author:</label>
          <input type="text" placeholder="Search by author" value={searchAuthor} onChange={handleAuthorSearch} />
        </div>
        <div>
          <label>Search by Publisher:</label>
          <input type="text" placeholder="Search by publisher" value={searchPublisher} onChange={handlePublisherSearch} />
        </div>
        <div>
          <label>Filter by Genre:</label>
          <select value={selectedGenre} onChange={handleGenreChange}>
            {genreOptions.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Search by Owner:</label>
          <input type="text" placeholder="Search by owner" value={searchOwner} onChange={handleOwnerSearch} />
        </div>
      </div>

      <div className="Books">
        <ul>
          {filteredBooks.map(book => (
            <li key={book.id}>
              <div className="container">
                <img src={myImg} alt="No Book Image" className="contained-image" />
              </div>

              <div>
                <div style={{ fontSize: '40px' }}>{book.title}</div>
                <div style={{ fontSize: '20px' }}> Written by {book.author}</div>
                <div>
                  <strong>Genre:</strong> {book.genre}
                </div>
                <div>
                  <strong>Publisher:</strong> {book.publisher}
                </div>
                <div>
                  <strong>Owner:</strong> {getUserById(book.ownerId)}
                </div>
                <button onClick={() => handleContactClick(getUserById(book.ownerId), book.title)}>Request Book</button>

                <Link to={`/reviews/${book.id}`}>
                  <button>Reviews</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default BookList;
