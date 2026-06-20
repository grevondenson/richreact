import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
// ...existing code...
import { createCommunityPost, getCommunityPosts, createCommunityComment, getCommunityComments } from '../services/community';
import { toast } from 'react-toastify';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Chip,
  MenuItem
} from '@mui/material';
import { 
  Add as AddIcon,
  QuestionAnswer as QuestionIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const Community = () => {
  const { currentUser, userRole } = useAuth();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({}); // { postId: [comments] }
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Organic chemistry'
  });
  const [replyContent, setReplyContent] = useState({}); // { postId: replyText }

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const postsList = await getCommunityPosts();
      setPosts(postsList);
      // Fetch comments for each post
      const commentsObj = {};
      for (const post of postsList) {
        try {
          commentsObj[post.id] = await getCommunityComments(post.id);
        } catch (commentError) {
          console.error(`Error fetching comments for post ${post.id}:`, commentError);
          toast.error(`Failed to load replies for post ${post.id}: ${commentError.message}`);
          commentsObj[post.id] = [];
        }
      }
      setComments(commentsObj);
    } catch (error) {
      console.error('Error fetching posts:', error);
      if (error.code) {
        toast.error(`Failed to load posts: ${error.code} - ${error.message}`);
      } else {
        toast.error('Failed to load posts');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      await createCommunityPost({
        ...newPost,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email,
        authorRole: userRole
      });
      toast.success('Post created successfully!');
      setOpenDialog(false);
      setNewPost({ title: '', content: '', category: 'Organic chemistry' });
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (postId) => {
    if (!replyContent[postId]) return;
    setLoading(true);
    try {
      await createCommunityComment({
        postId,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email,
        content: replyContent[postId]
      });
      toast.success('Reply posted!');
      setReplyContent((prev) => ({ ...prev, [postId]: '' }));
      fetchPosts();
    } catch (error) {
      console.error('Error posting reply:', error);
      toast.error('Failed to post reply');
    } finally {
      setLoading(false);
    }
  };

  // Like functionality can be added later if needed

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Unknown time';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Community Questions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Ask Question
        </Button>
      </Box>

      {posts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <QuestionIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No questions yet.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Be the first to ask a question and start a discussion!
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Ask First Question
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2">
                          {post.authorName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {post.authorRole === 'teacher' ? 'Teacher' : 'Student'}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip 
                      label={post.category} 
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {post.content}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {formatTimestamp(post.createdAt)}
                    </Typography>
                  </Box>
                  {/* Comments Section */}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Replies:</Typography>
                    {comments[post.id]?.length > 0 ? (
                      comments[post.id].map((comment) => (
                        <Box key={comment.id} sx={{ mb: 1, pl: 2 }}>
                          <Typography variant="body2"><strong>{comment.authorName}:</strong> {comment.content}</Typography>
                          <Typography variant="caption" color="text.secondary">{formatTimestamp(comment.createdAt)}</Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">No replies yet.</Typography>
                    )}
                    {/* Add Reply Form */}
                    {currentUser && (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          fullWidth
                          label="Add a reply"
                          multiline
                          rows={2}
                          value={replyContent[post.id] || ''}
                          onChange={(e) => setReplyContent((prev) => ({ ...prev, [post.id]: e.target.value }))}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{ mt: 1 }}
                          onClick={() => handleReply(post.id)}
                        >
                          Post Reply
                        </Button>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create Post Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create a Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            margin="normal"
            required
            placeholder="What's your post about?"
          />
          <TextField
            fullWidth
            label="Post Details"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            margin="normal"
            multiline
            rows={6}
            required
            placeholder="Provide more details about your post..."
          />
          <TextField
            fullWidth
            label="Category"
            value={newPost.category}
            onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            margin="normal"
            select
            required
          >
            <MenuItem value="Organic chemistry">Organic chemistry</MenuItem>
            <MenuItem value="Inorganic chemistry">Inorganic chemistry</MenuItem>
            <MenuItem value="Physical chemistry">Physical chemistry</MenuItem>
            <MenuItem value="Biochemistry">Biochemistry</MenuItem>
            <MenuItem value="Analytical chemistry">Analytical chemistry</MenuItem>
            <MenuItem value="AP chemistry">AP chemistry</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleCreatePost} 
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Create Post'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Community; 