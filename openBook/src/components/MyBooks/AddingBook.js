import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import defaultImage from './book.png'; 
import './MyBooks.css';

const isbnValidation = yup.string().matches(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/, 'Invalid ISBN number!').required('ISBN Number is required!');

//const ukPostCodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i;

const schema = yup.object().shape({
    isbn: isbnValidation,
    title: yup.string().required('Book Title is required!'),
    author: yup.string().required('Author Name is required!'),
    publisher: yup.string().nullable(),
    publishedYear: yup.number().transform((value, originalValue) => {
        return originalValue === '' || isNaN(originalValue) ? undefined : value;
      }).nullable(true).typeError('Please enter a valid year').integer('Please enter a valid year').min(0, 'Year must be greater than 0').max(new Date().getFullYear(), '`Year cannot be in the future`').notRequired(),  
    bookCondition: yup.string().nullable(),
    genre: yup.string().nullable(),
    description: yup.string().nullable(),
    location: yup.string().required('Location is required!'),
    //postCode: yup.string().matches(ukPostCodeRegex, 'Invalid post code!').required('Post code is required!'),
    //contactPreference: yup.string().oneOf(['Email', 'Phone'], 'Select your contact preference').required('Contact preference is required!'),
});


export default function AddingBook() {
    const { register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const isbn = watch('isbn');
    const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
    const [coverImagePreview, setCoverImagePreview] = useState(defaultImage); 
    const [coverImage, setCoverImage] = useState();
    
    useEffect(() => {
                if (isbnValidation.isValidSync(isbn)) {
                    axios.get(`https://openlibrary.org/isbn/${isbn}.json`)
                        .then(response => {
                            const data = response.data;
                            if (data) {
                                setValue('title', data.title);
                                //setValue('coverImageSource', 'api');
        
                                if (data.authors && data.authors.length > 0) {
                                    axios.get(`https://openlibrary.org${data.authors[0].key}.json`)
                                        .then(authorResponse => {
                                            setValue('author', authorResponse.data.name);
                                        })
                                        .catch(error => {
                                            console.error("Error fetching author details:", error);
                                            setValue('author', '');
                                        });
                                } else {
                                    setValue('author', '');
                                }
            
                                setValue('publisher', data.publishers && data.publishers.length > 0 ? data.publishers[0] : '');
                                setValue('publishedYear', data.publish_date ? new Date(data.publish_date).getFullYear() : '');
            
                                // const coverImageUrl = data.covers && data.covers.length > 0 ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : defaultImage;
                                // setCoverImagePreview(coverImageUrl);
                                // setCoverImage(null);
                                setCoverImagePreview(defaultImage);
                            }
                        })
                        .catch(() => {
                            setCoverImagePreview(defaultImage);
                            //setValue('coverImageSource', 'default');
                        });
                }
        }, [isbn, setValue]);

    const handleCoverImageChange = (event) => {
        if (event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setCoverImage(selectedFile); 
            setCoverImagePreview(URL.createObjectURL(selectedFile)); 
        }
    };

    const handleAxiosError = (error) => {
        console.error("Axios request failed:", error);
        return { success: false, message: `Error: ${error.response ? error.response.data.message : error.message}` };
    };

    const onSubmit = async (data) => {
        const bookDetails = { ...data};
        delete bookDetails.coverImage;

        try {
            console.log('Sending book details...');
            const bookResponse = await axios.post('http://localhost:8080/api/books/addBookInfo', bookDetails, {
                headers: {
                    'Content-Type': 'application/json',
                }, 
            });

            console.log('Book details response:', bookResponse.data); 
    

            const id = bookResponse.data.id; 

            setSubmitStatus({ success: true, message: 'Book added successfully.' });

            setTimeout(() => {
                setSubmitStatus({ success: false, message: '' });
            }, 5000);
            
            if (coverImage && coverImage !== defaultImage) {
                const coverFormData = new FormData();
                coverFormData.append('coverImage', coverImage);
    
                const coverResponse = await axios.post(`http://localhost:8080/api/books/uploadCover/${id}`, coverFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                console.log('Cover image upload response:', coverResponse); 

                // if cover image is uploaded successfully, get additional messages
                if (coverResponse.status === 200) { // successfull?
                    console.log('Cover image uploaded successfully.');
                } else {
                    console.log('Cover image upload failed.');
                }
            } else {
                console.log('The book is uploaded without a cover image.');
            }
        } catch (error) {
            const errorResponse = handleAxiosError(error);
            setSubmitStatus(errorResponse);

            setTimeout(() => {
                setSubmitStatus({ success: false, message: '' });
            }, 5000);
        }
        reset();
    };


    return (
        <>        
            <form className="adding-book-form" onSubmit={handleSubmit(onSubmit)}>
                <label className="label">
                    ISBN Number*:
                    <input className="input" type="text" {...register('isbn')} />
                    {errors.isbn && <p className="error-message">{errors.isbn.message}</p>}
                </label>
   
                <label className="label">
                    Book Title*:
                    <input className="input" type="text" {...register('title')} />
                    {errors.title && <p className="error-message">{errors.title.message}</p>}
                </label>
  
                <label className="label">
                    Author Name*:
                    <input className="input" type="text" {...register('author')} />
                    {errors.author && <p className="error-message">{errors.author.message}</p>}
                </label>
  
                <label className="label">
                    Publisher:
                    <input className="input" type="text" {...register('publisher')} />
                </label>
   
                <label className="label">
                    Published Year:
                    <input className="input" type="number" {...register('publishedYear')} />
                    {errors.publishedYear && <p className="error-message">{errors.publishedYear.message}</p>}
                </label>
   
                <div className="label">Condition:</div>
                <div className="choiceInput">
                    <label><input type="radio" value="Like New" {...register('bookCondition')} /> Like New</label>
                    <label><input type="radio" value="Very Good" {...register('bookCondition')} /> Very Good</label>
                    <label><input type="radio" value="Good" {...register('bookCondition')} /> Good</label>
                    <label><input type="radio" value="Acceptable" {...register('bookCondition')} /> Acceptable</label>
                </div>
    
                <label className="label">
                    Genre:
                    <select className="select" {...register('genre')}>
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
                    <textarea maxLength="600" className="textarea" {...register('description')}></textarea>
                </label>
    
                <label className="label">
                    Location*:
                    <input className="input" type="text" {...register('location')} />
                    {errors.location && <p className="error-message">{errors.location.message}</p>}
                </label>

                <label className="label">
                    Cover Image:
                    {coverImagePreview && <img src={coverImagePreview} alt="Cover Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />}
                    </label>
                    <label className="label">
                <input className="input" type="file" onChange={handleCoverImageChange} />
                </label>

                {/* <div className="label">How do you prefer users to contact you?*:</div>
                <div className="choiceInput">
                    <label><input type="radio" value="Email" {...register('contactPreference')} /> Email</label>
                    <label><input type="radio" value="Phone" {...register('contactPreference')} /> Phone</label>
                </div>
                {errors.contactPreference && <p className="error-message">{errors.contactPreference.message}</p>} */}
                
                <button className="submitButton" type="submit">Submit</button>
            </form>
            {submitStatus.message && <p className={submitStatus.success ? 'success-message' : 'error-message'}>{submitStatus.message}</p>}
        </>
    );
}