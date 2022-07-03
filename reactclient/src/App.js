import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Constants from "./utilities/Constants";
import PostCreateForm from "./components/PostCreateForm";
import PostUpdateForm from "./components/PostUpdateForm";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function App() {
  const [posts, setPosts] = useState([]);
  const [showingCCreateNewPostForm, setShowingCCreateNewPostForm] =
    useState(false);

  const [postCurrentlyBeingUpdated, setPostCurrentlyBeingUpdated] =
    useState(null);

  const [updatePost, setUpdatePost] = useState(true);
  const [updatePostId, setUpdatePostId] = useState(null);

  const initialFormData = Object.freeze({
    postId: "",
    title: "",
    content: "",
  });
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData);
  };

  function getPosts() {
    const url = Constants.API_URL_GET_ALL_POSTS;

    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((postsFromServer) => {
        console.log(postsFromServer);
        setPosts(postsFromServer);
      })
      .catch((err) => console.debug(err));
  }

  function deletePost(postId) {
    const url = `${Constants.API_URL_DELETE_POST_BY_ID}/${postId}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onPostDelete(postId);
      })
      .catch((err) => console.debug(err));
  }

  const handleUpdateChange = (e) => {
    setUpdatePostId(e);
    console.log(updatePostId);
    console.log(e);
  };

  const handleUpdate = (postId) => {
    setFormData({ ...formData, ["postId"]: postId });
    console.log(formData);
  };

  return (
    <Grid container spacing={2}>
      {showingCCreateNewPostForm === false &&
        postCurrentlyBeingUpdated === null && (
          <>
            <Grid item xs={12}>
              <Typography
                mt={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "700",
                }}
              >
                ASP.NET CURD DEMO
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" onClick={getPosts}>
                GET ALL POSTS
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setShowingCCreateNewPostForm(true);
                }}
                className="btn btn-secondary btn-lg w-100 mt-4"
              >
                CREATE NEW POST
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Button
                onClick={() => setPosts([])}
                className="btn btn-dark btn-lg w-100 "
              >
                Empty React Array
              </Button>
            </Grid>
          </>
        )}

      {posts.length > 0 &&
        showingCCreateNewPostForm === false &&
        postCurrentlyBeingUpdated === null &&
        renderPostTable()}

      {showingCCreateNewPostForm && (
        <PostCreateForm onPostCreated={onPostCreated} />
      )}

      {postCurrentlyBeingUpdated !== null && (
        <PostUpdateForm
          post={postCurrentlyBeingUpdated}
          onPostUpdated={onPostUpdated}
        />
      )}
    </Grid>
  );

  function renderPostTable() {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ margin: 20 }}>
          <Paper sx={{ width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Post ID (PK)</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Content</TableCell>
                  <TableCell align="left">CRUD operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post, i) => (
                  <TableRow key={post.postId}>
                    <TableCell scope="row">{post.postId}</TableCell>
                    {i !== updatePostId ? (
                      <>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.content}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell
                          placeholder={post.title}
                          value={formData.title}
                          name="title"
                          type="text"
                          onChange={handleChange}
                        />

                        <TableCell
                          placeholder={post.content}
                          value={formData.content}
                          name="content"
                          type="text"
                          onChange={handleChange}
                        />
                      </>
                    )}
                    <TableCell>
                      <Button
                        onClick={() => setPostCurrentlyBeingUpdated(post)}
                      >
                        Update
                      </Button>
                      {i === updatePostId && (
                        <>
                          <Button onClick={() => handleUpdate(post.postId)}>
                            Change
                          </Button>
                          <Button
                            onClick={() => {
                              setUpdatePostId(null);
                              setFormData(initialFormData);
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      <Button
                        onClick={() => {
                          window.confirm(
                            `Do you want to delete "${post.title}"?`
                          ) && deletePost(post.postId);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  function onPostCreated(createdPost) {
    setShowingCCreateNewPostForm(false);
    if (createdPost === null) return;
    alert("Post Successfully");

    getPosts();
  }

  function onPostUpdated(updatedPost) {
    setPostCurrentlyBeingUpdated(null);

    if (updatePost === null) return;

    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.postId === updatedPost.postId) {
        return true;
      }
    });
    if (index !== -1) {
      postsCopy[index] = updatedPost;
    }

    setPosts(postsCopy);

    alert("Post Successfully Updated");
  }

  function onPostDelete(deletePostPostId) {
    let postsCopy = [...posts];

    const index = postsCopy.findIndex((postsCopyPost, currentIndex) => {
      if (postsCopyPost.postId === deletePostPostId) {
        return true;
      }
    });
    if (index !== -1) {
      postsCopy.splice(index, 1);
    }

    setPosts(postsCopy);

    alert("Post Successfully Deleted");
  }
}
