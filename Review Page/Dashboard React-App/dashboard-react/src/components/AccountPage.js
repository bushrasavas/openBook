import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import myImg from './grey.jpg';
import './Dashboard.css';

const AccountPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchPublisher, setSearchPublisher] = useState('');

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

  useEffect(() => {
    // Fetch users from your Spring Boot API
    fetch('http://localhost:8080/user')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    // Fetch all books from your Spring Boot API
    fetch('http://localhost:8080/book')
      .then(response => response.json())
      .then(data => setAllBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  useEffect(() => {
    // Update filteredBooks when a user is selected or when filters change
    const updatedBooks = allBooks
      .filter(book => !selectedUser || book.ownerId === selectedUser.id)
      .filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(book => selectedGenre === 'All' || book.genre === selectedGenre)
      .filter(book => book.author.toLowerCase().includes(searchAuthor.toLowerCase()))
      .filter(book => book.publisher.toLowerCase().includes(searchPublisher.toLowerCase()));

    setFilteredBooks(updatedBooks);
  }, [selectedUser, allBooks, searchTerm, selectedGenre, searchAuthor, searchPublisher]);

  const handleUserClick = userId => {
    // Fetch the selected user's details
    fetch(`http://localhost:8080/user/${userId}`)
      .then(response => response.json())
      .then(data => setSelectedUser(data))
      .catch(error => console.error('Error fetching user details:', error));
  };

  const getUserById = ownerId => {
    const user = users.find(user => user.id === ownerId);
    return user ? user.name : 'Unknown';
  };

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
        setAllBooks(prevBooks =>
          prevBooks.map(book => (book.id === updatedBook.id ? updatedBook : book))
        );
      })
      .catch(error => console.error('Error updating book availability:', error));
  };

  return (
    <>
    <Header/>
    <div className="Dashboard">
      <h2>Account Page</h2>
      <p>Buttons shouldn't be here, normally should be based on login system but for the sake of example of how it would look like</p>
      <div className="user-buttons">
        {users.map(user => (
          <button key={user.id} onClick={() => handleUserClick(user.id)}>
            {user.name}
          </button>
        ))}
      </div>

      {selectedUser && (
        <div className="user-details">
          <h3>User Details</h3>
          <p>
            <strong>ID:</strong> {selectedUser.id}
          </p>
          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          {/* Add more user details as needed */}

          {/* Display filtered books */}
          <div className="Books">
            <div className="filters">
              <div>
                <label>Search by Title:</label>
                <input type="text" placeholder="Search by title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <div>
                <label>Search by Author:</label>
                <input type="text" placeholder="Search by author" value={searchAuthor} onChange={(e) => setSearchAuthor(e.target.value)} />
              </div>
              <div>
                <label>Filter by Genre:</label>
                <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                  {genreOptions.map(genre => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Search by Publisher:</label>
                <input type="text" placeholder="Search by publisher" value={searchPublisher} onChange={(e) => setSearchPublisher(e.target.value)} />
              </div>
            </div>

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

                    <div>
                      <strong>Availability:</strong> {book.availability ? 'Available' : 'Not Available'}
                    </div>
                    {/* Toggle Availability button */}
                    <button onClick={() => handleAvailabilityToggle(book.id, book.availability)}>
                      Toggle Availability
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default AccountPage;
