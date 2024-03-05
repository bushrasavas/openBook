// import { v4 as uuidv4 } from 'uuid';
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';
// import defaultImage from './book.png';
// import './MyBooks.css';

// const isbnValidation = yup.string().matches(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/, 'Invalid ISBN number!').required('ISBN Number is required!');
// //should I create more accurate code for check ISBN no or is it enough?

// const ukPostCodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i;

// const schema = yup.object().shape({
//     isbn: isbnValidation,
//     title: yup.string().required('Book Title is required!'),
//     author: yup.string().required('Author Name is required!'),
//     publisher: yup.string(),
//     publishedYear: yup.number().integer().typeError('Invalid year').min(1000).max(new Date().getFullYear()),
//     condition: yup.string(),
//     genre: yup.string(),
//     description: yup.string(),
//     postCode: yup.string().matches(ukPostCodeRegex, 'Invalid post code!').required('Post code is required!'),
//     contactPreferences: yup.array().min(1, 'At least one contact preference is required!').of(yup.string()),
// });

// export default function AddingBook() {
//     const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
//         resolver: yupResolver(schema),
//         defaultValues: {
//             contactPreferences: [],
//         }
//     });
    
//     // const [contactPhone, setContactPhone] = useState(false);
//     // const [contactEmail, setContactEmail] = useState(false);

//     // Watch the contactPreferences array
//     const contactPreferences = watch("contactPreferences");
    
//     const [bookDetails, setBookDetails] = useState({ coverImage: defaultImage });
//     const isbn = watch('isbn');
//     const coverImageFile = watch('coverImage');

//     useEffect(() => {
//         if (isbnValidation.isValidSync(isbn)) {
//             axios.get(`https://openlibrary.org/isbn/${isbn}.json`)
//                 .then(response => {
//                     const data = response.data;
//                     if (data) {
//                         setValue('title', data.title);
    
//                         if (data.authors && data.authors.length > 0) {
//                             axios.get(`https://openlibrary.org${data.authors[0].key}.json`)
//                                 .then(authorResponse => {
//                                     setValue('author', authorResponse.data.name);
//                                 })
//                                 .catch(error => {
//                                     console.error("Error fetching author details:", error);
//                                     setValue('author', '');
//                                 });
//                         } else {
//                             setValue('author', '');
//                         }
    
//                         // Set publisher
//                         setValue('publisher', data.publishers && data.publishers.length > 0 ? data.publishers[0] : '');
    
//                         setValue('publishedYear', data.publish_date ? new Date(data.publish_date).getFullYear() : '');
    
//                         const coverImageUrl = data.covers && data.covers.length > 0 ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : defaultImage;
//                         setBookDetails(prevDetails => ({ ...prevDetails, coverImage: coverImageUrl }));
//                     }
//                 })
//                 .catch(() => {
//                     setBookDetails(prevDetails => ({ ...prevDetails, coverImage: defaultImage }));
//                 });
//         } else {
//             setBookDetails(prevDetails => ({ ...prevDetails, coverImage: defaultImage }));
//         }
//     }, [isbn, setValue]);

//     useEffect(() => {
//         if (coverImageFile && coverImageFile[0]) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 setBookDetails(prevDetails => ({ ...prevDetails, coverImage: e.target.result }));
//             };
//             reader.readAsDataURL(coverImageFile[0]);
//         }
//     }, [coverImageFile]);

//     // const onSubmit = (data) => { 
//     //     const bookId = uuidv4(); // Generate a unique ID for the new book
//     //     const bookData = {
//     //         ...data,
//     //         id: bookId,
//     //         coverImage: bookDetails.coverImage,
//     //     };
        
//     //     // Submit data to the database
//     //     // This function currently just logs the data; I need to replace it with my database submission logic.
//     //     console.log(data);
//     // };

//     const onSubmit = (data) => { 
//         // Generate a unique ID for the new book
//         const bookId = uuidv4(); 
    
//         // Create a FormData object
//         const formData = new FormData();
    
//         // Append book data to formData
//         Object.keys(data).forEach(key => {
//             // For contactPreferences, which is an array, stringify it
//             if(key === 'contactPreferences') {
//                 formData.append(key, JSON.stringify(data[key]));
//             } else {
//                 formData.append(key, data[key]);
//             }
//         });
    
//         // Append the unique book ID
//         formData.append('id', bookId);
    
//         // Check and append the cover image file if uploaded
//         // Otherwise, send the cover image URL fetched from Open Library (if available)
//         if (coverImageFile && coverImageFile[0]) {
//             formData.append('coverImage', coverImageFile[0]);
//         } else if (bookDetails.coverImage && bookDetails.coverImage !== defaultImage) {
//             formData.append('coverImageUrl', bookDetails.coverImage);
//         }
    
//         // Submit formData to the server
//         axios.post('/your-server-endpoint-to-handle-the-book-data', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         })
//         .then(response => {
//             // Handle successful submission
//             console.log("Book data submitted successfully:", response.data);
//             // You may want to redirect the user or clear the form here
//         })
//         .catch(error => {
//             // Handle errors during submission
//             console.error("Error submitting book data:", error);
//         });
//     };
    

//     return (
//         <form className="adding-book-form" onSubmit={handleSubmit(onSubmit)}>
    
//             {/* ISBN Number */}
//             <label className="label">
//                 ISBN Number*:
//                 <input className="input" type="text" {...register('isbn')} />
//                 {errors.isbn && <p className="error-message">{errors.isbn.message}</p>}
//             </label>
    
//             {/* Book Title */}
//             <label className="label">
//                 Book Title*:
//                 <input className="input" type="text" {...register('title')} />
//                 {errors.title && <p className="error-message">{errors.title.message}</p>}
//             </label>
    
//             {/* Author Name */}
//             <label className="label">
//                 Author Name*:
//                 <input className="input" type="text" {...register('author')} />
//                 {errors.author && <p className="error-message">{errors.author.message}</p>}
//             </label>
    
//             {/* Publisher */}
//             <label className="label">
//                 Publisher:
//                 <input className="input" type="text" {...register('publisher')} />
//             </label>
    
//             {/* Published Year */}
//             <label className="label">
//                 Published Year:
//                 <input className="input" type="number" {...register('publishedYear')} />
//             </label>
    
//             {/* Condition */}
//             <div className="label">Condition:</div>
//             <div className="choiceInput">
//                 <label><input type="radio" value="Like New" {...register('condition')} /> Like New</label>
//                 <label><input type="radio" value="Very Good" {...register('condition')} /> Very Good</label>
//                 <label><input type="radio" value="Good" {...register('condition')} /> Good</label>
//                 <label><input type="radio" value="Acceptable" {...register('condition')} /> Acceptable</label>
//             </div>
    
//             {/* Genre */}
//             <label className="label">
//                 Genre:
//                 <select className="select" {...register('genre')}>
//                     <option value="">Choose a genre</option>
//                     <option value="Fiction">Fiction</option>
//                     <option value="Novel">Novel</option>
//                     <option value="History">History</option>
//                     <option value="A-Level">A-Level</option>
//                     <option value="GCSE">GCSE</option>
//                     <option value="Other">Other</option>
//                 </select>
//             </label>
    
//             {/* Description */}
//             <label className="label">
//                 Description:
//                 <textarea className="textarea" {...register('description')}></textarea>
//             </label>
    
//             {/* Cover Image */}
//             <label className="label">
//                 Cover Image:
//                 <input className="input" type="file" {...register('coverImage')} />
//                 <img src={bookDetails.coverImage || defaultImage} alt="Book Cover" style={{ maxWidth: '100px', marginTop: '10px' }} />
//             </label>
    
//             {/* Post Code */}
//             <label className="label">
//                 Post Code*:
//                 <input className="input" type="text" {...register('postCode')} />
//                 {errors.postCode && <p className="error-message">{errors.postCode.message}</p>}
//             </label>
    
//             {/* Contact Preference */}
//             <div className="label">How do you prefer users to contact you?*</div>
//             <div className="choiceInput">
//                 <label>
//                     <input 
//                         type="checkbox" 
//                         value="Phone" {...register('contactPreferences')}
//                         checked = {contactPreferences.includes("Phone")}
//                     /> Phone
//                 </label>
//                 <label>
//                     <input 
//                         type="checkbox" 
//                         value="Email" {...register('contactPreferences')}
//                         checked = {contactPreferences.includes("Email")} 
//                     /> Email
//                 </label>
//             </div>
//             {errors.contactPreferences && (
//                 <p className='error-message'>At least one contact preference is required!</p>
//             )}
    
//             {/* Submit Button */}
//             <button className="submitButton" type="submit">Submit</button>
//         </form>
//     );
// }



// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import axios from 'axios';
// import defaultImage from './book.png'; 
// import './MyBooks.css';

// const isbnValidation = yup.string().matches(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/, 'Invalid ISBN number!').required('ISBN Number is required!');

// const ukPostCodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i;

// const schema = yup.object().shape({
//     isbn: isbnValidation,
//     title: yup.string().required('Book Title is required!'),
//     author: yup.string().required('Author Name is required!'),
//     publisher: yup.string(),
//     publishedYear: yup.number().integer().typeError('Invalid year').min(1000).max(new Date().getFullYear()),
//     condition: yup.string(),
//     genre: yup.string(),
//     description: yup.string(),
//     postCode: yup.string().matches(ukPostCodeRegex, 'Invalid post code!').required('Post code is required!'),
//     contactPreferences: yup.array().min(1, 'At least one contact preference is required!').of(yup.string()),
//     coverImage: yup.mixed().required('A cover image is required!'),
// });

// export default function AddingBook() {
//     const { register, handleSubmit, watch, formState: { errors } } = useForm({
//         resolver: yupResolver(schema)
//     });

//     const [coverImagePreview, setCoverImagePreview] = useState(defaultImage);

//     const contactPreferences = watch("contactPreferences", []);

//     // useEffect(() => {
//     //     const coverImageFile = watch('coverImage');
//     //     if (coverImageFile && coverImageFile.length > 0) {
//     //         const fileReader = new FileReader();
//     //         fileReader.onload = () => {
//     //             setCoverImagePreview(fileReader.result);
//     //         };
//     //         fileReader.readAsDataURL(coverImageFile[0]);
//     //     } else {
//     //         setCoverImagePreview(defaultImage);
//     //     }
//     // }, [watch('coverImage')]);

//     const coverImageWatch = watch('coverImage'); // 'coverImage' alanını izle

// useEffect(() => {
//     // watch fonksiyonunun sonucunu kullanarak coverImageFile tanımlıyoruz
//     const coverImageFile = coverImageWatch;
//     if (coverImageFile && coverImageFile.length > 0) {
//         const fileReader = new FileReader();
//         fileReader.onload = () => {
//             setCoverImagePreview(fileReader.result); // Dosya okunduğunda önizlemeyi ayarla
//         };
//         fileReader.readAsDataURL(coverImageFile[0]); // İlk dosyayı oku
//     } else {
//         setCoverImagePreview(defaultImage); // Dosya yoksa varsayılan resmi kullan
//     }
// }, [coverImageWatch]); // Bağımlılık olarak coverImageWatch kullan


//     const onSubmit = async (data) => {
//         const formData = new FormData();

//         Object.entries(data).forEach(([key, value]) => {
//             if (key === 'coverImage' && value.length) {
//                 formData.append(key, value[0]);
//             } else if (key === 'contactPreferences') {
//                 formData.append(key, JSON.stringify(value));
//             } else {
//                 formData.append(key, value);
//             }
//         });

//         try {
//             const response = await axios.post('http://localhost:8080/api/books', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log("Book added successfully", response.data);

//         } catch (error) {
//             console.error("Error adding book:", error);
//         }
//     };

//     return (
//         <form className="adding-book-form" onSubmit={handleSubmit(onSubmit)}>

//             {/* Diğer form elemanları ve submit butonu */}
//             {/* ISBN Number */}
//             <label className="label">
//                 ISBN Number*:
//                 <input className="input" type="text" {...register('isbn')} />
//                 {errors.isbn && <p className="error-message">{errors.isbn.message}</p>}
//             </label>
    
//             {/* Book Title */}
//             <label className="label">
//                 Book Title*:
//                 <input className="input" type="text" {...register('title')} />
//                 {errors.title && <p className="error-message">{errors.title.message}</p>}
//             </label>
    
//             {/* Author Name */}
//             <label className="label">
//                 Author Name*:
//                 <input className="input" type="text" {...register('author')} />
//                 {errors.author && <p className="error-message">{errors.author.message}</p>}
//             </label>
    
//             {/* Publisher */}
//             <label className="label">
//                 Publisher:
//                 <input className="input" type="text" {...register('publisher')} />
//             </label>
    
//             {/* Published Year */}
//             <label className="label">
//                 Published Year:
//                 <input className="input" type="number" {...register('publishedYear')} />
//             </label>
    
//             {/* Condition */}
//             <div className="label">Condition:</div>
//             <div className="choiceInput">
//                 <label><input type="radio" value="Like New" {...register('condition')} /> Like New</label>
//                 <label><input type="radio" value="Very Good" {...register('condition')} /> Very Good</label>
//                 <label><input type="radio" value="Good" {...register('condition')} /> Good</label>
//                 <label><input type="radio" value="Acceptable" {...register('condition')} /> Acceptable</label>
//             </div>
    
//             {/* Genre */}
//             <label className="label">
//                 Genre:
//                 <select className="select" {...register('genre')}>
//                     <option value="">Choose a genre</option>
//                     <option value="Fiction">Fiction</option>
//                     <option value="Novel">Novel</option>
//                     <option value="History">History</option>
//                     <option value="A-Level">A-Level</option>
//                     <option value="GCSE">GCSE</option>
//                     <option value="Other">Other</option>
//                 </select>
//             </label>
    
//             {/* Description */}
//             <label className="label">
//                 Description:
//                 <textarea className="textarea" {...register('description')}></textarea>
//             </label>
    
//             <label className="label">
//                 Cover Image:
//                 <input className="input" type="file" {...register('coverImage')} />
//                 <img src={coverImagePreview} alt="Cover Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />
//                 {errors.coverImage && <p className="error-message">{errors.coverImage.message}</p>}
//             </label>
    
//             {/* Post Code */}
//             <label className="label">
//                 Post Code*:
//                 <input className="input" type="text" {...register('postCode')} />
//                 {errors.postCode && <p className="error-message">{errors.postCode.message}</p>}
//             </label>
    
//             {/* Contact Preference */}
//             <div className="label">How do you prefer users to contact you?*</div>
//             <div className="choiceInput">
//                 <label><input type="checkbox" value="Phone" {...register('contactPreferences')} checked={contactPreferences.includes("Phone")} /> Phone</label>
//                 <label><input type="checkbox" value="Email" {...register('contactPreferences')} checked={contactPreferences.includes("Email")} /> Email</label>
//             </div>
//             {errors.contactPreferences && <p className='error-message'>{errors.contactPreferences.message}</p>}
    
//             {/* Submit Button */}
//             <button className="submitButton" type="submit">Submit</button>
//         </form>
//     );
// }





//import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import defaultImage from './book.png'; // Ensure this path is correct for the default image
import './MyBooks.css';

const isbnValidation = yup.string().matches(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/, 'Invalid ISBN number!').required('ISBN Number is required!');

const ukPostCodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i;

const schema = yup.object().shape({
    isbn: isbnValidation,
    title: yup.string().required('Book Title is required!'),
    author: yup.string().required('Author Name is required!'),
    publisher: yup.string(),
    publishedYear: yup.number().integer().typeError('Invalid year').min(1000).max(new Date().getFullYear()),
    condition: yup.string(),
    genre: yup.string(),
    description: yup.string(),
    postCode: yup.string().matches(ukPostCodeRegex, 'Invalid post code!').required('Post code is required!'),
    contactPreferences: yup.array().min(1, 'At least one contact preference is required!').of(yup.string()),
});

export default function AddingBook() {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            contactPreferences: [],
        }
    });

    const contactPreferences = watch("contactPreferences");
    const isbn = watch('isbn');
    const [coverImagePreview, setCoverImagePreview] = useState(defaultImage);

    useEffect(() => {
        if (isbnValidation.isValidSync(isbn)) {
            axios.get(`https://openlibrary.org/isbn/${isbn}.json`)
                .then(response => {
                    const data = response.data;
                    if (data) {
                        setValue('title', data.title);
    
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
    
                        const coverImageUrl = data.covers && data.covers.length > 0 ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : defaultImage;
                        setCoverImagePreview(coverImageUrl);
                    }
                })
                .catch(() => {
                    setCoverImagePreview(defaultImage);
                });
        }
    }, [isbn, setValue]);

    const watchedCoverImage = watch('coverImage');

    useEffect(() => {
        const coverImageFile = document.getElementById('coverImage')?.files[0]; // Optional chaining for safety
        if (coverImageFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCoverImagePreview(e.target.result);
            };
            reader.readAsDataURL(coverImageFile);
        }
    }, [watchedCoverImage]); // Use the extracted variable in the dependency array


    // useEffect(() => {
    //     const coverImageFile = document.getElementById('coverImage').files[0];
    //     if (coverImageFile) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             setCoverImagePreview(e.target.result);
    //         };
    //         reader.readAsDataURL(coverImageFile);
    //     }
    // }, [watch('coverImage')]);


        const onSubmit = async (data) => {
        const formData = new FormData();

        // Append each form field to formData
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'contactPreferences') {
                formData.append(key, JSON.stringify(value)); // Handle array as JSON string
            } else {
                formData.append(key, value);
            }
        });

        // Handle cover image separately to include either uploaded file or URL
        const coverImageFile = document.getElementById('coverImage').files[0];
        if (coverImageFile) {
            formData.append('coverImage', coverImageFile); // Uploaded file
        }

        try {
            await axios.post('http://localhost:8080/api/books/upload', formData); // URL'i kontrol edin
            // Handle success
            console.log("Book added successfully");
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    // const onSubmit = async (data) => {
    //     const bookId = uuidv4(); // Generate a unique ID for the new book
    //     const formData = new FormData();

    //     // Append each form field to formData
    //     Object.entries(data).forEach(([key, value]) => {
    //         if (key === 'contactPreferences') {
    //             formData.append(key, JSON.stringify(value)); // Handle array as JSON string
    //         } else {
    //             formData.append(key, value);
    //         }
    //     });

    //     // Append the unique ID
    //     formData.append('id', bookId);

    //     // Handle cover image separately to include either uploaded file or URL
    //     const coverImageFile = document.getElementById('coverImage').files[0];
    //     if (coverImageFile) {
    //         formData.append('coverImage', coverImageFile); // Uploaded file
    //     } else {
    //         formData.append('coverImageUrl', coverImagePreview); // Open Library or default image URL
    //     }

    //     try {
    //         await axios.post('http://localhost:8080/api/books', formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' },
    //         });
    //         // Handle success
    //         console.log("Book added successfully");
    //     } catch (error) {
    //         console.error("Error adding book:", error);
    //     }
    // };

    return (
        <form className="adding-book-form" onSubmit={handleSubmit(onSubmit)}>
            {/* ISBN Number */}
            <label className="label">
                ISBN Number*:
                <input className="input" type="text" {...register('isbn')} />
                {errors.isbn && <p className="error-message">{errors.isbn.message}</p>}
            </label>
    
            {/* Book Title */}
            <label className="label">
                Book Title*:
                <input className="input" type="text" {...register('title')} />
                {errors.title && <p className="error-message">{errors.title.message}</p>}
            </label>
    
            {/* Author Name */}
            <label className="label">
                Author Name*:
                <input className="input" type="text" {...register('author')} />
                {errors.author && <p className="error-message">{errors.author.message}</p>}
            </label>
    
            {/* Publisher */}
            <label className="label">
                Publisher:
                <input className="input" type="text" {...register('publisher')} />
            </label>
    
            {/* Published Year */}
            <label className="label">
                Published Year:
                <input className="input" type="number" {...register('publishedYear')} />
            </label>
    
            {/* Condition */}
            <div className="label">Condition:</div>
            <div className="choiceInput">
                <label><input type="radio" value="Like New" {...register('condition')} /> Like New</label>
                <label><input type="radio" value="Very Good" {...register('condition')} /> Very Good</label>
                <label><input type="radio" value="Good" {...register('condition')} /> Good</label>
                <label><input type="radio" value="Acceptable" {...register('condition')} /> Acceptable</label>
            </div>
    
            {/* Genre */}
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
    
            {/* Description */}
            <label className="label">
                Description:
                <textarea className="textarea" {...register('description')}></textarea>
            </label>
    
            {/* Cover Image */}
            <label className="label">
                Cover Image:
                <input id="coverImage" className="input" type="file" {...register('coverImage')} />
                <img src={coverImagePreview} alt="Cover Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />
            </label>
    
            {/* Post Code */}
            <label className="label">
                Post Code*:
                <input className="input" type="text" {...register('postCode')} />
                {errors.postCode && <p className="error-message">{errors.postCode.message}</p>}
            </label>
    
            {/* Contact Preference */}
            <div className="label">How do you prefer users to contact you?*</div>
            <div className="choiceInput">
                <label><input type="checkbox" value="Phone" {...register('contactPreferences')} checked={contactPreferences.includes("Phone")} /> Phone</label>
                <label><input type="checkbox" value="Email" {...register('contactPreferences')} checked={contactPreferences.includes("Email")} /> Email</label>
            </div>
            {errors.contactPreferences && <p className='error-message'>{errors.contactPreferences.message}</p>}
    
            {/* Submit Button */}
            <button className="submitButton" type="submit">Submit</button>
        </form>
    );
    
}
