

import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';
import { submitFeedback, getRecentFeedback } from '../services/feedback';
import { toast } from 'react-toastify';
import './Pricing.css';

const courseLabel = (val) => {
  switch(val) {
    case 'organic': return 'Organic Chemistry';
    case 'physical': return 'Physical Chemistry';
    case 'analytical': return 'Analytical Chemistry';
    case 'general': return 'General Chemistry';
    case 'biochemistry': return 'Biochemistry';
    case 'inorganic': return 'Inorganic Chemistry';
    case 'ap': return 'AP Chemistry';
    default: return val;
  }
};

const initialFeedbackForm = { name: '', email: '', course: '', feedback: '', rating: 0 };


function Pricing() {
  const [activeTab, setActiveTab] = useState('per-session');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState(initialFeedbackForm);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [recentFeedback, setRecentFeedback] = useState([]);

  const handleOpenBooking = () => setBookingOpen(true);
  const handleCloseBooking = () => setBookingOpen(false);

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    getRecentFeedback(5).then(setRecentFeedback);
  }, []);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackForm.name || !feedbackForm.email || !feedbackForm.course || !feedbackForm.feedback || !feedbackForm.rating) {
      toast.error('Please fill in all fields and select a rating.');
      return;
    }
    setSubmittingFeedback(true);
    try {
      await submitFeedback(feedbackForm);
      toast.success('Thank you for your feedback!');
      setFeedbackForm(initialFeedbackForm);
      setRecentFeedback(await getRecentFeedback(5));
    } catch (err) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  return (
    <div className="pricing-page">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"/>
      <section className="hero-pricing">
        <h1 className="hero-title">Master Chemistry with Professional Tutoring</h1>
        <p className="hero-subtitle">Personalized tutoring across all chemistry curricula, from fundamentals to advanced topics.</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleOpenBooking}>Book a Session</button>
          <button className="btn-secondary" onClick={scrollToPricing}>View Pricing</button>
        </div>
        <div className="features">
          <div className="feature-item">
            <i className="fas fa-user-graduate"></i>
            <h3>Expert Tutor</h3>
            <p>Advanced degree in Chemistry with years of teaching experience</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-book"></i>
            <h3>All Curricula</h3>
            <p>Support for all major chemistry curricula and exam preparation</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-clock"></i>
            <h3>Flexible Timing</h3>
            <p>Book sessions at your convenience, including evenings and weekends</p>
          </div>
        </div>
      </section>
      <section id="booking-section" className="booking-section">
        <h2>Book Your Tutoring Session</h2>
        <p>Click below to book your chemistry tutoring session with Dr. Joseph Anjili.</p>
        <button className="btn-primary booking-btn" onClick={handleOpenBooking}>
          Book a Session
        </button>
        <BookingForm
          open={bookingOpen}
          onClose={handleCloseBooking}
          tutorId="main-tutor"
          tutorName="Dr. Joseph Anjili"
        />
      </section>
      <section id="pricing-section" className="pricing">
        <h2 className="pricing-title">Simple, Transparent Pricing</h2>
        <p className="pricing-subtitle">Choose the tutoring package that best fits your learning needs</p>
        <div className="pricing-tabs">
          <button
            className={`tab-button${activeTab === 'per-session' ? ' active' : ''}`}
            onClick={() => setActiveTab('per-session')}
          >
            Pay Per Session
          </button>
          <button
            className={`tab-button${activeTab === 'monthly' ? ' active' : ''}`}
            onClick={() => setActiveTab('monthly')}
          >
            Monthly Subscription
          </button>
        </div>
        {activeTab === 'per-session' && (
        <div className="pricing-options" id="per-session-options">
          <div className="card-pricing">
            <h3>Single Session</h3>
            <p className="price">$45<span>/1 hour</span></p>
            <p className="description">Perfect for tackling a specific topic or question</p>
            <ul>
              <li>One on one tutoring</li>
              <li>Focus on specific topics</li>
              <li>Pre session materials</li>
              <li>Post session notes</li>
              <li>Email support for 24 hours</li>
            </ul>
            <button className="btn-secondary">Book Now</button>
          </div>
          <div className="card-pricing featured">
            <span className="popular-label">Popular</span>
            <h3>Weekly Package</h3>
            <p className="price">$160<span>/4 hours</span></p>
            <p className="description">Consistent support throughout your studies</p>
            <ul>
              <li>Four 1 hour sessions</li>
              <li>Comprehensive topic coverage</li>
              <li>Pre session materials</li>
              <li>Post session notes</li>
              <li>Email support</li>
              <li>Homework review</li>
              <li>10% discount on package</li>
            </ul>
            <button className="btn-primary">Book Now</button>
          </div>
          <div className="card-pricing">
            <h3>Intensive Package</h3>
            <p className="price">$320<span>/10 hours</span></p>
            <p className="description">Deep dive for exam preparation or challenging concepts</p>
            <ul>
              <li>Ten 1 hour sessions</li>
              <li>Comprehensive curriculum coverage</li>
              <li>Custom study plan</li>
              <li>Practice exams</li>
              <li>Advanced problem sets</li>
              <li>Unlimited email support</li>
              <li>Progress tracking</li>
              <li>20% discount on package</li>
            </ul>
            <button className="btn-secondary">Book Now</button>
          </div>
        </div>
        )}
        {activeTab === 'monthly' && (
          <div className="pricing-options" id="monthly-options">
          <div className="card-pricing featured">
            <span className="popular-label">Best Value</span>
            <h3>Monthly Standard</h3>
            <p className="price">$350<span>/month</span></p>
            <p className="description">Up to 3 hours of tutoring per day. Ideal for steady progress and ongoing support.</p>
            <ul>
              <li>3 x 21-days sessions/month</li>
              <li>Flexible scheduling</li>
              <li>Homework & exam help</li>
              <li>Email support</li>
              <li>Session rollover (1 month)</li>
              <li>Progress tracking</li>
            </ul>
            <button className="btn-primary">Subscribe</button>
          </div>
          <div className="card-pricing">
            <h3>Monthly Premium</h3>
            <p className="price">$600<span>/month</span></p>
            <p className="description">Up to 4 hours of tutoring per day. Perfect for exam prep or intensive study.</p>
            <ul>
              <li>4 x 28-days sessions/month</li>
              <li>Priority scheduling</li>
              <li>All Standard features</li>
              <li>Unlimited email support</li>
              <li>Practice exams & feedback</li>
              <li>Custom study plan</li>
            </ul>
            <button className="btn-secondary">Subscribe</button>
          </div>
        </div>
        )}
        <div className="custom-package">
          <p className="custom-title">Need a Custom Plan?</p>
          <p>If you need specialized tutoring for advanced topics or have specific requirements, contact us for a tailored plan.</p>
          <button className="btn-secondary">Contact for Custom Package</button>
        </div>
      </section>
      <section className="feedback">
        <h2 className="feedback-title">Share Your Experience</h2>
        <p>Your feedback helps improve the tutoring experience and assists other students in making informed decisions.</p>
        <div className="feedback-form-container">
          <p>How would you rate your tutoring experience?</p>
          <div className="star-rating">
            {[1,2,3,4,5].map((star) => (
              <span
                key={star}
                className="star"
                style={{ color: star <= (feedbackForm.rating || 0) ? '#e36414' : '#ccc', cursor: 'pointer', fontSize: '2rem' }}
                onClick={() => setFeedbackForm(f => ({ ...f, rating: star }))}
                data-value={star}
              >★</span>
            ))}
          </div>
          <form onSubmit={handleFeedbackSubmit} className="feedback-form">
            <input
              type="text"
              placeholder="Your Name"
              value={feedbackForm.name}
              onChange={e => setFeedbackForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={feedbackForm.email}
              onChange={e => setFeedbackForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <select
              value={feedbackForm.course}
              onChange={e => setFeedbackForm(f => ({ ...f, course: e.target.value }))}
              required
            >
              <option value="" disabled>Select Course</option>
              <option value="organic">Organic Chemistry</option>
              <option value="physical">Physical Chemistry</option>
              <option value="analytical">Analytical Chemistry</option>
              <option value="general">General Chemistry</option>
              <option value="biochemistry">Biochemistry</option>
              <option value="inorganic">Inorganic Chemistry</option>
              <option value="ap">AP Chemistry</option>
            </select>
            <textarea
              placeholder="Your Feedback"
              value={feedbackForm.feedback}
              onChange={e => setFeedbackForm(f => ({ ...f, feedback: e.target.value }))}
              required
            />
            <button type="submit" className="btn-primary" disabled={submittingFeedback}>
              {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
        <div className="recent-feedback">
          <h3>Recent Student Feedback</h3>
          {recentFeedback.length === 0 && <p>No feedback yet. Be the first to share your experience!</p>}
          <div className="feedback-list">
            {recentFeedback.map(fb => (
              <div key={fb.id} className="review-card">
                <p className="review-text">{fb.feedback}</p>
                <p className="reviewer-name"><strong>{fb.name}</strong> <span style={{ color: '#e36414' }}>{'★'.repeat(fb.rating || 0)}</span></p>
                <p className="reviewer-course">{fb.course && courseLabel(fb.course)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const perSession = document.getElementById('per-session-options');
  const monthly = document.getElementById('monthly-options');
  tabButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          tabButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          if (btn.dataset.tab === 'per-session') {
              perSession.style.display = '';
              monthly.style.display = 'none';
          } else {
              perSession.style.display = 'none';
              monthly.style.display = '';
          }
      });
  });
});

document.addEventListener("DOMContentLoaded", function() {
const header = document.querySelector('.main-header');
const hero = document.querySelector('.hero');
// Assume Richmond tutorial card has id="richmond-tutorial"
const richmondTutorial = document.getElementById('RICHMOND TUTORIALS');
if (!header || !hero) return;

// Get the bottom position of the hero section
const heroBottom = hero.offsetTop + hero.offsetHeight;

window.addEventListener('scroll', function() {
if (window.scrollY >= heroBottom) {
  header.classList.add('sticky');
  if (richmondTutorial) richmondTutorial.style.display = 'none';
} else {
  header.classList.remove('sticky');
  if (richmondTutorial) richmondTutorial.style.display = '';
}
});
});

export default Pricing; 