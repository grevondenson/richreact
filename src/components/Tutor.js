import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getLessons } from "../services/firestore";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Container, Card, CardContent, Typography, Button, Tabs, Tab, Box } from "@mui/material";
import { toast } from "react-toastify";
import './Tutor.css';

const Tutor = () => {
  // State for Firestore lessons
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [tab, setTab] = useState("lesson");
  const [loading, setLoading] = useState(false);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const data = await getLessons();
      setLessons(data);
      console.log("Fetched lessons:", data);
    } catch (error) {
      toast.error(error.message);
      console.error("Error fetching lessons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
    // eslint-disable-next-line
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleDownload = async (lessonId, fileURL) => {
    if (!currentUser) {
      toast.error("Please log in to download");
      return;
    }
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        downloads: arrayUnion({ resourceId: lessonId, timestamp: new Date() }),
        "resourceUsage.totalDownloads": increment(1),
      });
      window.open(fileURL, "_blank");
      toast.success("Content downloaded!");
    } catch (error) {
      toast.error(error.message);
      console.error("Download tracking error:", error);
    }
  };

  const filteredLessons = lessons.filter((lesson) => lesson.type === tab || (tab === "lesson" && lesson.type === "schedule"));

  return (
    <div className="tutor-page">
      <div className="container-tutor">
        <div className="text-section">
          <span className="badge">Professional Chemistry Tutorials</span>
          <h1>
            Master Chemistry With <br />
            <span className="highlight">Dr. Joseph Anjili</span>
          </h1>
          <p>
            With over 32 years of experience mastering all major chemistry curriculums, I bring a wealth of expertise to every lesson, ensuring students receive guidance that is both comprehensive and deeply informed. My specialization in private tutoring allows me to deliver a unique, individualized approach—tailoring each session to the specific learning needs and goals of my students. This personalized method not only simplifies complex concepts but also empowers learners at every level, from high school to university, to achieve their full potential in chemistry
          </p>
          <div className="buttons">
            <button className="primary-btn">Book a Session →</button>
            <button className="secondary-btn" onClick={() => navigate('/pricing')}>View Pricing</button>
          </div>
          <div className="features-row">
            <div className="feature">
              <span className="icon" role="img" aria-label="microscope">🔬</span>
              <div>
                <strong>Qualified Professional Teacher </strong><br />
                Certified professional teacher of  Chemistry with 32 years of experience
              </div>
            </div>
            <div className="feature">
              <span className="icon" role="img" aria-label="book">📘</span>
              <div>
                <strong>Customised Curriculum</strong><br />
                Tailored & personalized tothe learners potential, pace and needs
              </div>
            </div>
          </div>
        </div>
        <div className="image-section">
          <img src="/img/profile.jpg" alt="Tutoring session" />
          <div className="session-info">Inspiring Success One Reaction at a Time</div>
        </div>
      </div>

      {/* Dynamic Lessons/Videos Section */}
      <Container role="region" aria-label="Lessons and Videos Section" sx={{ mt: 4 }}>
        <Tabs value={tab} onChange={handleTabChange} aria-label="Lesson type tabs">
          <Tab label="Upcoming Lessons" value="lesson" aria-label="View upcoming lessons" />
          <Tab label="Videos" value="video" aria-label="View videos" />
        </Tabs>
        <h3>{tab === "lesson" ? "Upcoming Lessons" : "Videos"}</h3>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : filteredLessons.length === 0 ? (
          <Typography>No {tab}s available</Typography>
        ) : null}
        <Box display="flex" flexWrap="wrap" gap={2}>
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} sx={{ minWidth: 275, flex: '1 1 300px', mt: 2 }} role="article" aria-label={`Lesson: ${lesson.title}`}>
              <CardContent>
                <Typography variant="h6">{lesson.title}</Typography>
                <Typography color="textSecondary">Type: {lesson.type}</Typography>
                {lesson.date && (
                  <Typography color="textSecondary">Date: {lesson.date}</Typography>
                )}
                {lesson.time && (
                  <Typography color="textSecondary">Time: {lesson.time}</Typography>
                )}
                {lesson.info && (
                  <Typography color="textSecondary" sx={{ mt: 1 }}>
                    {lesson.info}
                  </Typography>
                )}
                {lesson.fileURL && (
                  <Button
                    variant="contained"
                    onClick={() => handleDownload(lesson.id, lesson.fileURL)}
                    sx={{ mt: 1, backgroundColor: '#022f57' }}
                    aria-label={`Download ${lesson.title}`}
                  >
                    Download
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default Tutor; 