import { useEffect, useState } from "react";
import { Box, Container, Grid2, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PageTransition from "../components/PageTransition";
import BackendNotice from "../components/BackendNotice";
import { glassCardSx, sectionSx } from "../components/styles";
import usePageTitle from "../hooks/usePageTitle";
import { fetchPublishedPosts } from "../api/blog";
import { isSupabaseConfigured } from "../lib/supabaseClient";

const Blog = () => {
  usePageTitle("Blog");
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchPublishedPosts()
      .then(setPosts)
      .catch(() => setError("Couldn't load posts right now."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <PageHero eyebrow="TEAM UPDATES" title="Blog" subtitle="Season updates, build notes, and stories from Action Robotix." />

      {!isSupabaseConfigured ? (
        <BackendNotice feature="The blog" />
      ) : (
        <Box sx={{ ...sectionSx, pb: { xs: 10, md: 14 } }}>
          <Container maxWidth="lg">
            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "center" }}>
                {error}
              </Typography>
            )}
            {!loading && !error && posts.length === 0 && (
              <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "center" }}>
                No posts yet — check back soon.
              </Typography>
            )}
            <Grid2 container spacing={4}>
              {posts.map((post, i) => (
                <Grid2 key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Reveal delay={i * 0.08}>
                    <Box
                      onClick={() => navigate(`/blog/${post.slug}`)}
                      sx={{ ...glassCardSx, height: "100%", cursor: "pointer", overflow: "hidden", display: "flex", flexDirection: "column" }}
                    >
                      {post.cover_image_url && (
                        <Box component="img" src={post.cover_image_url} alt={post.title} sx={{ width: "100%", height: 180, objectFit: "cover" }} />
                      )}
                      <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          {new Date(post.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                          {post.author ? ` · ${post.author}` : ""}
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 0.5, mb: 1 }}>
                          {post.title}
                        </Typography>
                        {post.excerpt && (
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {post.excerpt}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Reveal>
                </Grid2>
              ))}
            </Grid2>
          </Container>
        </Box>
      )}
    </PageTransition>
  );
};

export default Blog;
