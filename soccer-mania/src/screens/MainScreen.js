import React from "react";
import API from "../API";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./MainScreen.css";

function MainScreen() {
  const [season, setSeason] = useState("2010");
  const [teamStatList, setTeamStatList] = useState([]);
  const [seasonsList, setSeasons] = useState([]);

  const eplTeamArray = [
    {
      id: 33,
      name: "Manchester United",
      logo: "https://media.api-sports.io/football/teams/33.png",
    },
    {
      id: 34,
      name: "Newcastle",
      logo: "https://media.api-sports.io/football/teams/34.png",
    },
    {
      id: 38,
      name: "Watford",
      logo: "https://media.api-sports.io/football/teams/38.png",
    },
    {
      id: 39,
      name: "Wolves",
      logo: "https://media.api-sports.io/football/teams/39.png",
    },
  ];

  useEffect(() => {
    retrieveSeasonsFromAPI();
    console.log("SEASONS RETRIEVE")
  }, []);

  function handleSeasonSelect(e) {
    e.preventDefault();
    console.log(e.target.value)
    setSeason(e.target.value);
    console.log(season)
    retrieveTeamStatsFromAPI();
  };

  const getListOfAllSeasons = () => {
    return (
      <select onChange={handleSeasonSelect}>
        {seasonsList.map((season, index) => {
          return <option key={`${season}-${index}`}>{season}</option>;
        })}
      </select>
    );
  };

  async function retrieveTeamStatsFromAPI() {
    console.log("TEAM STATS RETRIEVE")
    var i;
    const teamStat = [];
    for (i = 0; i < eplTeamArray.length; i++) {
      const { data } = await API.get("/statistics", {
        params: {
          league: "39",
          season: season,
          team: eplTeamArray[i]["id"].toString(),
        },
      });
      teamStat.push(data);
    }
    setTeamStatList(teamStat);
    console.log(`Retrieving data for`+season)
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
//   function addValuesInKeyValuePair(object) {
//     let total = 0;
//     for (let value of Object.values(object)) {
//       total += value;
//     }
//     return total;
//   }

  return (
    <>
      <h1>Team Statistics</h1>
      <div className="MainContainer">
        <h2>SELECT SEASON</h2>
        {getListOfAllSeasons(seasonsList)}
        <table>
          <tr>
            <th>Team</th>
            <th>Total Goals Scored</th>
            <th>Total Goals Conceded</th>
          </tr>
          {teamStatList.map((team) => (
            <tr> 
              <td>{team.response.team.name}</td>
              <td>{team.response.goals.for.total.total}</td>
              <td>{team.response.goals.against.total.total}</td>
            </tr>
          ))}
        </table>
        {season}
      </div>
    </>
  );
}

export default MainScreen;
