import React, { useState } from "react";
import Constants from "../utilities/Constants";

export default function (props) {
  const initialFormData = Object.freeze({
    title: "Post x",
    content: "This is post X.",
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
    console.log(formData);
    e.preventDefault();
    const postToCreate = {
      title: formData.title,
      content: formData.content,
    };

    const url = Constants.API_URL_CREATE_POST;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postToCreate),
    })
      .then((res) => res.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((err) => console.debug(err));

    props.onPostCreated(postToCreate);
  };
  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Creaste New Post</h1>
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
        onClick={() => props.onPostCreated(null)}
        className="btn
          btn-secondary
          w-100
          btn-lg"
      >
        Cancel
      </button>
    </form>
  );
}
