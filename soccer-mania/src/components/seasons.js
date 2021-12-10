import { useState, useEffect } from "react";
import API from "../API";
import {v4 as uuidv4} from "uuid";

function EplSeasons(props) {
  const [seasonsList, setSeasons] = useState([]);

  useEffect(() => {
    retrieveSeasonsFromAPI();
    console.log("SEASONS FROM API");
  },[]);

  async function retrieveSeasonsFromAPI() {
   
    const { data } = await API.get("/seasons", { params: { team: "33" } });
    const seasonArray = [];
    data.response.map((season) => {
      seasonArray.push(season);
    });
    setSeasons(seasonArray);
  }

  const getListOfAllSeasons = () => {
    console.log("OPTIONS BEING LOADED");
    return (
      <form>
        <select onChange={handleSeasonSelect}  value={props.selectedSeason}> 
          {seasonsList.map((x) => {
            return(<option key={uuidv4()} value={x}> {x} </option>) 
        })}
        </select>
      </form>
    );
  };

  function handleSeasonSelect(e) {
    e.preventDefault();
    props.passToScreen(e.target.value);
  }

  return (
<>
{getListOfAllSeasons(seasonsList)}

</>

)}

export default EplSeasons