import React from "react";
import API from "../API";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./MainScreen.css";
import Seasons from "../components/seasons";
import StatList from "../components/statList";

function MainScreen() {

  const [teamStatList, setTeamStatList] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("2011");

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
    retrieveTeamStatsFromAPI();
  }, [selectedSeason]);


  async function retrieveTeamStatsFromAPI() {
    console.log("TEAM STATS RETRIEVE");
    var i;
    const teamStat = [];
    for (i = 0; i < eplTeamArray.length; i++) {
      const { data } = await API.get("/statistics", {
        params: {
          league: "39",
          season: selectedSeason,
          team: eplTeamArray[i]["id"].toString(),
        },
      });
      teamStat.push(data);
      console.log(data)
    }
    setTeamStatList(teamStat);
  }

  function handleSeasonSelect(updateSeason) {
    setSelectedSeason(updateSeason);
  }

  return (
    <>
      <div className="MainContainer">
      <h1>TEAM STATISTICS</h1>
        <h2>Select Season</h2>
        <Seasons passToScreen={handleSeasonSelect} selectedSeason={selectedSeason} />
        <StatList teamStatList={teamStatList} />
      </div>
    </>
  );
}

export default MainScreen;
