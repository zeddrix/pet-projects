import axios from "axios";

const instance = axios.create({
  baseURL: "https://bible-query-97de7.firebaseio.com/",
});

export default instance;
