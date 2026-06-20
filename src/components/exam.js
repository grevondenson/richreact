import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './notes.css'; // Using the same CSS file

const ExamQuestionsPage = () => {
  const [examQuestions, setExamQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data for exam questions matching your HTML structure
  useEffect(() => {
    const mockExamQuestions = [
      { id: 1, title: "(Organic) Carbonly compounds", url: "https://drive.google.com/drive/folders/1g5BAxdnciyhCQzCtYVuVa9_5v2ZJtk_T?usp=drive_link" },
      { id: 2, title: "(Organic) Carboxylic acids & derivatives", url: "https://drive.google.com/file/d/17i7hlfeiKinsG-XIlA6V6LhCTls0Z0TA/view?usp=drive_link" },
      { id: 3, title: "(Organic) Halogen derivatives", url: "https://drive.google.com/file/d/1PzOVbRbPRHlkjbTQnRWHsfw8imxW5wOK/view?usp=drive_link" },
      { id: 4, title: "(Organic) Hydrocarbons", url: "https://drive.google.com/file/d/1f-CQGJX2OiM0xkFtVmnFp4o77iVq3UA4/view?usp=drive_link" },
      { id: 5, title: " (Organic) Hydroxyl compounds", url: "https://drive.google.com/file/d/1n8-7hrcAT34TEysWxxyDYLKJ88xRGlkb/view?usp=drive_link" },
      { id: 6, title: "(Organic) Intro to organic chemistry", url: "https://drive.google.com/file/d/1yiXm6n_W2l0t1pElr5bqA85dD538hhX_/view?usp=drive_link" },
      { id: 7, title: "Atomic structure", url: "https://drive.google.com/file/d/1MkphbQI7iuWUEz33vuKh4XTqLvoDRS1V/view?usp=drive_link" },
      { id: 8, title: "Atomic structure 2", url: "https://drive.google.com/file/d/1cYUKe-0SLpL7Zvu0cHVnFksQ9LBLQCHo/view?usp=drive_linkhttps://drive.google.com/drive/folder_link_here_2" },
      { id: 9, title: "Chemical bonding", url: "https://drive.google.com/file/d/1eMmEr5K4UM1rRX1PaQBtLL72CTXkd8nB/view?usp=drive_link" },
      { id: 10, title: "Chemical equilibria", url: "https://drive.google.com/file/d/197jn14kFvUxKSNeDKFk7QHa12vxtrnEs/view?usp=drive_link" },
      { id: 11, title: "Electrochemistry", url: "https://drive.google.com/file/d/1Tbm59n0IAGEjYwi1mid92O88vgaVt4yo/view?usp=drive_link" },
      { id: 12, title: "Energy changes ", url: "https://drive.google.com/file/d/16kBwaaNPA-MuxNwUsmGKGW3ibPocTw7E/view?usp=drive_link" },
      { id: 13, title: "Inorganic chemistry", url: "https://drive.google.com/file/d/1SZWDz-1cVxrLFOcYL2y17ktDdsg7TpPr/view?usp=drive_link" },
      { id: 14, title: "Moles", url: "https://drive.google.com/file/d/1JNZJia5WpK-l7UPzH6Ovnd9vCkZU2Rpu/view?usp=drive_link" },
      { id: 15, title: "Reaction Kinetics", url: "https://drive.google.com/file/d/1lf9jKrbPL7Ulq7XbIziMahJP7ZRANlzf/view?usp=drive_link" },
      { id: 16, title: "State of matter", url: "https://drive.google.com/file/d/1wfxykn-cAgmHHQUWTqgKudlOjDFRRf3i/view?usp=drive_link" },
      { id: 17, title: "Sulphur, Nitrogen ", url: "https://drive.google.com/file/d/1xO7mfxHXXR4X_N6_vB58fvoiso0Yl1V8/view?usp=drive_link" },
      { id: 18, title: "Calculations in chemistry", url: "https://drive.google.com/file/d/1N7oKt3YIBnqKylXR7pVq2JcPN8ihDkMw/view?usp=drive_link" },
      { id: 19, title: "Intro to Periodic Table", url: "https://drive.google.com/file/d/1gTZMgS0UbojuFIan_OdpLZOTjLjtfGxs/view?usp=drive_link" },
      { id: 20, title: "Reaction of acids ", url: "https://drive.google.com/file/d/16QocRT0aNa3W7vtqYe_zjUvfiuwIc33F/view?usp=drive_link" },
      { id: 21, title: "Reversible reactions, chemical equillibrium", url: "https://drive.google.com/file/d/1L0Rwt5D_LHIfxF5_Ay4BaKpUkboEC9HB/view?usp=drive_link" },
      { id: 22, title: "Reactivity series & corrosion of metals", url: "https://drive.google.com/file/d/11zmuPeTuaqie9YKW49r0oYGa84ZSJRER/view?usp=drive_link" },
      { id: 23, title: "States of matter ", url: "https://drive.google.com/file/d/1AmIouT3P_kQZECbbbwEwawpPRTNQWnPs/view?usp=drive_link" },
      { id: 24, title: "Transition Metals", url: "https://drive.google.com/file/d/12Z80fh8Qc3JjKlmSwA1ktje34ASSx_cK/view?usp=drive_link" }, 
    ];
    setExamQuestions(mockExamQuestions);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Simulate loading
    const mockExamQuestions = [
      { id: 1, title: "(Organic) Carbonly compounds", url: "https://drive.google.com/drive/folders/1g5BAxdnciyhCQzCtYVuVa9_5v2ZJtk_T?usp=drive_link" },
      { id: 2, title: "(Organic) Carboxylic acids & derivatives", url: "https://drive.google.com/file/d/17i7hlfeiKinsG-XIlA6V6LhCTls0Z0TA/view?usp=drive_link" },
      { id: 3, title: "(Organic) Halogen derivatives", url: "https://drive.google.com/file/d/1PzOVbRbPRHlkjbTQnRWHsfw8imxW5wOK/view?usp=drive_link" },
      { id: 4, title: "(Organic) Hydrocarbons", url: "https://drive.google.com/file/d/1f-CQGJX2OiM0xkFtVmnFp4o77iVq3UA4/view?usp=drive_link" },
      { id: 5, title: " (Organic) Hydroxyl compounds", url: "https://drive.google.com/file/d/1n8-7hrcAT34TEysWxxyDYLKJ88xRGlkb/view?usp=drive_link" },
      { id: 6, title: "(Organic) Intro to organic chemistry", url: "https://drive.google.com/file/d/1yiXm6n_W2l0t1pElr5bqA85dD538hhX_/view?usp=drive_link" },
      { id: 7, title: "Atomic structure", url: "https://drive.google.com/file/d/1MkphbQI7iuWUEz33vuKh4XTqLvoDRS1V/view?usp=drive_link" },
      { id: 8, title: "Atomic structure 2", url: "https://drive.google.com/file/d/1cYUKe-0SLpL7Zvu0cHVnFksQ9LBLQCHo/view?usp=drive_linkhttps://drive.google.com/drive/folder_link_here_2" },
      { id: 9, title: "Chemical bonding", url: "https://drive.google.com/file/d/1eMmEr5K4UM1rRX1PaQBtLL72CTXkd8nB/view?usp=drive_link" },
      { id: 10, title: "Chemical equilibria", url: "https://drive.google.com/file/d/197jn14kFvUxKSNeDKFk7QHa12vxtrnEs/view?usp=drive_link" },
      { id: 11, title: "Electrochemistry", url: "https://drive.google.com/file/d/1Tbm59n0IAGEjYwi1mid92O88vgaVt4yo/view?usp=drive_link" },
      { id: 12, title: "Energy changes ", url: "https://drive.google.com/file/d/16kBwaaNPA-MuxNwUsmGKGW3ibPocTw7E/view?usp=drive_link" },
      { id: 13, title: "Inorganic chemistry", url: "https://drive.google.com/file/d/1SZWDz-1cVxrLFOcYL2y17ktDdsg7TpPr/view?usp=drive_link" },
      { id: 14, title: "Moles", url: "https://drive.google.com/file/d/1JNZJia5WpK-l7UPzH6Ovnd9vCkZU2Rpu/view?usp=drive_link" },
      { id: 15, title: "Reaction Kinetics", url: "https://drive.google.com/file/d/1lf9jKrbPL7Ulq7XbIziMahJP7ZRANlzf/view?usp=drive_link" },
      { id: 16, title: "State of matter", url: "https://drive.google.com/file/d/1wfxykn-cAgmHHQUWTqgKudlOjDFRRf3i/view?usp=drive_link" },
      { id: 17, title: "Sulphur, Nitrogen ", url: "https://drive.google.com/file/d/1xO7mfxHXXR4X_N6_vB58fvoiso0Yl1V8/view?usp=drive_link" },
      { id: 18, title: "Calculations in chemistry", url: "https://drive.google.com/file/d/1N7oKt3YIBnqKylXR7pVq2JcPN8ihDkMw/view?usp=drive_link" },
      { id: 19, title: "Intro to Periodic Table", url: "https://drive.google.com/file/d/1gTZMgS0UbojuFIan_OdpLZOTjLjtfGxs/view?usp=drive_link" },
      { id: 20, title: "Reaction of acids ", url: "https://drive.google.com/file/d/16QocRT0aNa3W7vtqYe_zjUvfiuwIc33F/view?usp=drive_link" },
      { id: 21, title: "Reversible reactions, chemical equillibrium", url: "https://drive.google.com/file/d/1L0Rwt5D_LHIfxF5_Ay4BaKpUkboEC9HB/view?usp=drive_link" },
      { id: 22, title: "Reactivity series & corrosion of metals", url: "https://drive.google.com/file/d/11zmuPeTuaqie9YKW49r0oYGa84ZSJRER/view?usp=drive_link" },
      { id: 23, title: "States of matter ", url: "https://drive.google.com/file/d/1AmIouT3P_kQZECbbbwEwawpPRTNQWnPs/view?usp=drive_link" },
      { id: 24, title: "Transition Metals", url: "https://drive.google.com/file/d/12Z80fh8Qc3JjKlmSwA1ktje34ASSx_cK/view?usp=drive_link" }, 
    ];
    setTimeout(() => {
      setExamQuestions(mockExamQuestions);
      setLoading(false);
    }, 1000);
  }, []);

  // Helper to extract fileId from Google Drive file URL
  const getDriveFileId = (url) => {
    const match = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    return match ? match[1] : null;
  };

  const handleCardClick = (item) => {
    const fileId = getDriveFileId(item.url);
    if (fileId) {
      navigate(`/resource/view/${fileId}?title=${encodeURIComponent(item.title)}`);
    } else {
      // For folders or other links, navigate to a folder viewer route
      navigate(`/resource/folder?url=${encodeURIComponent(item.url)}&title=${encodeURIComponent(item.title)}`);
    }
  };

  if (loading) {
    return (
      <div className="notes-page">
        <div className="container-notes">
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading exam questions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="notes-page">
      <div className="container-notes">
        <section className="hero-notes">
          <div className="hero-notes-text">
            <h1>Exam Questions</h1>
            <p>
              <strong>Master Chemistry Revision with exams</strong><br />
              Focus solely on what matters for your Chemistry exams. Our exam questions are designed in line with your exam board, ensuring you practice exactly what you need
            </p>
          </div>
          <div className="hero-notes-image">
            <img
              src="/img/exams.png"
              alt="Chemistry Exam Questions Hero"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </section>
        <main>
          {examQuestions.length === 0 && <div className="question">No exam questions available.</div>}
          {examQuestions.map((item) => (
            <div
              key={item.id}
              className="ebook-item"
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(item)}
            >
              <div style={{ flex: 1, fontWeight: 600 }}>{item.title}</div>
              <span style={{ marginLeft: 16, color: "#2563eb" }}>View</span>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default ExamQuestionsPage;