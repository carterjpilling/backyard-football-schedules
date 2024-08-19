"use client";

import Image from "next/image";
import styles from "./teams.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import NFLLogo from "../public/images/nfl.png";
import { comicNeue700 } from "@/fonts";

type Team = {
  team: {
    id: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    nickname: string;
    color: string;
    alternateColor: string;
    logos: [
      {
        href: string;
        alt: string;
        width: string;
        height: string;
      }
    ];
  };
};

export default function Teams() {
  const [nflTeams, setNflTeams] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const teams = await fetchTeams();

        setNflTeams(teams.sports[0].leagues[0].teams);
      } catch {
        console.error("Error fetching teams");
      }
    }
    fetchData();
  }, []);

  async function fetchTeams() {
    const response = await fetch(
      "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams",
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );
    return await response.json();
  }

  return (
    <div className={styles.teamsComponentContainer}>
      <div className={`${styles.bannerContainer} ${comicNeue700.className}`}>
        <Image
          src={NFLLogo}
          alt="NFL Logo"
          sizes="100vw"
          height={100}
          width={0}
          className={styles.nflLogo}
        />
        Backyard NFL
      </div>
      <div className={styles.bulletinBoard}>
        {nflTeams.map((team: Team, index) => {
          return (
            <div key={index} className={styles.team}>
              <Link
                href={{
                  pathname: `/schedule/${team.team.id}`,
                  query: {
                    color: team.team.color,
                    altColor: team.team.alternateColor,
                  },
                }}
                className={styles.teamLink}
              >
                <Image
                  src={team.team.logos[0].href}
                  alt={team.team.displayName}
                  height={0}
                  width={0}
                  sizes="100vw"
                  style={{ width: "5rem", height: "auto" }} // optional
                  className={`${styles.teamLogo}`}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
