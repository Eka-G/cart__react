import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.lichi.com/",
  timeout: 1000,
  headers: { "Set-Cookie": "SID.16871838238293.8991016-0" },
});

export default instance;
