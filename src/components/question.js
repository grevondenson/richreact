import React, { useRef, useState } from 'react';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { questionsCollection } from '../services/questions';
import { toast } from 'react-toastify';
import './questions.css';

const features = [
  {
    icon: 'fa-file-alt',
    title: 'Multi-Format Support',
    desc: 'Ask questions using text, images, videos, audio recordings, or documents',
  },
  {
    icon: 'fa-envelope-open-text',
    title: 'Direct Response',
    desc: 'Get personalized answers sent directly to your email address',
  },
  {
    icon: 'fa-clock',
    title: 'Quick & Easy',
    desc: 'Simple form submission with instant confirmation and fast response times',
  },
];

const QuestionPage = () => {
  const fileInputRef = useRef();
  const [dragActive, setDragActive] = useState(false);
  const [uploadText, setUploadText] = useState('Drag & drop files here, or click to browse');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    subject: '',
    question: '',
    attachments: []
  });
  const [submitting, setSubmitting] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    setUploadText(files.length + ' file(s) selected');
  };
  const handleFileChange = (e) => {
    const files = e.target.files;
    setUploadText(files.length > 0 ? files.length + ' file(s) selected' : 'Drag & drop files here, or click to browse');
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'attachments') {
      setForm((prev) => ({ ...prev, attachments: files }));
      setUploadText(files.length > 0 ? files.length + ' file(s) selected' : 'Drag & drop files here, or click to browse');
    } else {
      setForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(questionsCollection, {
        fullName: form.fullName,
        email: form.email,
        subject: form.subject,
        question: form.question,
        createdAt: serverTimestamp(),
        // attachments: not implemented yet
      });
      toast.success('Question sent successfully!');
      setForm({ fullName: '', email: '', subject: '', question: '', attachments: [] });
      setUploadText('Drag & drop files here, or click to browse');
    } catch (err) {
      toast.error('Failed to send question. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div>
      <section className="hero-ebook">
        <img src="/img/logo.png" alt="Richmond Tutorials Logo" className="hero-logo" />
        <div className="hero-content">
          <h1>Ask Your Chemistry Questions</h1>
          <p>Get expert answers to your chemistry queries</p>
          <p>Whether it's a simple question or a complex problem, we're here to help!</p>
        </div>
      </section>
      <div className="row">
        {features.map((f, idx) => (
          <div className="col-4" key={idx}>
            <i className={`fas ${f.icon} fa-3x mb-3`}></i>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-12">
          <h2>Ask Your Question</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" className="form-control" id="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" className="form-control" id="email" value={form.email} onChange={handleChange} placeholder="Enter your email address" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" className="form-control" id="subject" value={form.subject} onChange={handleChange} placeholder="What's your question about?" required />
            </div>
            <div className="form-group">
              <label htmlFor="question">Your Question</label>
              <textarea className="form-control" id="question" value={form.question} onChange={handleChange} rows="3" placeholder="Describe your question in detail..." required></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="attachments">Attachments (Optional)</label>
              <div
                className={`drag-upload${dragActive ? ' dragover' : ''}`}
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <span className="upload-icon"><i className="fas fa-cloud-upload-alt"></i></span>
                <span id="upload-text">{uploadText}</span>
                <input
                  type="file"
                  id="attachments"
                  multiple
                  ref={fileInputRef}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn-primary" disabled={submitting}>{submitting ? 'Sending...' : 'Send Question'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage; 