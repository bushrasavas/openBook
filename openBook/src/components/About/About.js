import React from 'react';
import styles from './about.module.css';

import ourvision from './ourvision.jpeg';
import profile from './profile.jpg';

export default function About() {
    return(
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@800&family=Martian+Mono:wght@100..800&family=Roboto&display=swap" rel="stylesheet"></link>

            { /* There should be a header below this */}

            <div className={styles.aboutpage}>


                <div className={styles.aboutheader}>
                    <div className={styles.aboutheadertext}>
                        <h2>About Us</h2>
                        <p>Welcome to OpenBook where the love for books meets the joy of sharing. We're passionate about creating a community of book lovers who can seamlessly rent or share their favorite reads. Explore a world of stories, connect with fellow readers, and embark on a literary journey with us.</p>
                        <pre>
      __...--~~~~~-._   _.-~~~~~--...__<br/> 
    //               `V'               \\<br/> 
   //                 |                 \\<br/> 
  //__...--~~~~~~-._  |  _.-~~~~~~--...__\\<br/> 
 //__.....----~~~~._\ | /_.~~~~----.....__\\<br/> 
====================\\|//====================<br/> 
                    `---`
                        </pre>
                    </div>
                </div>

                <div className={`${styles.ourvision} ${styles.hiddenx}`}>
                    <img src={ourvision}/>

                    <div className={styles.ourvisiontext}>
                        <h2>Our Vision</h2>
                        <p>At OpenBook, we envision a world where knowledge is freely shared, and education is accessible to all. Our mission is aligned with the UN Sustainable Development Goal for Education. We strive to empower individuals globally by providing a platform that facilitates the free exchange of books, fostering a culture of learning and collaboration. Through our user-friendly interface, users can easily rent or offer books, connect with like-minded individuals, and contribute to a sustainable, knowledge-sharing community. Together, we're building a future where everyone has the opportunity to learn, grow, and discover the transformative power of literature.</p>
                    </div>

                </div>


                <div className={styles.meettheteam}>
                <h2>Meet The Team</h2>
                <div className={styles.teammem}>
                    <div className={styles.mem} alt="profile picture">
                        <img src={profile}/>
                        <h4>Mr. Lmar Momand</h4>
                        <p>Team Member</p>
                    </div>
                    <div className={styles.mem} alt="profile picture">
                        <img src={profile}/>
                        <h4>Ms. Busra Savas</h4>
                        <p>Team Member</p>
                    </div>
                    <div className={styles.mem} alt="profile picture">
                        <img src={profile}/>
                        <h4>Mr. Harsh Singh</h4>
                        <p>Team Member</p>
                    </div>
                    <div className={styles.mem} alt="profile picture">
                        <img src={profile}/>
                        <h4>Ms. Ash Gurung</h4>
                        <p>Team Member</p>
                    </div>
                    <div className={styles.mem} alt="profile picture">
                        <img src={profile}/>
                        <h4>Mr. Mohammad Sadikur Rahman</h4>
                        <p>Team Member</p>
                    </div>
                    <div className={styles.mem} alt="profile picture">
                        <img src={profile}/>
                        <h4>Mr. Walid Chowdhury</h4>
                        <p>Team Member</p>
                    </div>
                    <div className={styles.mem} alt="profile picture">
                        <img src={profile}/>
                        <h4>Mr. Arham Aziz</h4>
                        <p>Team Member</p>
                    </div>
                </div>
                </div>
            </div>
            { /* There should be a footer below this */}
            
        </>
    );
};