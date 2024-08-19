"use client";

import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { londrinaOutline, knewwave, comicNeue700 } from "@/fonts";
import { londrinaSolid } from "@/fonts";
import NFLLogo from "../../../../public/images/nfl.png";
import Link from "next/link";

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
  byeWeek: number;
  week: {
    number: number;
  };
};

type Color = {
  mainColor: string;
};

const teamColorMap = new Map<number, Color>([
  [22, { mainColor: "#a40227" }],
  [1, { mainColor: "#A71930" }],
  [33, { mainColor: "#29126f" }],
  [2, { mainColor: "#00338D" }],
  [29, { mainColor: "#0085CA" }],
  [3, { mainColor: "#e64100" }],
  [4, { mainColor: "#FB4F14" }],
  [5, { mainColor: "#472a08" }],
  [6, { mainColor: "#002a5c" }],
  [7, { mainColor: "#0a2343" }],
  [8, { mainColor: "#0076B6" }],
  [9, { mainColor: "#204e32" }],
  [34, { mainColor: "#00143f" }],
  [11, { mainColor: "#003b75" }],
  [30, { mainColor: "#007487" }],
  [12, { mainColor: "#E31837" }],
  [13, { mainColor: "#000000" }],
  [24, { mainColor: "#0080c6" }],
  [14, { mainColor: "#003594" }],
  [15, { mainColor: "#008e97" }],
  [16, { mainColor: "#4F2683" }],
  [17, { mainColor: "#002a5c" }],
  [18, { mainColor: "#D3BC8D" }],
  [19, { mainColor: "#003c7f" }],
  [20, { mainColor: "#115740" }],
  [21, { mainColor: "#06424d" }],
  [23, { mainColor: "#000000" }],
  [25, { mainColor: "#aa0000" }],
  [26, { mainColor: "#002a5c" }],
  [27, { mainColor: "#bd1c36" }],
  [10, { mainColor: "#4b92db" }],
  [28, { mainColor: "#5a1414" }],
]);

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
        // Add Bye Week to Events List
        const byeWeekObject = {
          id: "bye",
          byeWeek: true,
        };
        schedule?.events.splice(schedule.byeWeek - 1, 0, byeWeekObject);
        setSchedule(schedule);
      } catch {
        console.error("Error fetching schedule");
      }
    }

    setMainColor(searchParams.get("color") || "ffffff");
    setAlternateColor(searchParams.get("altColor") || "000000");

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.teamid]);

  async function fetchSchedule() {
    const response = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${params.teamid}/schedule?season=2023&seasontype=2`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );
    return await response.json();
  }

  function findTeamColor(teamId: string) {
    return teamColorMap.get(Number(teamId))?.mainColor;
  }

  const legendElement = (
    <div
      className={`${styles.legendContainer}`}
      style={{
        color: "black",
      }}
    >
      <div className={`${styles.legendItem} ${knewwave.className}`}>
        <div className={`${styles.legendBox} ${styles.home}  `}></div>- Home
      </div>
      <div className={`${styles.legendItem} ${knewwave.className}`}>
        <div className={`${styles.legendBox} ${styles.away}  `}></div>- Away
      </div>
    </div>
  );

  const headerElement = (
    <div className={`${styles.headerContainer}`}>
      <div
        className={`${styles.gameNumber} ${styles.headerWeek}  ${knewwave.className}`}
      >
        wk.
      </div>
      <div
        className={`${styles.opponent} ${styles.headervs}  ${styles.byeWeekText} ${knewwave.className}`}
      >
        vs.
      </div>
      <div
        className={`${styles.result}  ${styles.headerScore}  ${knewwave.className}`}
      >
        score
      </div>
    </div>
  );

  const NFLLogoElement = (
    <Link href="/" className={`${styles.nflLogoLink}`}>
      <Image
        src={NFLLogo}
        alt="NFL Logo"
        sizes="100vw"
        height={100}
        width={0}
        className={styles.nflLogo}
        // style={{ width: "100%", height: "125px" }}
      />
    </Link>
  );

  const scheduleElement = (
    <>
      {schedule?.events.map((event: any, index: number) => {
        return (
          <>
            {event?.byeWeek ? (
              <div className={`${styles.event} ${styles.byeWeek}`}>
                {" "}
                <div
                  className={`${styles.gameNumber} ${knewwave.className} ${styles.gameNumberWhite}`}
                  style={{ color: "var(--background-color)" }}
                >
                  {schedule.byeWeek}
                </div>
                <div
                  className={`${styles.opponent} ${styles.byeWeekText} ${londrinaSolid.className}`}
                >
                  Bye
                </div>
                <div className={`${styles.result} ${knewwave.className}`}>
                  <div className={styles.resultLetter}>- -</div>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className={styles.event}
                style={{
                  backgroundColor:
                    event.competitions[0].competitors[0].id == teamId
                      ? "#cfcdcc"
                      : "white",
                  color:
                    event.competitions[0].competitors[0].id == teamId
                      ? "white"
                      : "var(--background-color)",
                }}
              >
                <div
                  className={`${styles.gameNumber} ${knewwave.className} ${
                    event.competitions[0].competitors[0].id == teamId
                      ? styles.gameNumberBlue
                      : styles.gameNumberWhite
                  }`}
                >
                  {event.week.number}
                </div>
                <div
                  className={`${styles.opponent} ${londrinaOutline.className}`}
                  style={{
                    color:
                      event.competitions[0].competitors[0].id == teamId
                        ? findTeamColor(event.competitions[0].competitors[1].id)
                        : findTeamColor(
                            event.competitions[0].competitors[0].id
                          ),
                  }}
                >
                  {event.competitions[0].competitors[0].id == teamId ? (
                    <>
                      <div className={styles.imageContainer}>
                        <Image
                          src={
                            event.competitions[0].competitors[1].team.logos[0]
                              .href
                          }
                          alt={
                            event.competitions[0].competitors[1].team.nickname +
                            "Logo"
                          }
                          sizes="100vw"
                          height={0}
                          width={0}
                          style={{ width: "100%", height: "45px" }}
                        />
                      </div>
                      <p className={styles.nickname}>
                        {event.competitions[0].competitors[1].team.nickname}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className={styles.imageContainer}>
                        <Image
                          src={
                            event.competitions[0].competitors[0].team.logos[0]
                              .href
                          }
                          alt={
                            event.competitions[0].competitors[0].team.nickname +
                            "Logo"
                          }
                          sizes="100vw"
                          height={0}
                          width={0}
                          style={{ width: "100%", height: "45px" }}
                        />
                      </div>
                      <p className={styles.nickname}>
                        {event.competitions[0].competitors[0].team.nickname}
                      </p>
                    </>
                  )}
                </div>
                <div className={`${styles.result} ${knewwave.className}`}>
                  {event.competitions[0].status.type.completed ? (
                    event.competitions[0].competitors[0].id == teamId ? (
                      event.competitions[0].competitors[0].winner ? (
                        <>
                          <span className={styles.resultLetter}>W</span>
                          {event.competitions[0].competitors[0].score
                            .displayValue +
                            " - " +
                            event.competitions[0].competitors[1].score
                              .displayValue}{" "}
                        </>
                      ) : (
                        <>
                          <span className={styles.resultLetter}>L</span>
                          {event.competitions[0].competitors[0].score
                            .displayValue +
                            " - " +
                            event.competitions[0].competitors[1].score
                              .displayValue}{" "}
                        </>
                      )
                    ) : event.competitions[0].competitors[1].winner ? (
                      <>
                        <span className={styles.resultLetter}>W</span>
                        {event.competitions[0].competitors[1].score
                          .displayValue +
                          " - " +
                          event.competitions[0].competitors[0].score
                            .displayValue}{" "}
                      </>
                    ) : (
                      <>
                        <span className={styles.resultLetter}>L</span>
                        {event.competitions[0].competitors[1].score
                          .displayValue +
                          " - " +
                          event.competitions[0].competitors[0].score
                            .displayValue}{" "}
                      </>
                    )
                  ) : (
                    <div className={styles.resultLetter}>- -</div>
                  )}
                </div>
              </div>
            )}
          </>
        );
      })}
    </>
  );

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
      <div
        className={`${styles.bannerContainer} ${comicNeue700.className}`}
        style={{
          backgroundColor: `#${mainColor}`,
          border: `10px solid #${alternateColor}`,
        }}
      >
        <div className={`${styles.nflLogoMobileContainer}`}>
          {schedule && NFLLogoElement}
        </div>{" "}
        <h1
          className={`${styles.bannerTitle}`}
          style={{
            WebkitTextStrokeColor: `#${alternateColor}`,
            color: `#${alternateColor}`,
            textShadow:
              alternateColor == "000000"
                ? "2px 2px 5px #ffffff"
                : "3px 4px 9px black",
          }}
        >
          {schedule && schedule?.team.abbreviation + " " + "2024 Schedule"}
        </h1>
      </div>
      <div
        className={styles.bulletinBoard}
        style={{
          backgroundColor:
            alternateColor == "000000" || alternateColor == "ffffff"
              ? "lightgrey"
              : `#${alternateColor}`,
          border: `10px solid #${mainColor}`,
        }}
      >
        <div className={`${styles.nflLogoDesktopContainer}`}>
          {schedule && NFLLogoElement}
        </div>
        {schedule && (
          <>
            <div className={`${styles.legendWrapper}`}>{legendElement}</div>
            <div className={`${styles.headerWrapper}`}>
              <div className={`${styles.header} ${styles.headerOne}`}>
                {headerElement}
              </div>
              <div className={`${styles.header} ${styles.headerTwo}`}>
                {headerElement}
              </div>
            </div>
          </>
        )}
        <div className={`${styles.scheduleWrapper}`}>{scheduleElement}</div>
      </div>
    </div>
  );
}
