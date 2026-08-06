import { useEffect, useState } from "react";
import { Box, Container, Typography, CircularProgress, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactMarkdown from "react-markdown";
import PageHero from "../components/PageHero";
import PageTransition from "../components/PageTransition";
import BackendNotice from "../components/BackendNotice";
import { sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";
import { fetchPostBySlug } from "../api/blog";
import { isSupabaseConfigured } from "../lib/supabaseClient";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(null);

  usePageTitle(post?.title ?? "Blog");

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    fetchPostBySlug(slug)
      .then(setPost)
      .catch(() => setError("That post couldn't be found."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (!isSupabaseConfigured) {
    return (
      <PageTransition>
        <BackendNotice feature="The blog" />
      </PageTransition>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 16 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <PageTransition>
        <Container maxWidth="sm" sx={{ py: 16, textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {error ?? "Post not found"}
          </Typography>
          <Button variant="contained" onClick={() => navigate("/blog")}>
            Back to Blog
          </Button>
        </Container>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageHero
        eyebrow={new Date(post.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
        title={post.title}
        subtitle={post.author ? `By ${post.author}` : undefined}
      />
      <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          {post.cover_image_url && (
            <Box component="img" src={post.cover_image_url} alt={post.title} sx={{ width: "100%", maxHeight: 420, objectFit: "cover", borderRadius: 4, mb: 5 }} />
          )}
          <Box
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
              "& h1, & h2, & h3": { color: "text.primary", mt: 4, mb: 1.5 },
              "& p": { mb: 2 },
              "& img": { maxWidth: "100%", borderRadius: 2 },
              "& a": { color: "primary.light" },
            }}
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </Box>
          <Button startIcon={<ArrowBackIcon />} sx={{ mt: 5 }} onClick={() => navigate("/blog")}>
            Back to Blog
          </Button>
        </Container>
      </Box>
    </PageTransition>
  );
};

export default BlogPost;
