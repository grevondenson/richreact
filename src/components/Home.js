import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Schedule as ScheduleIcon } from '@mui/icons-material';
import BookingForm from './BookingForm';
import './Home.css';

const Home = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
  };
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-home"
        style={{
          backgroundImage: "url('/img/herohome.jpg')",
          backgroundColor: '#ffffffff',
          height: '80vh',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <div className="container-hero">
          <img 
            src="/img/logo.png" 
            alt="Richmond Tutorials Logo" 
            className="hero-logo" 
            style={{ width: 'auto', height: 'auto', objectFit: 'contain' }}
          />
          <div className="hero-content-home">
            <h2>"Inspiring Success One Reaction at a Time"</h2>
            <p>
              Embark on your chemistry journey with our comprehensive online course, expertly designed to support beginners, intermediate learners, and professionals alike.
            </p>
            <Button
              variant="contained"
              size="large"
              startIcon={<ScheduleIcon />}
              onClick={handleOpenBooking}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#022f57',
                '&:hover': {
                  backgroundColor: '#d55b0fab'
                },
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              Book a Tutorial Session
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Chemistry Section */}
      <section className="section-white">
        <div className="container-home">
          <h3>Why Choose Chemistry?</h3>
            <p className="description-home">
              Chemistry is the science that has proven over time that indeed, it connects and transforms lives. It drives innovation in the fields like medicine,
              engineering, food science,and offers solution to  environmental concerns. With over 32 years of uninterrupted teaching experience of chemistry, I bring on board 
              motivation, passion and expertise to help students succeed across the  CIE, IB, AP, AQA, OCR, and Edexcel curricula of education.
            </p>
        </div>
      </section>

      {/* Career Possibilities Section */}
      <section className="section-white">
        <div className="container-home">
          <h4>Career Possibilities</h4>
          <div className="career-grid">
            <div className="card-home">
              <i className="fas fa-pills"></i>
              <h5>Pharmaceuticals & Medicine</h5>
              <p>Develop new drugs, advance health-care, and make life-saving discoveries a reality.</p>
            </div>
            <div className="card-home">
              <i className="fas fa-flask"></i>
              <h5>Engineering & Material Science</h5>
              <p> Access innovative advanced materials and nanotechnology for future technological development .</p>
            </div>
            <div className="card-home">
              <i className="fas fa-leaf"></i>
              <h5>Environmental Science</h5>
              <p>Tackle global challenges like climate change, renewable energy, and pollution control in terms of molecular electrostatic interactions & functional group chemistry.</p>
            </div>
            <div className="card-home">
              <i className="fas fa-fingerprint"></i>
              <h5>Forensic Science</h5>
              <p>Solve and document criminal cases through cutting-edge chemical collection, purification and analysis.</p>
            </div>
            <div className="card-home">
              <i className="fas fa-apple-alt"></i>
              <h5>Food Science & Nutrition</h5>
              <p>Ensure human food safety and enhanced progressive nutrition through advanced GMO</p>
            </div>
            <div className="card-home">
              <i className="fas fa-industry"></i>
              <h5>Chemical & Petrochemical Industries</h5>
              <p>Optimize production processes with minimum energy input through innovate sustainable solutions inlcuding the production of affordable bio-diesel fuel.</p>
            </div>
            <div className="card-home">
              <i className="fas fa-atom"></i>
              <h5>Academic & Industrial Research</h5>
              <p>Explore the possible scientific frontiers that can contribute to groundbreaking worthful serendipic discoveries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Sets My Tuition Apart */}
      <section className="section-feature">
        <div className="container-home">
          <h2>What Sets My Tuition Apart?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <i className="fas fa-bolt"></i>
              <h5>Microscopic First-Principle Logic</h5>
              <p>The mastery of the core atomic and molecular electrostatic principles that govern the core quantum mechanism that contributes immensely to the physical realities with a deeper understanding that goes beyond common rote learning, to true comprehensive understanding of natural realities.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-user-circle"></i>
              <h5>Personalized Guidance</h5>
              <p>Delivery of student centered & tailored lessons designed specifically for the student's learning style, pace, and goals aimed to maximize the student's potential.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-bullseye"></i>
              <h5>Comprehensive Exam Preparation</h5>
              <p>The enhancement of the benefits from the targeted exam strategies in both intensive & extensive practices, with insider tips to excel in both students formative and summative  assessments.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-lightbulb"></i>
              <h5>Real-World Applications</h5>
              <p>The identification and solve of the relatable problems from the relatable observations by connecting the chemical concepts to everydays life and the future careers.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-brain"></i>
              <h5>Holistic Skill Development</h5>
              <p>The building of the critical, analytical, and logical skills that shall last a lifetime.</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-chalkboard-teacher"></i>
              <h5>Innovative Teaching Techniques</h5>
              <p>The engagement with interactive pedagogical methods that make complex concepts simpler and comprehensible through innovative audio & visual aids</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Expertise */}
      <section className="section-achievements">
        <div className="container-home">
          <h2>Achievements & Expertise</h2>
          <div className="achievements-grid">
            <div className="achievements-card">
              <i className="fas fa-clock"></i>
              <h5>32 Years of Experience</h5>
              <p>Through decades of dedicated teaching of chemistry, it has resulted into my refinement of the pedagogical methods of enabling the student's to maximizes on their intellectual ability. </p>
            </div>
            <div className="achievements-card">
              <i className="fas fa-book"></i>
              <h5>Curriculum Mastery</h5>
              <p>I have an expertise in the dissemination and impartion of chemistry knowledge of CIE, AP, AQA, OCR and Edexcel Curriculums.</p>
            </div>
            <div className="achievements-card">
              <i className="fas fa-user-graduate"></i>
              <h5>Student Success</h5>
              <p>From my dedication and devotion to chemistry, thousands of students have been successfully empowered to reach their attainable & desirable academic perspectives and career goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-home">
        <div className="contact-info" style={{ color: 'white' }}>
          <h3 style={{ color: 'white' }}>Let's Shape Your Future</h3>
          <p style={{ color: 'white' }}>
            Whether you aim to pursue medicine, engineering, research, or simply wish to achieve academic success that will foster you to make informed decisions to live a quality life, my chemistry tuitions will motivate you to ignite your passion and unlock your potentials to achieve your ambitions.
          </p>
          <div className="contact-details">
            <div><i className="fas fa-phone-alt"></i> +254 723-884067</div>
            <div><i className="fas fa-envelope"></i> anjiljoseph693@gmail.com</div>
            <div><i className="fas fa-globe"></i> <a href="https://richmondtutorials.edu" target="_blank" rel="noopener noreferrer">richmondtutorials.edu</a></div>
          </div>
          <hr />
          <blockquote>
            "Empowering Academic Excellence and Sucess"
          </blockquote>
        </div>
        <form className="contact-form">
          <h4>Get in Touch</h4>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" placeholder="John Doe" required />
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="you@example.com" required />
          <label htmlFor="message">Your Message</label>
          <textarea id="message" rows="4" placeholder="Tell us how we can help you..." required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Booking Form Modal */}
      <BookingForm 
        open={bookingOpen} 
        onClose={handleCloseBooking}
        tutorId="main-tutor"
        tutorName="Dr. Joseph Anjili"
      />
    </>
  );
};

export default Home;