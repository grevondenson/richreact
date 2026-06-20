import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Add storage import
import { lessonsCollection, storage } from "../services/firestore"; // Import storage
import {
  TextField,
  Button,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";

const TeacherUploadForm = ({ lessonToEdit = null, onSuccess, onCancel, initialType }) => {
  const { currentUser, userRole } = useAuth();
  const [title, setTitle] = useState(lessonToEdit?.title || "");
  const [type, setType] = useState(lessonToEdit?.type || initialType || "lesson");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState(lessonToEdit?.date || "");
  const [time, setTime] = useState(lessonToEdit?.time || "");
  const [externalUrl, setExternalUrl] = useState(lessonToEdit?.fileURL || "");
  const [uploadMethod, setUploadMethod] = useState(lessonToEdit?.fileURL ? "external" : "none"); // Default to none (text only)
  const [info, setInfo] = useState(lessonToEdit?.info || "");

  const handleSubmit = async () => {
    if (!currentUser || userRole !== "teacher") { // Changed to "teacher" for clarity
      toast.error("Only teachers can upload content");
      return;
    }
    if (!title) {
      toast.error("Title is required");
      return;
    }
    if (uploadMethod === "external" && !externalUrl) {
      toast.error("Please provide an external URL");
      return;
    }
    if (uploadMethod === "file" && !file) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
      let fileURL = lessonToEdit?.fileURL || "";

      if (uploadMethod === "external" && externalUrl) {
        fileURL = externalUrl;
      } else if (uploadMethod === "file" && file) {
        const fileRef = ref(storage, `lessons/${currentUser.uid}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        fileURL = await getDownloadURL(snapshot.ref);
      }

      const lessonData = {
        title,
        type,
        fileURL,
        teacherId: currentUser.uid,
        createdAt: new Date(),
        ...(type === "lesson" || type === "schedule" ? { date, time, info } : {}),
      };

      if (lessonToEdit) {
        await updateDoc(doc(lessonsCollection, lessonToEdit.id), lessonData);
        toast.success("Content updated successfully!");
      } else {
        await addDoc(lessonsCollection, lessonData);
        toast.success("Content uploaded successfully!");
      }

      setTitle("");
      setType("lesson");
      setFile(null);
      setExternalUrl("");
      setUploadMethod("none");
      setDate("");
      setTime("");
      setInfo("");
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Upload error:", error);
      
      if (error.code === 'permission-denied') {
        toast.error("Permission denied. Please check Firebase rules or contact admin.");
      } else if (error.code === 'unauthenticated') {
        toast.error("You need to be logged in to upload content.");
      } else if (error.message.includes('Missing or insufficient permissions')) {
        toast.error("Database permission error. Please contact admin to update Firebase rules.");
      } else {
        toast.error(`Upload failed: ${error.message}`);
      }
    }
  };

  return (
    <Container maxWidth="sm" role="region" aria-label="Teacher Upload Form">
      <h2>{lessonToEdit ? "Update Content" : "Upload Content"}</h2>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        aria-label="Content title"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Type"
          aria-label="Content type"
        >
          <MenuItem value="lesson">Upcoming Lesson</MenuItem>
          <MenuItem value="schedule">Schedule Session</MenuItem>
          <MenuItem value="video">Video</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Upload Method</InputLabel>
        <Select
          value={uploadMethod}
          onChange={(e) => setUploadMethod(e.target.value)}
          label="Upload Method"
        >
          <MenuItem value="none">Text Only (No File)</MenuItem>
          <MenuItem value="external">External Link</MenuItem>
          <MenuItem value="file">Upload File</MenuItem>
        </Select>
      </FormControl>

      {uploadMethod === "external" && (
        <TextField
          label="File URL (Google Drive, GitHub, etc.)"
          value={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="https://drive.google.com/... or https://github.com/..."
          helperText="Upload your file to Google Drive or GitHub and paste the direct link here"
        />
      )}

      {uploadMethod === "file" && (
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ margin: "16px 0", width: "100%" }}
          accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.mov"
        />
      )}

      {(type === "lesson" || type === "schedule") && (
        <>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Additional Info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        </>
      )}
      
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!title || (uploadMethod === "external" && !externalUrl) || (uploadMethod === "file" && !file)}
        sx={{ mt: 2 }}
        aria-label={lessonToEdit ? "Update content" : "Upload content"}
      >
        {lessonToEdit ? "Update" : "Upload"}
      </Button>
      {lessonToEdit && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          sx={{ mt: 2, ml: 2 }}
          aria-label="Cancel edit"
        >
          Cancel
        </Button>
      )}
    </Container>
  );
};

export default TeacherUploadForm;