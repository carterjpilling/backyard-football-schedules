"use client";

import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Schedule = {
  team: {
    id: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    nickname: string;
    color: string;
    alternateColor: string;
    logo: string;
    events: [];
  };
};

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<Schedule>();
  const [mainColor, setMainColor] = useState<string>("");
  const [alternateColor, setAlternateColor] = useState<string>("");

  const params = useParams();
  const searchParams = useSearchParams();
  // get queries

  // useSearchParams().get("color").replace("#", "");

  useEffect(() => {
    async function fetchData() {
      try {
        const schedule = await fetchSchedule();
        setSchedule(schedule);
      } catch {
        console.error("Error fetching schedule");
      }
    }

    // setColors();

    setMainColor(searchParams.get("color") || "ffffff");
    setAlternateColor(searchParams.get("altColor") || "000000");

    fetchData();
  }, [params.teamid]);

  function setColors() {}

  async function fetchSchedule() {
    console.log(params.teamid);
    const response = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${params.teamid}/schedule?season=2024&seasontype=2`
    );
    return await response.json();
  }

  return (
    <div className={styles.scheduleComponentContainer}>
      <div
        className={styles.pseudoBackground}
        style={{
          backgroundImage: `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 70px,
        rgba(255, 255, 255, 0.8) 100px,
        rgba(255, 255, 255, 0.8) 200px
      ), url(${schedule?.team?.logo})`,
        }}
      />
      <div className={styles.bannerContainer}>
        {" "}
        {schedule?.team?.displayName} Schedule
      </div>
      <div
        className={styles.bulletinBoard}
        style={{
          backgroundColor: `#${alternateColor}`,
          border: `10px solid #${mainColor}`,
        }}
      ></div>
      {/* {schedule.events} */}
    </div>
  );
}
