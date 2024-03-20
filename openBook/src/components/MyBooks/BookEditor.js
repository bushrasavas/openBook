import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultImage from './book.png'; 

export default function BookEditor({ book, mode, onClose }) {

    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [bookCondition, setBookCondition] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [coverImagePreview, setCoverImagePreview] = useState('');
    //const [contactPreference, setContactPreference] = useState('');

    useEffect(() =>{
        if(book) {
            setIsbn(book.isbn);
            setTitle(book.title);
            setAuthor(book.author);
            setPublisher(book.publisher);
            setPublishedYear(book.publishedYear);
            setBookCondition(book.bookCondition);
            setGenre(book.genre);
            setDescription(book.description);
            setLocation(book.location);
            setCoverImagePreview(book.coverImage ? book.coverImage : defaultImage);
            //setContactPreference(book.contactPreference);
        }
    },[book]);

    useEffect(() => {
        if (coverImage) {
            console.log("coverImage state is updated: ", coverImage);
        }
        // if (coverImagePreview) {
        //     console.log("coverImagePreview URL: ", coverImagePreview);
        // }
    }, [coverImage, coverImagePreview]);
    
    const handleEdit = async () => {
        
        const updatedBook = {
            isbn,
            title,
            author,
            publisher,
            publishedYear,
            bookCondition,
            genre,
            description,
            location,
            //contactPreference,   
        };
        
        try {
            // updating of book details
            if (mode === 'edit') {
                const response = await axios.put(`/api/books/updateBookInfo/${book.id}`, updatedBook);
                console.log('Book info updated', response.data);

                const updatedCover = new FormData();
                updatedCover.append('coverImage', coverImage);

                for (let key of updatedCover.keys()) {
                    console.log(key, updatedCover.get(key));
                }

                const coverResponse = await axios.put(`/api/books/updateCover/${book.id}`, updatedCover, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Cover image updated', coverResponse.data);  
                onClose();
            }
        } catch (error) {
            console.error("Failed to update book:", error);
        }
    };

    const handleDelete = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this book?');

        if (isConfirmed) {
            try {
                await axios.delete(`/api/books/${book.id}`);
                console.log(`${book.title} is deleted.`);
                onClose(); 
            } catch (error) {
                console.error('An error occurred while deleting the book:', error);
            }
        } else {
            //User canceled, stop transaction
            console.log('Book deletion has been cancelled.');
        }
    };

    return (
        <div className="modal">
            {mode === 'edit' && (
                <form onSubmit={handleEdit}>
                    <label className="label">
                        ISBN Number*:
                        <input className="input" 
                            name="isbn"
                            value={isbn}
                            onChange={(e)=> setIsbn(e.target.value)}
                            required />
                    
                    </label>
                    <label className="label">
                        Book Title*:
                        <input className="input" 
                            name="title" 
                            value={title} 
                            onChange={(e)=> setTitle(e.target.value)}
                            required 
                        />
                    </label>
                    <label className="label">
                        Author Name*:
                        <input className="input"
                            name="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </label>
                    <label className="label">
                        Published Year:
                        <input className="input"
                            type="number"
                            name="publishedYear"
                            value={publishedYear}
                            onChange={(e) => setPublishedYear(e.target.value)}
                        />
                    </label>

                    <div className='label'>Condition:</div>
                    <label className="label">
                        <select className='select'
                            name="bookCondition"
                            value={bookCondition||''}
                            onChange={(e) => setBookCondition(e.target.value)}
                        >
                            <option value="">Choose condition</option>
                            <option value="Like New">Like New</option>
                            <option value="Very Good">Very Good</option>
                            <option value="Good">Good</option>
                            <option value="Acceptable">Acceptable</option>
                        </select>
                    </label>

                    <div className='label'>Genre:</div>
                    <label className='label'>
                        <select className="select"
                            name="genre"
                            value={genre||''}
                            onChange={(e) => setGenre(e.target.value)}
                        >
                            <option value="">Choose a genre</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Novel">Novel</option>
                            <option value="History">History</option>
                            <option value="A-Level">A-Level</option>
                            <option value="GCSE">GCSE</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>

                    <label className="label">
                        Description:
                        <textarea maxLength="600" className='textarea'
                            name= "description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
                    </label>

                    <label className="label">
                        Location*:
                        <input className="input"
                            name="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </label>

                    <label className="label">
                    Cover Image:
                    <input
                        className="input"
                        type="file"
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                // Dosya seçildiğinde state'i güncelle
                                const file = e.target.files[0];
                                console.log("Seçilen dosya: ", file); // Seçilen dosyayı konsolda göster
                                setCoverImage(file); // Form gönderimi için seçilen dosyayı sakla
                                setCoverImagePreview(URL.createObjectURL(file)); // Önizleme için URL oluştur
                            }
                        }}
                    />
                    {coverImagePreview && (
                        <img src={coverImagePreview} alt="Cover Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />
                    )}
                </label>                 

                    {/* <div className='label'>How do you prefer users to contact you?*:</div>
                    <label className="label">
                        <select className='select'
                            name="contactPreference"
                            value={contactPreference}
                            onChange={(e) => setContactPreference(e.target.value)}
                            required
                        >
                            <option value="">Choose Contact Preference</option>
                            <option value="Email">Email</option>
                            <option value="Phone">Phone</option>
                        </select>
                    </label> */}
                    
                    <div className='edit-button-container'>
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>

            )}
            {mode === 'delete' && (
                <div className='delete-message'>
                    <p>{book.title} will be deleted.</p>
                    <div className='edit-button-container'>
                        <button className="button" onClick={handleDelete}>Delete</button>
                        <button className='button' onClick={onClose}>Cancel</button>
                    </div>
                </div>
            )}
            
        </div>
    );
}
