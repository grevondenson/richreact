import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
// Removed debug-contact import (module not found)
import './contact.css';

const profile = {
  name: 'Dr. Joseph Anjili',
  role: 'Professional Educator',
  desc: 'With 32 years of uninterrupted teaching experience, i bring passion, expertise, and first-principle logic to help student master this essential subject.',
  img: '/img/profile.jpg',
  bioLink: '#',
  contactLink: '#',
  socials: [
    { icon: 'fab fa-facebook-f', url: 'https://facebook.com' },
    { icon: 'fab fa-whatsapp', url: 'https://wa.me/254723884067' },
    { icon: 'fas fa-envelope', url: 'mailto:anjiljoseph693@gmail.com' },
    { icon: 'fab fa-linkedin-in', url: 'https://linkedin.com' },
  ],
};

const qualifications = [
  {
    title: 'Senior Researcher',
    desc: 'Lead a team of researchers',
  },
  {
    title: 'Private Tutor',
    desc: 'Hilcrest Academy 2017 – 2021\nDeveloped and nutured student skills in chemistry.',
  },
  {
    title: 'Advisor',
    desc: 'Creative Agency • 2015 – 2017\nadviced the company...'
  },
];

const skills = [
  'Analysis', 'Practical', 'Research', 'Tutoring', 'Lecturing', 'Demonstration'
];

const ContactPage = () => {
  const [tab, setTab] = useState('overview');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('🔄 Contact form submission started...');
    console.log('📋 Form data:', formData);

    try {
      // Validate form data
      if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
        toast.error('Please fill in all fields');
        console.log('❌ Validation failed: Missing required fields');
        setIsSubmitting(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        console.log('❌ Validation failed: Invalid email format');
        setIsSubmitting(false);
        return;
      }

      console.log('✅ Form validation passed');
      console.log('🔥 Attempting to submit to Firestore...');


      // Removed testResult usage (no-undef error)

      // Submit to Firestore
      const docRef = await addDoc(collection(db, 'contact_submissions'), {
        ...formData,
        submittedAt: serverTimestamp(),
        status: 'new', // new, read, replied
        source: 'contact_form'
      });

      console.log('✅ Contact form submitted successfully! Document ID:', docRef.id);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('❌ Error submitting contact form:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Full error object:', error);
      
      // Enhanced error messages based on error type
      if (error.code === 'permission-denied') {
        toast.error('Permission denied. Contact form access is restricted.');
        console.error('🚫 Firestore security rules are denying write access to contact_submissions');
      } else if (error.code === 'unavailable') {
        toast.error('Service temporarily unavailable. Please try again later.');
      } else if (error.code === 'invalid-argument') {
        toast.error('Invalid form data. Please check your inputs.');
      } else if (error.code === 'unauthenticated') {
        toast.error('Authentication required. Please refresh the page.');
      } else {
        toast.error(`Failed to send message: ${error.message}`);
      }
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-contact shadow-dark">
      {/* Sidebar/Profile */}
      <aside className="sidebar-contact">
        <div className="profile-card">
          <div className="profile-img" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/profile.jpg)` }}></div>
          <h2>{profile.name}</h2>
          <p className="role">{profile.role}</p>
          <p className="desc">{profile.desc}</p>
          <div className="profile-actions">
            <a href={profile.bioLink} className="btn btn-cv"><i className="fa-solid fa-file-arrow-down"></i> Professional Bio</a>
            <a href={profile.contactLink} className="btn btn-contact"><i className="fa-solid fa-envelope"></i> Contact</a>
          </div>
        </div>
        <div className="connect-card">
          <h3>Connect With Me</h3>
          <div className="social-links">
            {profile.socials.map((s, idx) => (
              <a href={s.url} target="_blank" rel="noopener noreferrer" key={idx}><i className={s.icon}></i></a>
            ))}
          </div>
          <p className="connect-desc">Feel free to connect with me on any of these platforms!</p>
        </div>
      </aside>
      {/* Main Content */}
      <main className="main-content">
        {/* Qualifications Section */}
        <section className="qualifications">
          <div className="qual-tabs">
            <button className={`tab${tab === 'overview' ? ' active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
            <button className={`tab${tab === 'skills' ? ' active' : ''}`} onClick={() => setTab('skills')}>Skills</button>
          </div>
          {tab === 'overview' && (
            <div className="qual-content" id="overview">
              {qualifications.map((job, idx) => (
                <div className="job" key={idx}>
                  <h4>{job.title}</h4>
                  <p>{job.desc.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                </div>
              ))}
            </div>
          )}
          {tab === 'skills' && (
            <div className="qual-content" id="skills">
              <ul className="skills-list">
                {skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
              </ul>
            </div>
          )}
        </section>
        {/* Contact Form Section */}
        <section className="contact-home">
          <div className="contact-info">
            <strong>Get In Touch</strong>
            <span>
              Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.
            </span>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div style={{ flex: 1 }}>
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label>Subject</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="How can I help you?"
                required
              />
            </div>
            <div>
              <label>Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message here..."
                rows="5"
                required
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              <i className="fa fa-paper-plane" style={{ marginRight: 8 }}></i>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ContactPage; 