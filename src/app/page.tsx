import Image from "next/image";
import styles from "./page.module.css";
import Teams from "../../components/Teams.component";
// import Teams from '@components/Teams';

export default function Home() {
  return (
    <main className={styles.main}>
      <Teams />
    </main>
  );
}
