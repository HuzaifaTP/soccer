import { useState, useEffect } from "react";
import API from "../API";
import {v4 as uuidv4} from "uuid";

function EplSeasons(props) {
  const [season, setSeason] = useState(null);
  const [seasonsList, setSeasons] = useState([]);

  useEffect(() => {
    retrieveSeasonsFromAPI();
    console.log("SEASONS RETRIEVE");
  },[]);

  function handleSeasonSelect(e) {
    e.preventDefault();
    setSeason(e.target.value);
  }

  async function retrieveSeasonsFromAPI() {
    console.log("Inside here");
    const { data } = await API.get("/seasons", { params: { team: "33" } });
    const seasonArray = [];
    data.response.map((season) => {
      seasonArray.push(season);
    });
    setSeasons(seasonArray);
  }

  const getListOfAllSeasons = () => {
    console.log("Season list loaded on screen");
    return (
      <form>
        <select onChange={handleSeasonSelect}>
          {seasonsList.map((x, index) => {
            return <option key={uuidv4()}>{x}</option>;
          })}
        </select>
      </form>
    );
  };

  function handleSeasonSelect(e) {
    e.preventDefault();
    setSeason(e.target.value);
    props.passToScreen(e.target.value);
  }

  return <>{getListOfAllSeasons(seasonsList)}</>;
}

export default EplSeasons