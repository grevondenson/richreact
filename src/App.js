import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Home from './components/Home';
import Curri from './components/Curri';
import { useEffect } from 'react';
import Footer from './components/Footer';
import Tutor from './components/Tutor';
import Pricing from './components/Pricing';
import Pdf from './components/Pdf';
import Ebook from './components/Ebooks';
import Notes from './components/notes';
import Syllabus from './components/syllabus';
import Exam from './components/exam';
import PapersLanding from './components/PapersLanding';
import Examiner from './components/examiner';
import Video from './components/video';
import Faq from './components/faq';
import Question from './components/question';
import Contact from './components/contact';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import Resources from './components/Resources';
import Community from './components/Community';
import ResourceViewer from './components/ResourceViewer';
import ResourceFolderViewer from './components/ResourceFolderViewer';
import AdminPanel from './components/AdminPanel';
import authImg from './assets/img/auth.jpg';

// Import toast styles
import 'react-toastify/dist/ReactToastify.css';

// Create theme with Richmond Tutorial Hub colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#022f57', // Deep blue
    },
    secondary: {
      main: '#e36414', // Orange
    },
    background: {
      default: '#fdfdfd', // White
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function AppWrapper() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  useEffect(() => {
    // Firebase initialization (already in firebase.js)
  }, []);

  const content = (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curri" element={<Curri />} />
        <Route path="/tutorial" element={<Tutor />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/pdf" element={<ProtectedRoute><Pdf /></ProtectedRoute>} />
        <Route path="/ebook" element={<ProtectedRoute><Ebook /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/syllabus" element={<ProtectedRoute><Syllabus /></ProtectedRoute>} />
        <Route path="/exam" element={<ProtectedRoute><Exam /></ProtectedRoute>} />
        <Route path="/papers" element={<ProtectedRoute><PapersLanding /></ProtectedRoute>} />
        <Route path="/examiner" element={<ProtectedRoute><Examiner /></ProtectedRoute>} />
        <Route path="/video" element={<ProtectedRoute><Video /></ProtectedRoute>} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/question" element={<ProtectedRoute><Question /></ProtectedRoute>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/resource/view/:fileId" element={<ProtectedRoute><ResourceViewer /></ProtectedRoute>} />
        <Route path="/resource/folder" element={<ProtectedRoute><ResourceFolderViewer /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['teacher']}><AdminPanel /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      </Routes>
      <Footer />
    </>
  );

  return isLogin ? (
    <div
      style={{
        backgroundImage: `url(${authImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      {content}
    </div>
  ) : (
    <div className="App">{content}</div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppWrapper />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 9999,
              margin: 0,
              padding: 0
            }}
            toastStyle={{
              margin: '0 0 10px 0',
              padding: 0
            }}
            containerStyle={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 9999,
              margin: 0,
              padding: 0,
              pointerEvents: 'auto'
            }}
          />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
