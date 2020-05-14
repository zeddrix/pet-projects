import axios from "axios";

const instance = axios.create({
  baseURL: "https://bible-quiz-97de7.firebaseio.com/",
});

export default instance;
