// const greeting = 'Hello World';
// console.log(greeting);

// const getData = async (url) => {
//   const response = await fetch(url);
//   const result = await response.json();
//   console.log(result);
// };

// getData('https://jsonplaceholder.typicode.com/posts');

import { http } from "./http";
import { ui } from "./ui";

const getPosts = () => {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
};

const submitPost = () => {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;

  const data = {
    title,
    body,
  };

  http
    .post("http://localhost:3000/posts", data)
    .then((data) => {
      ui.showAlert("Post added", "alert alert-success");
      ui.clearFields();
      getPosts();
    })
    .catch((err) => console.log(err));
};

const deletePost = (e) => {
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure?")) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert("Post Removed", "alert alert-success");
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }

  e.preventDefault();
};

const enableEdit = (e) => {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body,
    };

    ui.fillForm(data);
  }
  e.preventDefault();
};

document.addEventListener("DOMContentLoaded", getPosts);
document.querySelector(".post-submit").addEventListener("click", submitPost);
document.querySelector("#all-posts").addEventListener("click", deletePost);
document.querySelector("#all-posts").addEventListener("click", enableEdit);
