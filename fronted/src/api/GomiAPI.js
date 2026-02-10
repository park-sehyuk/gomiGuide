import axios from "axios";

const ApiClient = axios.create({
  withCredentials: true,
  responseType: "json",
});

export const GomiAPI = async () =>
  ApiClient.get("/api/gomi")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
