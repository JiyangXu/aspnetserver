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

  const [updatePost, setUpdatePost] = useState(true);
  const [updatePostId, setUpdatePostId] = useState(null);
  const [formData, setFormData] = useState({
    ["postId"]: null,
    ["title"]: "",
    ["content"]: "",
  });

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
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {showingCCreateNewPostForm === false && (
            <div>
              <div>ASP.NET CURD DEMO</div>
              <div className="mt-5">
                <Button
                  className="btn btn-dark btn-lg w-100"
                  onClick={getPosts}
                >
                  GET ALL POSTS
                </Button>
                <Button
                  onClick={() => {
                    setShowingCCreateNewPostForm(true);
                  }}
                  className="btn btn-secondary btn-lg w-100 mt-4"
                >
                  CREATE NEW POST
                </Button>
              </div>
            </div>
          )}

          {posts.length > 0 &&
            showingCCreateNewPostForm === false &&
            renderPostTable()}

          {showingCCreateNewPostForm && (
            <PostCreateForm onPostCreated={onPostCreated} />
          )}
        </div>
      </div>
    </div>
  );

  function renderPostTable() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Post ID (PK)</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Content</StyledTableCell>
              <StyledTableCell align="left">CRUD operations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, i) => (
              <tr key={post.postId}>
                <th scope="row">{post.postId}</th>
                {i !== updatePostId ? (
                  <th>{post.title}</th>
                ) : (
                  <td>
                    <input
                      placeholder={post.title}
                      value={formData.title}
                      name="title"
                      type="text"
                      onChange={handleChange}
                    />
                  </td>
                )}

                {i !== updatePostId ? (
                  <th>{post.content}</th>
                ) : (
                  <td>
                    <input
                      placeholder={post.content}
                      value={formData.content}
                      name="content"
                      type="text"
                      onChange={handleChange}
                    />
                  </td>
                )}
                <td>
                  <button onClick={() => handleUpdateChange(i)}>Update</button>
                  {i === updatePostId && (
                    <>
                      <button onClick={() => handleUpdate(post.postId)}>
                        Change
                      </button>
                      <button onClick={() => setUpdatePostId(null)}>
                        Cancel
                      </button>
                    </>
                  )}
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </TableBody>
        </Table>

        <button
          onClick={() => setPosts([])}
          className="btn btn-dark btn-lg w-100 "
        >
          Empty React Array
        </button>
      </TableContainer>
    );
  }

  function onPostCreated(createdPost) {
    setShowingCCreateNewPostForm(false);
    if (createdPost === null) return;
    alert("Post Successfully");

    getPosts();
  }
}
