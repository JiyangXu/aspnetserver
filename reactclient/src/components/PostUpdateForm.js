import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Constants from "../utilities/Constants";

export default function PostUpdateForm(props) {
  const initialFormData = Object.freeze({
    title: props.post.title,
    content: props.post.content,
  });
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postToUpdate = {
      postId: props.post.postId,
      title: formData.title,
      content: formData.content,
    };

    const url = Constants.API_URL_UPDATE_POST;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postToUpdate),
    })
      .then((res) => res.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((err) => console.debug(err));

    props.onPostUpdated(postToUpdate);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ margin: 20 }}>
        <Typography varient="h1">Update Post {props.post.title}</Typography>
        <div className="mt-5">
          <label className="h3 form-label">Post Title</label>
          <input
            value={formData.title}
            name="title"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mt-5">
          <label className="h3 form-label">Post Content</label>
          <input
            value={formData.content}
            name="content"
            type="text"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <button onClick={handleSubmit} className="btn btn-dark w-100">
          Submit
        </button>
        <button
          onClick={() => props.onPostUpdated(null)}
          className="btn
          btn-secondary
          w-100
          btn-lg"
        >
          Cancel
        </button>
      </Grid>
    </Grid>
  );
}
