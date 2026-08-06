import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { glassCardSx } from "../../components/styles";
import { fetchAllPostsForAdmin, createPost, updatePost, deletePost } from "../../api/blog";

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const emptyForm = { title: "", slug: "", excerpt: "", content: "", cover_image_url: "", author: "", published: false };

const AdminBlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    fetchAllPostsForAdmin()
      .then(setPosts)
      .catch(() => setError("Couldn't load posts."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startNew = () => {
    setEditingId("new");
    setForm(emptyForm);
  };

  const startEdit = (post) => {
    setEditingId(post.id);
    setForm({ ...post });
  };

  const cancel = () => {
    setEditingId(null);
    setForm(null);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((f) => ({ ...f, title, slug: editingId === "new" ? slugify(title) : f.slug }));
  };

  const handleSave = async () => {
    setError(null);
    try {
      if (editingId === "new") {
        await createPost(form);
      } else {
        const { id, created_at, updated_at, ...updates } = form;
        await updatePost(id, updates);
      }
      cancel();
      load();
    } catch {
      setError("Couldn't save the post — check the slug is unique.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await deletePost(id);
      load();
    } catch {
      setError("Couldn't delete the post.");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {!form && (
        <Button startIcon={<AddIcon />} variant="contained" onClick={startNew} sx={{ mb: 3 }}>
          New Post
        </Button>
      )}

      {form && (
        <Box sx={{ ...glassCardSx, p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editingId === "new" ? "New Post" : "Edit Post"}
          </Typography>
          <TextField fullWidth label="Title" value={form.title} onChange={handleTitleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Slug" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} sx={{ mb: 2 }} />
          <TextField fullWidth label="Excerpt" value={form.excerpt ?? ""} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} sx={{ mb: 2 }} />
          <TextField fullWidth label="Cover Image URL" value={form.cover_image_url ?? ""} onChange={(e) => setForm((f) => ({ ...f, cover_image_url: e.target.value }))} sx={{ mb: 2 }} />
          <TextField fullWidth label="Author" value={form.author ?? ""} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} sx={{ mb: 2 }} />
          <TextField
            fullWidth
            multiline
            minRows={8}
            label="Content (Markdown)"
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={<Switch checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />}
            label="Published"
            sx={{ mb: 2, display: "block" }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={cancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      <List sx={{ ...glassCardSx, p: 1 }}>
        {posts.length === 0 && (
          <ListItem>
            <ListItemText primary="No posts yet." />
          </ListItem>
        )}
        {posts.map((post) => (
          <ListItem
            key={post.id}
            secondaryAction={
              <>
                <IconButton onClick={() => startEdit(post)} aria-label="Edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(post.id)} aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={`${post.title} ${post.published ? "" : "(draft)"}`}
              secondary={`/blog/${post.slug}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminBlogManager;
