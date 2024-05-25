import Image from "next/image";
import styles from "./page.module.css";

import stockImage from "../../public/stock1.png"
import backstockImage from "/public/Backstock1.png"
import frontImage from "/public/Front1.png"
import farmImage from "/public/Farm.png"

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>About</h1>
      <div className={`${styles.textDivision} ${styles.rightImageGrid}`}>
        <h2>Stock management</h2>
        <p>Take a look remotely into my minecraft stockpile. Measure the performance of my minecraft farm and see how many chicken sandwiches you can take next time you visit my chicken sandwich farm. The intuitive UI makes it easy to see everything you need in a moments notice. Even you you are not able to be playing on the server.</p>
        <div className={styles.rightimageWrapper}>
          <Image src={stockImage} alt={"Image of a a minecraft create mod stock"} width={300} height={400} layout="responsive"></Image>
        </div>
      </div>
      <div className={`${styles.textDivision} ${styles.leftImageGrid}`}>
        <h2>High-tech technology</h2>
        <p>The minecraft server is based on Valhelsia 6 modpack and it offers plenty of engineering mods to help out with this project. The farm itself is done with the create mod and good old minecraft redstone. The idea is simple, make chicken breed with the deployer. Move them into a killing chamber. Then wait for them to grow up. Kill them with fire as to get a nice thorougly cooked chicken. Meanwhile make a rotating farm with harvesters that gets powered by wind to harvest your crops. Lastly wait for all materials to be available and let them through into the mixer. The whole process works like a charm and it is the only food source you will ever need from now on. To integrate the farm with this website we made use of the computercraft mod. A advanced computer is hooked up to the vaults via modems, it them periodically calculated the current stock and compares it to what it was. If a change is detected it makes a web request to the REST API on this server to update the stock. In game you can also view the stock by using the displays above the vaults.</p>
        <div className={styles.leftimageWrapper}>
          <Image src={backstockImage} alt={"Image of a a minecraft create mod stock"} width={300} height={400} layout="responsive"></Image>
        </div>
      </div>
      <div className={`${styles.textDivision} ${styles.rightImageGrid}`} style={{gridTemplateRows:'64px auto auto'}}>
        <h2>But... Why?</h2>
        <p>Tracking your stockpile on a minecraft server is a cumbersome task. Firstly you have to boot up the game, which can take quite a while with as many mods as in the Valhelsia 6 modpack. Secondly you have to walk in your minecraft world towards your stockpile. In my case this tends to be pretty far away from where I usually am. All in all it would cost me 10 whole minutes to check the stockile. Don't event get me started on the time it would take to measure the performance. This all has become so much easier by spending 12 hours to automate something that would manually take 10 minutes. My life has become much easier now. And besides, due to the fact that the farm only works when atleast 1 person is online I can also remotely see when somebody is online so I can hop on aswell and I do not have to play without friends anymore.</p>
        <div className={styles.rightimageWrapper}>
          <Image src={frontImage} alt={"Image of a a minecraft create mod stock"} width={200} height={320} layout="responsive"></Image>
        </div>
        <Image style={{gridColumn:'1/3'}} src={farmImage} alt={"Image of a a minecraft create mod stock"} width={200} height={320} layout="responsive"></Image>
      </div>
    </main>
  );
}
