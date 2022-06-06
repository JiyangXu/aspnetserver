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

  function getPosts() {
    const url = "https://localhost:7012/get-all-posts";

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

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          <div>
            <div>ASP.NET CURD DEMO</div>
            <div className="mt-5">
              <Button className="btn btn-dark btn-lg w-100" onClick={getPosts}>
                GET ALL POSTS
              </Button>
              <Button className="btn btn-secondary btn-lg w-100 mt-4">
                CREATE NEW POST
              </Button>
            </div>
          </div>
        </div>
      </div>
      {post.length > 0 && renderPostTable()};
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
            <StyledTableRow>
              <StyledTableCell align="left">Post 1 ID</StyledTableCell>
              <StyledTableCell align="left">Post 1 title</StyledTableCell>
              <StyledTableCell align="left">Post 1 content</StyledTableCell>
              <StyledTableCell align="left">
                <Button color="primary" align="left">
                  Update
                </Button>
                <Button color="error" align="left">
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
