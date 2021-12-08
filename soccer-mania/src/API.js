import axios from "axios";

const API = axios.create({
  baseURL: "https://api-football-v1.p.rapidapi.com/v3/teams",

  headers: {
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    "x-rapidapi-key": "bbffdb51fbmshfb6f35e67afda15p17a33ajsn987019cb6191",
  },
}); //creating an instance of axios

export default API;
