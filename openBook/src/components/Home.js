import React from 'react'
import Slider from 'react-slick'
import '../components/Banner.css'


export const Home = () => {

    const data =[
        {
            id: 1,
            img: 'https://as2.ftcdn.net/v2/jpg/04/03/15/39/1000_F_403153989_K6GwszyZXKOgXc0P9KpZwOZqSXTvl6aw.jpg'
        },

        {
            id: 2,
            img: 'https://img.freepik.com/premium-vector/book-exchange-landing-page-template-bookcrossing-vector-illustration-banner-education-knowledge-concept-diverse-hands-holding-books-swap-literature-event-library-day-culture-festival_534430-1064.jpg?w=1380'
        },

        {
            id: 3,
            img: 'https://bookscouter.com/blog/wp-content/uploads/2022/10/BookScouter-Blog-Sara-3.png'
        }
    ]

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <div className='banner'>
            <Slider className='banner' {...settings}>
                {
                    data.map(item=>{
                        return(
                            <div className='imgcont' key={item.id}>
                                <img src={item.img} alt='noimg'/>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default Home;