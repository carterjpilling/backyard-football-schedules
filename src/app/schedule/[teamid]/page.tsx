"use client";

import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

type Schedule = {
  events: [];
  team: {
    id: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    nickname: string;
    color: string;
    alternateColor: string;
    logo: string;
  };
  week: {
    number: number;
  };
};

export default function SchedulePage() {
  const [schedule, setSchedule] = useState<Schedule>();
  const [mainColor, setMainColor] = useState<string>("");
  const [alternateColor, setAlternateColor] = useState<string>("");

  const params = useParams();
  const searchParams = useSearchParams();

  const teamId = schedule?.team.id;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.teamid]);

  async function fetchSchedule() {
    const response = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${params.teamid}/schedule?season=2023&seasontype=2`
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
      {schedule?.events.map((event: any, index: number) => {
        return (
          <div
            key={index}
            className={styles.event}
            style={{
              backgroundColor:
                event.competitions[0].competitors[0].id == teamId
                  ? "grey"
                  : "white",
            }}
          >
            <div
              className={styles.gameNumber}
              style={{
                backgroundColor:
                  event.competitions[0].competitors[0].id == teamId
                    ? "blue"
                    : "white",
              }}
            >
              {event.week.number}
            </div>
            <div className={styles.opponent}>
              {event.competitions[0].competitors[0].id == teamId ? (
                <>
                  <Image
                    src={
                      event.competitions[0].competitors[1].team.logos[0].href
                    }
                    alt={
                      event.competitions[0].competitors[1].team.nickname +
                      "Logo"
                    }
                    height={20}
                    width={20}
                  />
                  {event.competitions[0].competitors[1].team.nickname}
                </>
              ) : (
                <>
                  <Image
                    src={
                      event.competitions[0].competitors[0].team.logos[0].href
                    }
                    alt={
                      event.competitions[0].competitors[0].team.nickname +
                      "Logo"
                    }
                    height={20}
                    width={20}
                  />
                  {event.competitions[0].competitors[0].team.nickname}
                </>
              )}
            </div>
            <div className={styles.result}>
              {event.competitions[0].status.type.completed
                ? event.competitions[0].competitors[0].id == teamId
                  ? event.competitions[0].competitors[0].winner
                    ? "W" +
                      event.competitions[0].competitors[0].score.displayValue +
                      " - " +
                      event.competitions[0].competitors[1].score.displayValue
                    : "L" +
                      event.competitions[0].competitors[0].score.displayValue +
                      " - " +
                      event.competitions[0].competitors[1].score.displayValue
                  : event.competitions[0].competitors[1].winner
                  ? "W" +
                    event.competitions[0].competitors[1].score.displayValue +
                    " - " +
                    event.competitions[0].competitors[0].score.displayValue
                  : "L" +
                    event.competitions[0].competitors[1].score.displayValue +
                    " - " +
                    event.competitions[0].competitors[0].score.displayValue
                : "- -"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
