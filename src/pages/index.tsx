import styles from '../style/styles.module.scss';
import Head from 'next/head';
import { GetStaticProps } from 'next';

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Planning tasks</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src="images/board-user.svg" alt="" />

        <section className={styles.callToAction}>
          <h1>Keep the tasks up to date. No more messy days.</h1>
          <p>
            <span>100% Free </span>
            and Online
          </p>
        </section>
        <h3>Donaters:</h3>
        <div className={styles.donaters}>
          <img src="\images\me.jpg" alt="" />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({}) => {
  
  return {
    props: {

    },
    revalidate: 60 * 60 // update page every 60 minutes
  }

}
