import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { Link } from 'react-router-dom';
import myImg from './grey.jpg';
import './BookReviews.css';



const BookReviews = () => {
  const [sortOption, setSortOption] = useState('date'); // Default sort by date
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 0,
    review: '',
    userId: '',
    date: null,  // Set date to null initially
    reviewSubject: '',
  });
  const [averageScore, setAverageScore] = useState(0);
  const [scoreDistribution, setScoreDistribution] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [numReviews, setNumReviews] = useState(0);

  const [rating, setRating] = useState(0); // Default rating value

  const handleRatingChange = (value) => {
    setRating(value);
    handleInputChange({ target: { name: 'rating', value } }); // Update input value
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/byBook/${bookId}?sort=${sortOption}`);
      const data = await response.json();
      setReviews(data);
  

      // Calculate average score, score distribution, and number of reviews
      if (data.length > 0) {
        const totalScore = data.reduce((sum, review) => sum + review.rating, 0);
        setAverageScore(totalScore / data.length);

        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        data.forEach((review) => {
          if (review.rating >= 1 && review.rating <= 5) {
            distribution[review.rating]++;
          }
        });
        setScoreDistribution(distribution);
      }

      setNumReviews(data.length);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/book/${bookId}`);
      const data = await response.json();
      setBookDetails(data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, [bookId, sortOption]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/reviews/addReview/${bookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        // If the review is successfully added, refresh the reviews
        setNewReview({
          rating: 0,
          review: '',
          userId: '',
        });
        fetchReviews();
      } else {
        console.error('Failed to add review');
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <br/>     
        
        <div className="Title Intro">{bookDetails.title}</div>
        <div className="Author Intro">By {bookDetails.author}<br /><br /></div>
        <div className="Stars Intro" style={{ '--rating': averageScore , '--star-size': '40px'}}/>
        <div className="Intro" style={{'font-size': '15px'}}>{numReviews}{' reviews'}</div>
        
        <br /><br /><br />
        <form onSubmit={handleSubmit}>
          <div className="reviewForm">
          <br/>
          <h3 style ={{'font-size':'25px'}}>Submit a Review</h3>     
          <div className="star-rating-form">
            <div className="star-rating">
            {[1, 2, 3, 4, 5].map((value) => (
            <React.Fragment key={value}>
              <input type="radio" id={`rate-${value}`} name="rating" value={value} checked={rating === value} onChange={() => handleRatingChange(value)}/>
              <label htmlFor={`rate-${value}`} className={value <= rating ? 'yellow' : 'grey'} style={{ '--i': value }}>★</label>
            </React.Fragment>))}
            </div>
          </div>
          <div>
            <label>Subject
              <input type="text" name="reviewSubject" value={newReview.reviewSubject} onChange={handleInputChange} class="form__field" placeholder="Subject" required/>
            </label>
          </div>
          <br />      
          <div>
            <label>Review
              <input name="review" value={newReview.review} onChange={handleInputChange} class="form__field" placeholder="Review" required/>
            </label>
          </div>
          <br /><br/>
          <div> {/* This should be removed during integration, functionality should be created during integration. */}
            <label> User ID:
              <input type="text" name="userId" value={newReview.userId} onChange={handleInputChange}/>
            </label>
          </div>
          <br /><br/>
          <div>
            <button type="submit" class="button-27">Submit Review</button>
          </div>
          <br/><br/>
          </div>
        </form>
        
        <br/><br /><br />
        
        <div className="custom-select">
          {/*<label htmlFor="styledSelect1" className="custom-select-label">Sort By:</label>*/}
          <select id="styledSelect1" name="options" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="custom-select-dropdown">
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <br/>

        <div className="ReviewDashboard">
        <ul style={{ listStyleType: 'none' }}>
          {reviews.map((review) => (
            <li key={review.id}>

              <div className="ReviewMetadata">
                <p>{review.user.name}</p>
                <div className="Stars" style={{ '--rating': review.rating , '--star-size': '30px'}}/>
                <br/><br/><br/><br/><br/><br/>
                <p>{review.date}</p>
              </div>
              <div className="ReviewDescription">
                <p style={{'font-size':'30px','font-weight':'bold'}}>{review.reviewSubject}</p>
                <p>{review.review}</p>
              </div>       
            </li>
          ))}
        </ul>
        </div>
        
      </div>
    </>
  );
};

export default BookReviews;

